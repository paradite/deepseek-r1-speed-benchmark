import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Common OpenAI client config with timeout
const clientConfig = {
  timeout: 10000, // 10 seconds timeout
};

const providers = {
  // deepseek: {
  //   name: 'DeepSeek',
  //   client: new OpenAI({
  //     baseURL: 'https://api.deepseek.com',
  //     apiKey: process.env.DEEPSEEK_API_KEY,
  //     ...clientConfig,
  //   }),
  //   model: 'deepseek-reasoner',
  //   skip: false,
  // },
  // deepinfra: {
  //   name: 'DeepInfra',
  //   client: new OpenAI({
  //     baseURL: 'https://api.deepinfra.com/v1/openai',
  //     apiKey: process.env.DEEPINFRA_TOKEN,
  //     ...clientConfig,
  //   }),
  //   model: 'deepseek-ai/DeepSeek-R1',
  //   skip: false,
  // },
  // fireworks: {
  //   name: 'Fireworks',
  //   client: new OpenAI({
  //     baseURL: 'https://api.fireworks.ai/inference/v1',
  //     apiKey: process.env.FIREWORKS_API_KEY,
  //     ...clientConfig,
  //   }),
  //   model: 'accounts/fireworks/models/deepseek-r1',
  //   skip: false,
  // },
  // together: {
  //   name: 'Together',
  //   client: new OpenAI({
  //     baseURL: 'https://api.together.xyz/v1',
  //     apiKey: process.env.TOGETHER_API_KEY,
  //     ...clientConfig,
  //   }),
  //   model: 'deepseek-ai/DeepSeek-R1',
  //   skip: false,
  // },
  // chutes: {
  //   name: 'Chutes',
  //   client: new OpenAI({
  //     baseURL: 'https://chutes-deepseek-ai-deepseek-r1.chutes.ai/v1',
  //     apiKey: process.env.CHUTES_API_KEY,
  //     ...clientConfig,
  //   }),
  //   model: 'deepseek-ai/DeepSeek-R1',
  //   skip: true, // requires TAO balance
  // },
  // hyperbolic: {
  //   name: 'Hyperbolic',
  //   client: new OpenAI({
  //     baseURL: 'https://api.hyperbolic.xyz/v1',
  //     apiKey: process.env.HYPERBOLIC_API_KEY,
  //     ...clientConfig,
  //   }),
  //   model: 'deepseek-ai/DeepSeek-R1',
  //   skip: false,
  // },
  // azure: {
  //   name: 'Azure',
  //   longName: 'Azure AI Foundry',
  //   client: new OpenAI({
  //     baseURL: process.env.AZURE_AI_FOUNDRY_ENDPOINT,
  //     apiKey: process.env.AZURE_AI_FOUNDRY_API_KEY,
  //     ...clientConfig,
  //   }),
  //   model: 'random-string', // does not matter since URL is already model specific
  //   skip: false,
  // },
  nebius: {
    name: 'Nebius',
    client: new OpenAI({
      baseURL: 'https://api.studio.nebius.ai/v1/',
      apiKey: process.env.NEBIUS_API_KEY,
      ...clientConfig,
    }),
    model: 'deepseek-ai/DeepSeek-R1',
    skip: false,
  },
};

// const testPrompt = "Write a detailed 500 word essay about artificial intelligence.";
const testPrompt = 'What is the capital of France?';
// const testPrompt = 'Hello, how are you?';

async function measureSpeed(provider, showOutput = false) {
  const startTime = Date.now();
  let content = '';
  let usage = null;
  let firstResponseTime = null;

  try {
    console.log(`\nStarting ${provider.name} API speed benchmark...`);

    const stream = await provider.client.chat.completions.create({
      messages: [{ role: 'user', content: testPrompt }],
      model: provider.model,
      stream: true,
      stream_options: {
        include_usage: true,
      },
    });

    process.stdout.write('\rReceiving response...');

    for await (const chunk of stream) {
      // Record time of first response if not already set
      if (firstResponseTime === null) {
        firstResponseTime = (Date.now() - startTime) / 1000;
      }

      const delta = chunk.choices[0]?.delta;
      if (delta?.content !== undefined || delta?.reasoning_content !== undefined) {
        const content_delta = delta.content || delta.reasoning_content;
        content += content_delta;
        if (showOutput && content_delta !== undefined) {
          process.stdout.write(content_delta);
        } else {
          process.stdout.write('\rReceiving response... ' + content.length + ' chars');
        }
        if (chunk.usage) {
          usage = chunk.usage;
        }
      } else if (chunk.usage) {
        usage = chunk.usage;
      } else if (chunk.choices[0]?.finish_reason !== null) {
        console.log('\n\nResponse finished');
        if (chunk.usage) {
          usage = chunk.usage;
        }
      } else {
        console.log('unknown chunk');
        console.log(chunk.choices[0].delta);
      }
    }

    const endTime = Date.now();
    const responseTime = (endTime - startTime) / 1000; // Convert to seconds

    if (!usage) {
      throw new Error('Could not get token usage from response');
    }

    const tokensPerSecond = usage.completion_tokens / responseTime;

    console.log(
      `\n\n${provider.name}: Total tokens: ${usage.total_tokens}, Prompt tokens: ${
        usage.prompt_tokens
      }, Completion tokens: ${
        usage.completion_tokens
      }, Response time: ${responseTime.toFixed(
        2
      )}s, First response latency: ${firstResponseTime.toFixed(
        2
      )}s, Speed: ${tokensPerSecond.toFixed(2)} tokens/s, Response length: ${
        content.length
      } chars`
    );

    return {
      name: provider.name,
      totalTokens: usage.total_tokens,
      promptTokens: usage.prompt_tokens,
      completionTokens: usage.completion_tokens,
      responseTime: responseTime.toFixed(2),
      firstResponseLatency: firstResponseTime.toFixed(2),
      speed: tokensPerSecond.toFixed(2),
      responseLength: content.length,
    };
  } catch (error) {
    if (
      error.code === 'ETIMEDOUT' ||
      error.name === 'AbortError' ||
      error.message?.includes('timeout')
    ) {
      console.error(`\n${provider.name} timed out after 10 seconds`);
    } else {
      console.error(`\nError during ${provider.name} benchmark:`, error);
    }
    return null;
  }
}

// Parse command line arguments
const showOutput = process.argv.includes('--show-output');

// Run benchmarks for all providers
async function runAllBenchmarks() {
  console.log('Running benchmarks...');
  console.log('showOutput:', showOutput);
  console.log('testPrompt:', testPrompt);

  const results = [];
  const errors = {};
  for (const [key, provider] of Object.entries(providers)) {
    if (provider.skip) {
      console.log(`\nSkipping ${provider.name} as configured...`);
      continue;
    }
    const result = await measureSpeed(provider, showOutput);
    if (result) {
      results.push(result);
    } else {
      // Store error information
      errors[provider.name] = 'Failed to complete benchmark';
    }
  }

  const timestamp = new Date().toISOString();

  // Create JSON output
  const jsonData = {
    timestamp,
    results: Object.fromEntries([
      ...results.map((result) => [result.name, parseFloat(result.speed)]),
      ...Object.keys(errors).map((name) => [name, null]), // Add null for errored providers
    ]),
    details: [
      ...results,
      ...Object.entries(errors).map(([name, error]) => ({
        name,
        error,
        speed: null,
        totalTokens: null,
        promptTokens: null,
        completionTokens: null,
        responseTime: null,
        firstResponseLatency: null,
        responseLength: null,
      })),
    ],
  };

  // Write JSON file
  const jsonOutputPath = path.join('outputs', `${timestamp}.json`);
  fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonData, null, 2));
  console.log(`\nJSON results written to ${jsonOutputPath}`);

  // Create text output - only the final results
  let output = `=== Final Benchmark Results ===\n`;
  output += `Current time: ${timestamp}\n`;
  output += `Test prompt: ${testPrompt}\n\n`;

  // Sort results by speed in descending order, putting errors at the end
  const allResults = [
    ...results,
    ...Object.entries(errors).map(([name, error]) => ({
      name,
      speed: '0',
      totalTokens: 'N/A',
      promptTokens: 'N/A',
      completionTokens: 'N/A',
      responseTime: 'N/A',
      firstResponseLatency: 'N/A',
      responseLength: 'N/A',
      error,
    })),
  ];
  allResults.sort((a, b) => {
    if (a.error && !b.error) return 1;
    if (!a.error && b.error) return -1;
    return parseFloat(b.speed) - parseFloat(a.speed);
  });

  allResults.forEach((result) => {
    if (result.error) {
      output += `${result.name.padEnd(10)}: ERROR - ${result.error}\n`;
    } else {
      output += `${result.name.padEnd(10)}: Speed: ${result.speed} tokens/s, Total: ${
        result.totalTokens
      } tokens, Prompt: ${result.promptTokens} tokens, Completion: ${
        result.completionTokens
      } tokens, Time: ${result.responseTime}s, Latency: ${
        result.firstResponseLatency
      }s, Length: ${result.responseLength} chars\n`;
    }
  });

  // Write text file
  const txtOutputPath = path.join('outputs', `${timestamp}.txt`);
  fs.writeFileSync(txtOutputPath, output);
  console.log(`Text results written to ${txtOutputPath}`);

  // Print final results to console as well
  console.log(output);
}

runAllBenchmarks();
