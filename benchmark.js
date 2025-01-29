import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const providers = {
  deepseek: {
    name: 'DeepSeek',
    client: new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    }),
    model: 'deepseek-reasoner',
    skip: false,
  },
  deepinfra: {
    name: 'DeepInfra',
    client: new OpenAI({
      baseURL: 'https://api.deepinfra.com/v1/openai',
      apiKey: process.env.DEEPINFRA_TOKEN,
    }),
    model: 'deepseek-ai/DeepSeek-R1',
    skip: false,
  },
  fireworks: {
    name: 'Fireworks',
    client: new OpenAI({
      baseURL: 'https://api.fireworks.ai/inference/v1',
      apiKey: process.env.FIREWORKS_API_KEY,
    }),
    model: 'accounts/fireworks/models/deepseek-r1',
    skip: false,
  },
  together: {
    name: 'Together',
    client: new OpenAI({
      baseURL: 'https://api.together.xyz/v1',
      apiKey: process.env.TOGETHER_API_KEY,
    }),
    model: 'deepseek-ai/DeepSeek-R1',
    skip: false,
  },
  chutes: {
    name: 'Chutes',
    client: new OpenAI({
      baseURL: 'https://chutes-deepseek-ai-deepseek-r1.chutes.ai/v1',
      apiKey: process.env.CHUTES_API_KEY,
    }),
    model: 'deepseek-ai/DeepSeek-R1',
    skip: true, // requires TAO balance
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
    console.error(`\nError during ${provider.name} benchmark:`, error);
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
  for (const [key, provider] of Object.entries(providers)) {
    if (provider.skip) {
      console.log(`\nSkipping ${provider.name} as configured...`);
      continue;
    }
    const result = await measureSpeed(provider, showOutput);
    if (result) {
      results.push(result);
    }
  }

  // Print final results
  console.log('\n=== Final Benchmark Results ===');
  console.log('Current time:', new Date().toISOString());
  console.log('Test prompt:', testPrompt);
  results.forEach((result) => {
    console.log(
      `${result.name.padEnd(10)}: Speed: ${result.speed} tokens/s, Total: ${
        result.totalTokens
      } tokens, Prompt: ${result.promptTokens} tokens, Completion: ${
        result.completionTokens
      } tokens, Time: ${result.responseTime}s, Latency: ${
        result.firstResponseLatency
      }s, Length: ${result.responseLength} chars`
    );
  });
}

runAllBenchmarks();
