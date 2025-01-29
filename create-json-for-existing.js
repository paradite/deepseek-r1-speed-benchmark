import fs from 'fs';
import path from 'path';

// Data from benchmark results (last 5 runs without any errors)
const benchmarkData = [
  {
    timestamp: '2025-01-29T07:20:31.774Z',
    results: {
      DeepSeek: 15.8,
      DeepInfra: 6.61,
      Fireworks: 20.32,
      Together: 8.51,
    },
  },
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
];

// Create JSON files for each benchmark run
benchmarkData.forEach((run) => {
  const jsonData = {
    timestamp: run.timestamp,
    results: run.results,
    // Since we don't have detailed data for old runs, we'll create approximate details
    details: Object.entries(run.results).map(([name, speed]) => ({
      name,
      speed: speed.toFixed(2),
      // Other fields are approximated or left empty since we don't have historical data
      totalTokens: null,
      promptTokens: null,
      completionTokens: null,
      responseTime: null,
      firstResponseLatency: null,
      responseLength: null,
    })),
  };

  const jsonOutputPath = path.join('outputs', `${run.timestamp}.json`);
  fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonData, null, 2));
  console.log(`Created JSON file: ${jsonOutputPath}`);
});
