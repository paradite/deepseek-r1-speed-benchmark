import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const MODEL_NAME = 'deepseek-reasoner';

// const testPrompt = "Write a detailed 500 word essay about artificial intelligence.";
const testPrompt = 'What is the capital of France?';

async function measureSpeed(showOutput = false) {
  const startTime = Date.now();
  let content = '';
  let usage = null;

  try {
    const stream = await openai.chat.completions.create({
      messages: [{ role: 'user', content: testPrompt }],
      model: MODEL_NAME,
      stream: true,
      stream_options: {
        include_usage: true,
      },
    });

    process.stdout.write('\rReceiving response...');

    for await (const chunk of stream) {
      if (chunk.choices[0]?.delta?.content) {
        const content_delta = chunk.choices[0].delta.content;
        content += content_delta;

        if (showOutput) {
          process.stdout.write(content_delta);
        } else {
          process.stdout.write('\rReceiving response... ' + content.length + ' chars');
        }
      } else if (chunk.usage) {
        usage = chunk.usage;
      } else if (chunk.choices[0]?.finish_reason !== null) {
        console.log('\n\nResponse finished');
        if (chunk.usage) {
          usage = chunk.usage;
        }
      }
    }

    const endTime = Date.now();
    const responseTime = (endTime - startTime) / 1000; // Convert to seconds

    if (!usage) {
      throw new Error('Could not get token usage from response');
    }

    const tokensPerSecond = usage.completion_tokens / responseTime;

    console.log(
      `\n\nBenchmark Results: Total tokens: ${usage.total_tokens}, Prompt tokens: ${
        usage.prompt_tokens
      }, Completion tokens: ${
        usage.completion_tokens
      }, Response time: ${responseTime.toFixed(2)}s, Speed: ${tokensPerSecond.toFixed(
        2
      )} tokens/s, Response length: ${content.length} chars`
    );
  } catch (error) {
    console.error('\nError during benchmark:', error);
  }
}

// Parse command line arguments
const showOutput = process.argv.includes('--show-output');

// Run benchmark
console.log('Starting DeepSeek API speed benchmark...');
measureSpeed(showOutput);
