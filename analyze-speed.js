// Data from benchmark results
const benchmarkData = [
  {
    timestamp: '2025-01-29T07:03:57.238Z',
    results: {
      DeepSeek: 20.0,
      DeepInfra: 9.76,
      Fireworks: 17.51,
      Together: 9.18,
    },
  },
  {
    timestamp: '2025-01-29T06:51:22.327Z',
    results: {
      DeepSeek: 67.6,
      DeepInfra: 9.55,
      Fireworks: 15.94,
      Together: 9.01,
    },
  },
  {
    timestamp: '2025-01-29T05:56:50.553Z',
    results: {
      DeepSeek: 33.98,
      DeepInfra: 9.37,
      Fireworks: 12.43,
      Together: 10.52,
    },
  },
  {
    timestamp: '2025-01-29T05:49:32.626Z',
    results: {
      DeepSeek: 35.48,
      DeepInfra: 9.21,
      Fireworks: 11.79,
      Together: 10.12,
    },
  },
  {
    timestamp: '2025-01-29T05:45:39.820Z',
    results: {
      DeepSeek: null, // Error during this run
      DeepInfra: 9.58,
      Fireworks: 11.53,
      Together: 8.06,
    },
  },
];

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
console.log('=== Speed Statistics (tokens/second) ===');
Object.entries(providerSpeeds).forEach(([provider, speeds]) => {
  const mean = calculateMean(speeds);
  const median = calculateMedian(speeds);
  console.log(
    `${provider.padEnd(10)}: Mean: ${mean.toFixed(2)}, Median: ${median.toFixed(2)}`
  );
});
