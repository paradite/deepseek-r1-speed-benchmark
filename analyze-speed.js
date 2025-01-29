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
const benchmarkData = getLatestBenchmarkData(10);

// Get all speeds for each provider
const providerSpeeds = {
  DeepSeek: [],
  DeepInfra: [],
  Fireworks: [],
  Together: [],
};

benchmarkData.forEach((run) => {
  Object.entries(run.results).forEach(([provider, speed]) => {
    providerSpeeds[provider].push(speed);
  });
});

// Calculate and display statistics
console.log('=== Overall Speed Statistics (tokens/second) ===');
console.log('Using latest', benchmarkData.length, 'benchmark runs\n');

// Show the overall aggregate statistics with the same format as daily
Object.entries(providerSpeeds).forEach(([provider, speeds]) => {
  const validSpeeds = speeds.filter((s) => s !== null);
  if (validSpeeds.length > 0) {
    const mean = calculateMean(validSpeeds);
    const median = calculateMedian(validSpeeds);
    const min = Math.min(...validSpeeds);
    const max = Math.max(...validSpeeds);
    console.log(
      `${provider.padEnd(10)}: Mean: ${mean.toFixed(2)}, Median: ${median.toFixed(
        2
      )}, Min: ${min.toFixed(2)}, Max: ${max.toFixed(2)}, Runs: ${validSpeeds.length}`
    );
  } else {
    console.log(`${provider.padEnd(10)}: No data`);
  }
});

// Aggregate results by date
console.log('\n=== Daily Statistics ===');
const resultsByDate = {};

benchmarkData.forEach((run) => {
  const date = new Date(run.timestamp).toLocaleDateString();
  if (!resultsByDate[date]) {
    resultsByDate[date] = {
      DeepSeek: [],
      DeepInfra: [],
      Fireworks: [],
      Together: [],
    };
  }
  Object.entries(run.results).forEach(([provider, speed]) => {
    if (speed !== null) {
      resultsByDate[date][provider].push(speed);
    }
  });
});

// Display daily statistics
Object.entries(resultsByDate)
  .sort((a, b) => new Date(a[0]) - new Date(b[0]))
  .forEach(([date, providers]) => {
    console.log(`\nDate: ${date}`);
    Object.entries(providers).forEach(([provider, speeds]) => {
      if (speeds.length > 0) {
        const mean = calculateMean(speeds);
        const median = calculateMedian(speeds);
        const min = Math.min(...speeds);
        const max = Math.max(...speeds);
        console.log(
          `${provider.padEnd(10)}: Mean: ${mean.toFixed(2)}, Median: ${median.toFixed(
            2
          )}, Min: ${min.toFixed(2)}, Max: ${max.toFixed(2)}, Runs: ${speeds.length}`
        );
      } else {
        console.log(`${provider.padEnd(10)}: No data`);
      }
    });
  });
