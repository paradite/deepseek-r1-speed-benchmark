import fs from 'fs';
import path from 'path';

// Helper function to calculate mean
function calculateMean(numbers) {
  const validNumbers = numbers.filter((n) => n !== null);
  if (validNumbers.length === 0) return null;
  return validNumbers.reduce((acc, curr) => acc + curr, 0) / validNumbers.length;
}

// Helper function to calculate median
function calculateMedian(numbers) {
  const validNumbers = numbers.filter((n) => n !== null).sort((a, b) => a - b);
  if (validNumbers.length === 0) return null;
  const mid = Math.floor(validNumbers.length / 2);

  if (validNumbers.length % 2 === 0) {
    return (validNumbers[mid - 1] + validNumbers[mid]) / 2;
  }
  return validNumbers[mid];
}

// Helper function to calculate error count
function calculateErrorCount(speeds) {
  return speeds.filter((speed) => speed === null).length;
}

// Read all JSON files from outputs directory
function getLatestBenchmarkData(limit) {
  const outputsDir = path.join('.', 'outputs');
  const files = fs
    .readdirSync(outputsDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => ({
      name: file,
      time: new Date(file.replace('.json', '')).getTime(),
    }))
    .sort((a, b) => b.time - a.time) // Sort by timestamp descending
    .slice(0, limit); // Take only the latest n files

  return files.map((file) => {
    const filePath = path.join(outputsDir, file.name);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return {
      timestamp: data.timestamp,
      results: data.results,
    };
  });
}

// Get benchmark data from JSON files
const benchmarkData = getLatestBenchmarkData(100);

// Get all speeds for each provider
const providerSpeeds = {
  DeepSeek: [],
  DeepInfra: [],
  Fireworks: [],
  Together: [],
  Hyperbolic: [],
  Azure: [],
};

benchmarkData.forEach((run) => {
  Object.entries(run.results).forEach(([provider, speed]) => {
    providerSpeeds[provider].push(speed);
  });
});

// Helper function to calculate statistics for a provider's speeds
function calculateProviderStats(provider, speeds) {
  if (speeds.length > 0) {
    const errorCount = calculateErrorCount(speeds);
    const validSpeeds = speeds.filter((s) => s !== null);
    const mean = calculateMean(speeds);
    const median = calculateMedian(speeds);
    const min = validSpeeds.length > 0 ? Math.min(...validSpeeds) : null;
    const max = validSpeeds.length > 0 ? Math.max(...validSpeeds) : null;
    return {
      provider,
      mean,
      median,
      min,
      max,
      runs: speeds.length,
      errorCount,
    };
  }
  return null;
}

// Helper function to format statistics line
function formatStatsLine({ provider, mean, median, min, max, runs, errorCount }) {
  const stats = [];
  if (median !== null) stats.push(`Median: ${median.toFixed(2)}`);
  if (mean !== null) stats.push(`Mean: ${mean.toFixed(2)}`);
  if (min !== null) stats.push(`Min: ${min.toFixed(2)}`);
  if (max !== null) stats.push(`Max: ${max.toFixed(2)}`);
  stats.push(`Success: ${runs - errorCount}`);
  stats.push(`Error: ${errorCount}`);

  return `${provider.padEnd(10)}: ${stats.join(', ')}`;
}

// Helper function to process daily statistics
function processDailyStats(providers) {
  const totalRuns = Object.values(providers).reduce(
    (acc, speeds) => acc + speeds.length,
    0
  );

  // Skip dates with less than 5 total runs
  if (totalRuns < 5) {
    return null;
  }

  return Object.entries(providers)
    .map(([provider, speeds]) => calculateProviderStats(provider, speeds))
    .filter(Boolean)
    .sort((a, b) => {
      // Sort by median speed, but handle null values
      if (a.median === null && b.median === null) return 0;
      if (a.median === null) return 1;
      if (b.median === null) return -1;
      return b.median - a.median;
    });
}

// Calculate overall statistics
const providerStats = Object.entries(providerSpeeds)
  .map(([provider, speeds]) => calculateProviderStats(provider, speeds))
  .filter(Boolean)
  .sort((a, b) => {
    // Sort by median speed, but handle null values
    if (a.median === null && b.median === null) return 0;
    if (a.median === null) return 1;
    if (b.median === null) return -1;
    return b.median - a.median;
  });

// Aggregate results by date
const resultsByDate = {};
benchmarkData.forEach((run) => {
  const date = new Date(run.timestamp).toLocaleDateString();
  if (!resultsByDate[date]) {
    resultsByDate[date] = {
      DeepSeek: [],
      DeepInfra: [],
      Fireworks: [],
      Together: [],
      Hyperbolic: [],
      Azure: [],
    };
  }
  Object.entries(run.results).forEach(([provider, speed]) => {
    resultsByDate[date][provider].push(speed);
  });
});

// Process daily statistics
const dailyStats = {};
Object.entries(resultsByDate)
  .sort((a, b) => new Date(b[0]) - new Date(a[0]))
  .forEach(([date, providers]) => {
    const stats = processDailyStats(providers);
    if (stats) {
      dailyStats[date] = stats;
    }
  });

// Function to display and update statistics
function displayAndUpdateStats(overallStats, dailyStats) {
  // Generate the statistics content
  let content = '';

  // Overall statistics section
  const overallSection =
    '=== Overall Speed Statistics (tokens/second) ===\n' +
    `Using latest ${benchmarkData.length} benchmark runs\n\n` +
    overallStats.map(formatStatsLine).join('\n');

  // Daily statistics section
  const dailySection =
    '\n\n=== Daily Statistics ===\n' +
    Object.entries(dailyStats)
      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
      .map(([date, stats]) => {
        if (!stats || stats.length === 0) return '';
        return `\nDate: ${date}\n${stats.map(formatStatsLine).join('\n')}`;
      })
      .filter((section) => section !== '')
      .join('\n');

  // Combine sections
  content = overallSection + dailySection;

  // Log to console
  console.log(content);

  // Update README
  const readmePath = path.join('.', 'README.md');
  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  const readmeSection =
    '## Speed statistics\n\n' +
    'Statistics of the speed of the API automatically generated by running `analyze-speed.js`.\n\n' +
    '```\n' +
    content +
    '\n```\n';

  // Replace the existing Speed statistics section
  // Match from '## Speed statistics' until the closing code block marker
  const regex = /## Speed statistics[\s\S]*?```[\s\S]*?```\n/;
  readmeContent = readmeContent.replace(regex, readmeSection);

  // Write the updated content back to README.md
  fs.writeFileSync(readmePath, readmeContent, 'utf8');
}

// Display statistics and update README
displayAndUpdateStats(providerStats, dailyStats);
