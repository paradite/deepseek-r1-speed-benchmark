import fs from 'fs';
import path from 'path';

// Helper function to calculate mean
function calculateMean(numbers) {
  const validNumbers = numbers.filter((n) => n !== null);
  return validNumbers.reduce((acc, curr) => acc + curr, 0) / validNumbers.length;
}

// Helper function to calculate median
function calculateMedian(numbers) {
  const validNumbers = numbers.filter((n) => n !== null).sort((a, b) => a - b);
  const mid = Math.floor(validNumbers.length / 2);

  if (validNumbers.length % 2 === 0) {
    return (validNumbers[mid - 1] + validNumbers[mid]) / 2;
  }
  return validNumbers[mid];
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
    const mean = calculateMean(speeds);
    const median = calculateMedian(speeds);
    const min = Math.min(...speeds);
    const max = Math.max(...speeds);
    return { provider, mean, median, min, max, runs: speeds.length };
  }
  return null;
}

// Helper function to format statistics line
function formatStatsLine({ provider, mean, median, min, max, runs }) {
  return `${provider.padEnd(10)}: Median: ${median.toFixed(2)}, Mean: ${mean.toFixed(
    2
  )}, Min: ${min.toFixed(2)}, Max: ${max.toFixed(2)}, Runs: ${runs}`;
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
    .sort((a, b) => b.median - a.median);
}

// Calculate overall statistics
const providerStats = Object.entries(providerSpeeds)
  .map(([provider, speeds]) => calculateProviderStats(provider, speeds))
  .filter(Boolean)
  .sort((a, b) => b.median - a.median);

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
    if (speed !== null) {
      resultsByDate[date][provider].push(speed);
    }
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
      .map(([date, stats]) => `\nDate: ${date}\n${stats.map(formatStatsLine).join('\n')}`)
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
