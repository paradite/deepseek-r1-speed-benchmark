# DeepSeek R1 speed benchmark

Code for benchmarking the speed of DeepSeek R1 from different providers' APIs.

Currently supports:

- [DeepSeek](https://www.deepseek.com/)
- [DeepInfra](https://deepinfra.com/)
- [Fireworks](https://fireworks.ai/)
- [Together](https://www.together.ai/)

## Setup

1. Install dependencies:

```bash
npm install openai dotenv
```

2. Create a `.env` file in the root directory.

Follow the sample in the `.env.example` file to set up your API keys.

3. Make sure you have Node.js version 20 or higher installed.

## Usage

Run the benchmark:

```bash
npm run benchmark        # Regular benchmark
npm run benchmark-show-output # Show the API response while benchmarking
```

The script will measure:

- Total tokens generated
- Response time
- First response latency
- Tokens per second
- Prompt and completion token counts

## Sample output

Final summary:

```
=== Final Benchmark Results ===
Current time: 2025-01-29T05:29:26.660Z
DeepSeek: Total: 156 tokens, Prompt: 11 tokens, Completion: 145 tokens, Time: 5.09s, Latency: 1.22s, Speed: 28.47 tokens/s, Length: 617 chars
DeepInfra: Total: 53 tokens, Prompt: 9 tokens, Completion: 44 tokens, Time: 5.29s, Latency: 1.01s, Speed: 8.32 tokens/s, Length: 207 chars
Fireworks: Total: 53 tokens, Prompt: 9 tokens, Completion: 44 tokens, Time: 5.86s, Latency: 2.79s, Speed: 7.51 tokens/s, Length: 171 chars
Together: Total: 53 tokens, Prompt: 9 tokens, Completion: 44 tokens, Time: 5.42s, Latency: 1.63s, Speed: 8.12 tokens/s, Length: 189 chars
```

Full output:

- [outputs/2025-01-29T05:29:26.660Z.txt](outputs/2025-01-29T05:29:26.660Z.txt)

## How it works

The benchmark script sends a standardized prompt to the DeepSeek API and measures:

- The time taken to receive the complete response
- The number of tokens in both the prompt and response
- Calculates the overall tokens per second processing speed

This helps in understanding the real-world performance of the DeepSeek API in your specific environment and use case.
