import fs from 'fs';
import path from 'path';

// Helper function to calculate mean
function calculateMean(numbers) {
  const validNumbers = numbers.filter((n) => n !== null);
  if (validNumbers.length === 0) return null;
  return validNumbers.reduce((acc, curr) => acc + curr, 0) / validNumbers.length;
}

// Helper function to calculate standard deviation
function calculateStdDev(numbers) {
  const validNumbers = numbers.filter((n) => n !== null);
  if (validNumbers.length === 0) return null;
  const mean = calculateMean(validNumbers);
  const squareDiffs = validNumbers.map((value) => Math.pow(value - mean, 2));
  const avgSquareDiff = calculateMean(squareDiffs);
  return Math.sqrt(avgSquareDiff);
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
const benchmarkData = getLatestBenchmarkData(50);

// Get all speeds for each provider
const providerSpeeds = {
  DeepSeek: [],
  DeepInfra: [],
  Fireworks: [],
  Together: [],
  Hyperbolic: [],
  Azure: [],
  Nebius: [],
  Nvidia: [],
  Kluster: [],
  Novita: [],
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
    const stdDev = calculateStdDev(speeds);
    return {
      provider,
      mean,
      median,
      min,
      max,
      stdDev,
      runs: speeds.length,
      errorCount,
    };
  }
  return null;
}

// Helper function to format statistics line
function formatStatsLine({ provider, mean, median, min, max, stdDev, runs, errorCount }) {
  const errorRate = runs > 0 ? ((errorCount / runs) * 100).toFixed(2) + '%' : '?';
  const stats = [];
  if (median !== null && mean !== null) {
    stats.push(
      `Median/Mean: ${median.toFixed(2).padStart(5)}/${mean.toFixed(2).padStart(5)}`
    );
  }
  if (min !== null && max !== null && stdDev !== null) {
    stats.push(
      `Range: ${min.toFixed(2).padStart(5)}-${max.toFixed(2).padStart(5)} ±${stdDev
        .toFixed(2)
        .padStart(5)}`
    );
  }
  stats.push(`Error rate: ${errorRate.padStart(6)}`);
  stats.push(`Success/Error: ${runs - errorCount}/${errorCount}`);

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
  const date = new Date(run.timestamp).toLocaleDateString('en-UK', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  if (!resultsByDate[date]) {
    resultsByDate[date] = {
      DeepSeek: [],
      DeepInfra: [],
      Fireworks: [],
      Together: [],
      Hyperbolic: [],
      Azure: [],
      Nebius: [],
      Nvidia: [],
      Kluster: [],
      Novita: [],
    };
  }
  Object.entries(run.results).forEach(([provider, speed]) => {
    resultsByDate[date][provider].push(speed);
  });
});

// Process daily statistics
const dailyStats = {};
Object.entries(resultsByDate)
  .sort((a, b) => {
    // Parse UK formatted dates (DD/MM/YYYY)
    const [aDay, aMonth, aYear] = a[0].split('/');
    const [bDay, bMonth, bYear] = b[0].split('/');
    const aDate = new Date(aYear, aMonth - 1, aDay);
    const bDate = new Date(bYear, bMonth - 1, bDay);
    return bDate - aDate;
  })
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
      .sort((a, b) => {
        // Parse UK formatted dates (DD/MM/YYYY)
        const [aDay, aMonth, aYear] = a[0].split('/');
        const [bDay, bMonth, bYear] = b[0].split('/');
        const aDate = new Date(aYear, aMonth - 1, aDay);
        const bDate = new Date(bYear, bMonth - 1, bDay);
        return bDate - aDate;
      })
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

// Function to generate time series data for visualization
function generateTimeSeriesData(dailyStats) {
  const medianData = Object.entries(dailyStats)
    .sort((a, b) => {
      // Parse UK formatted dates (DD/MM/YYYY)
      const [aDay, aMonth, aYear] = a[0].split('/');
      const [bDay, bMonth, bYear] = b[0].split('/');
      const aDate = new Date(aYear, aMonth - 1, aDay);
      const bDate = new Date(bYear, bMonth - 1, bDay);
      return aDate - bDate; // Note: ascending order for time series
    })
    .map(([date, stats]) => {
      const dataPoint = {
        date,
        providers: {},
      };

      stats.forEach(({ provider, median }) => {
        dataPoint.providers[provider] =
          median !== null ? Number(median.toFixed(2)) : null;
      });

      return dataPoint;
    });

  const successRateData = Object.entries(dailyStats)
    .sort((a, b) => {
      // Parse UK formatted dates (DD/MM/YYYY)
      const [aDay, aMonth, aYear] = a[0].split('/');
      const [bDay, bMonth, bYear] = b[0].split('/');
      const aDate = new Date(aYear, aMonth - 1, aDay);
      const bDate = new Date(bYear, bMonth - 1, bDay);
      return aDate - bDate; // Note: ascending order for time series
    })
    .map(([date, stats]) => {
      const dataPoint = {
        date,
        providers: {},
      };

      stats.forEach(({ provider, runs, errorCount }) => {
        const successCount = runs - errorCount;
        dataPoint.providers[provider] =
          runs > 0 ? Number(((successCount / runs) * 100).toFixed(2)) : null;
      });

      return dataPoint;
    });

  // Create summary directory if it doesn't exist
  const summaryDir = path.join('.', 'summary');
  if (!fs.existsSync(summaryDir)) {
    fs.mkdirSync(summaryDir);
  }

  // Write median data to JSON file
  const medianPath = path.join(summaryDir, 'median_speeds.json');
  fs.writeFileSync(medianPath, JSON.stringify(medianData, null, 2), 'utf8');
  console.log('\nMedian speeds data has been written to:', medianPath);

  // Write success rate data to JSON file
  const successPath = path.join(summaryDir, 'success_rates.json');
  fs.writeFileSync(successPath, JSON.stringify(successRateData, null, 2), 'utf8');
  console.log('Success rates data has been written to:', successPath);
}

// Display statistics and update README
displayAndUpdateStats(providerStats, dailyStats);

// Generate time series data
generateTimeSeriesData(dailyStats);
