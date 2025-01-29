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

## Speed statistics

Statistics of the speed of the API via `analyze-speed.js`.

```
=== Speed Statistics (tokens/second) ===
DeepSeek  : Mean: 39.26, Median: 34.73
DeepInfra : Mean: 9.49, Median: 9.55
Fireworks : Mean: 13.84, Median: 12.43
Together  : Mean: 9.38, Median: 9.18
```

## Sample output

Latest summary:

```
=== Final Benchmark Results ===
Current time: 2025-01-29T07:03:57.238Z
Test prompt: What is the capital of France?
DeepSeek  : Speed: 20.00 tokens/s, Total: 435 tokens, Prompt: 12 tokens, Completion: 423 tokens, Time: 21.15s, Latency: 1.15s, Length: 1973 chars
DeepInfra : Speed: 9.76 tokens/s, Total: 296 tokens, Prompt: 10 tokens, Completion: 286 tokens, Time: 29.30s, Latency: 0.82s, Length: 1388 chars
Fireworks : Speed: 17.51 tokens/s, Total: 308 tokens, Prompt: 10 tokens, Completion: 298 tokens, Time: 17.02s, Latency: 1.88s, Length: 1307 chars
Together  : Speed: 9.18 tokens/s, Total: 464 tokens, Prompt: 10 tokens, Completion: 454 tokens, Time: 49.45s, Latency: 0.98s, Length: 2148 chars

=== Final Benchmark Results ===
Current time: 2025-01-29T06:51:22.327Z
Test prompt: What is the capital of France?
DeepSeek  : Speed: 67.60 tokens/s, Total: 507 tokens, Prompt: 12 tokens, Completion: 495 tokens, Time: 7.32s, Latency: 1.22s, Length: 2335 chars
DeepInfra : Speed: 9.55 tokens/s, Total: 208 tokens, Prompt: 10 tokens, Completion: 198 tokens, Time: 20.73s, Latency: 0.83s, Length: 909 chars
Fireworks : Speed: 15.94 tokens/s, Total: 200 tokens, Prompt: 10 tokens, Completion: 190 tokens, Time: 11.92s, Latency: 3.45s, Length: 822 chars
Together  : Speed: 9.01 tokens/s, Total: 208 tokens, Prompt: 10 tokens, Completion: 198 tokens, Time: 21.97s, Latency: 1.09s, Length: 916 chars

=== Final Benchmark Results ===
Current time: 2025-01-29T05:56:50.553Z
Test prompt: What is the capital of France?
DeepSeek  : Speed: 33.98 tokens/s, Total: 252 tokens, Prompt: 12 tokens, Completion: 240 tokens, Time: 7.06s, Latency: 1.59s, Length: 1128 chars
DeepInfra : Speed: 9.37 tokens/s, Total: 435 tokens, Prompt: 10 tokens, Completion: 425 tokens, Time: 45.37s, Latency: 0.79s, Length: 2012 chars
Fireworks : Speed: 12.43 tokens/s, Total: 498 tokens, Prompt: 10 tokens, Completion: 488 tokens, Time: 39.25s, Latency: 2.68s, Length: 2317 chars
Together  : Speed: 10.52 tokens/s, Total: 257 tokens, Prompt: 10 tokens, Completion: 247 tokens, Time: 23.48s, Latency: 0.91s, Length: 1102 chars

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
```

Full outputs:

- [outputs/2025-01-29T05:29:26.660Z.txt](outputs/2025-01-29T05:29:26.660Z.txt)
- [outputs/2025-01-29T05:45:39.820Z.txt](outputs/2025-01-29T05:45:39.820Z.txt)
- [outputs/2025-01-29T05:49:32.626Z.txt](outputs/2025-01-29T05:49:32.626Z.txt)
- [outputs/2025-01-29T05:56:50.553Z.txt](outputs/2025-01-29T05:56:50.553Z.txt)
- [outputs/2025-01-29T06:51:22.327Z.txt](outputs/2025-01-29T06:51:22.327Z.txt)

## How it works

The benchmark script sends a standardized prompt to the DeepSeek API and measures:

- The time taken to receive the complete response
- The number of tokens in both the prompt and response
- Calculates the overall tokens per second processing speed

This helps in understanding the real-world performance of the DeepSeek API in your specific environment and use case.
