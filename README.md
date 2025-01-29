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
npm install
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
Current time: 2025-01-29T05:49:32.626Z
Test prompt: What is the capital of France?
DeepSeek  : Speed: 35.48 tokens/s, Total: 434 tokens, Prompt: 12 tokens, Completion: 422 tokens, Time: 11.89s, Latency: 3.26s, Length: 2010 chars
DeepInfra : Speed: 9.21 tokens/s, Total: 131 tokens, Prompt: 10 tokens, Completion: 121 tokens, Time: 13.14s, Latency: 0.76s, Length: 552 chars
Fireworks : Speed: 11.79 tokens/s, Total: 288 tokens, Prompt: 10 tokens, Completion: 278 tokens, Time: 23.57s, Latency: 2.69s, Length: 1338 chars
Together  : Speed: 10.12 tokens/s, Total: 250 tokens, Prompt: 10 tokens, Completion: 240 tokens, Time: 23.73s, Latency: 2.00s, Length: 1116 chars

=== Final Benchmark Results ===
Current time: 2025-01-29T05:45:39.820Z
Test prompt: What is the capital of France?
DeepSeek: Error (Having an outage)
DeepInfra : Speed: 9.58 tokens/s, Total: 289 tokens, Prompt: 10 tokens, Completion: 279 tokens, Time: 29.14s, Latency: 0.88s, Length: 1357 chars
Fireworks : Speed: 11.53 tokens/s, Total: 190 tokens, Prompt: 10 tokens, Completion: 180 tokens, Time: 15.61s, Latency: 2.10s, Length: 836 chars
Together  : Speed: 8.06 tokens/s, Total: 270 tokens, Prompt: 10 tokens, Completion: 260 tokens, Time: 32.25s, Latency: 1.02s, Length: 1216 chars

=== Final Benchmark Results ===
Current time: 2025-01-29T05:29:26.660Z
DeepSeek: Total: 156 tokens, Prompt: 11 tokens, Completion: 145 tokens, Time: 5.09s, Latency: 1.22s, Speed: 28.47 tokens/s, Length: 617 chars
DeepInfra: Total: 53 tokens, Prompt: 9 tokens, Completion: 44 tokens, Time: 5.29s, Latency: 1.01s, Speed: 8.32 tokens/s, Length: 207 chars
Fireworks: Total: 53 tokens, Prompt: 9 tokens, Completion: 44 tokens, Time: 5.86s, Latency: 2.79s, Speed: 7.51 tokens/s, Length: 171 chars
Together: Total: 53 tokens, Prompt: 9 tokens, Completion: 44 tokens, Time: 5.42s, Latency: 1.63s, Speed: 8.12 tokens/s, Length: 189 chars
```

Full output:

- [outputs/2025-01-29T05:29:26.660Z.txt](outputs/2025-01-29T05:29:26.660Z.txt)
- [outputs/2025-01-29T05:45:39.820Z.txt](outputs/2025-01-29T05:45:39.820Z.txt)

## How it works

The benchmark script sends a standardized prompt to the DeepSeek API and measures:

- The time taken to receive the complete response
- The number of tokens in both the prompt and response
- Calculates the overall tokens per second processing speed

This helps in understanding the real-world performance of the DeepSeek API in your specific environment and use case.
