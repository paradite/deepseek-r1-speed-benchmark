# DeepSeek R1 speed benchmark

Code for benchmarking the speed of DeepSeek R1 from different providers' APIs.

Read the full report: [DeepSeek R1: Comparing Pricing and Speed Across Providers](https://prompt.16x.engineer/blog/deepseek-r1-cost-pricing-speed)

Currently supports:

- [DeepSeek](https://www.deepseek.com/)
- [DeepInfra](https://deepinfra.com/)
- [Fireworks](https://fireworks.ai/)
- [Together](https://www.together.ai/)
- [Chutes](https://chutes.ai/)
- [Hyperbolic](https://hyperbolic.xyz/)
- [Azure AI Foundry](https://azure.microsoft.com/en-us/products/ai-foundry)

TODO:

- [Nebius](https://nebius.com/)

Watch list for DeepSeek R1 support:

- [Groq](https://www.groq.com/)
- [Cerebras](https://cerebras.ai/)

## Speed statistics

Statistics of the speed of the API via `analyze-speed.js`.

```
=== Overall Speed Statistics (tokens/second) ===
Using latest 10 benchmark runs

DeepSeek  : Mean: 28.00, Median: 20.49, Min: 11.28, Max: 67.60, Runs: 8
DeepInfra : Mean: 8.51, Median: 9.29, Min: 6.61, Max: 9.76, Runs: 8
Fireworks : Mean: 16.05, Median: 15.81, Min: 11.79, Max: 20.55, Runs: 8
Together  : Mean: 9.51, Median: 9.09, Min: 7.57, Max: 12.51, Runs: 8
Hyperbolic: Mean: 22.38, Median: 22.84, Min: 12.55, Max: 31.26, Runs: 4

=== Daily Statistics ===

Date: 1/30/2025
DeepSeek  : Mean: 15.07, Median: 15.07, Min: 11.28, Max: 18.86, Runs: 2
DeepInfra : Mean: 7.12, Median: 7.12, Min: 7.05, Max: 7.19, Runs: 2
Fireworks : Mean: 18.12, Median: 18.12, Min: 15.68, Max: 20.55, Runs: 2
Together  : Mean: 10.60, Median: 10.60, Min: 8.69, Max: 12.51, Runs: 2
Hyperbolic: Mean: 21.91, Median: 21.91, Min: 12.55, Max: 31.26, Runs: 2

Date: 1/29/2025
DeepSeek  : Mean: 32.31, Median: 27.48, Min: 15.80, Max: 67.60, Runs: 6
DeepInfra : Mean: 8.98, Median: 9.37, Min: 6.61, Max: 9.76, Runs: 6
Fireworks : Mean: 15.36, Median: 15.04, Min: 11.79, Max: 20.32, Runs: 6
Together  : Mean: 9.15, Median: 9.09, Min: 7.57, Max: 10.52, Runs: 6
Hyperbolic: Mean: 22.84, Median: 22.84, Min: 20.22, Max: 25.47, Runs: 2
```

## Sample output

```
=== Final Benchmark Results ===
Current time: 2025-01-30T02:30:37.950Z
Test prompt: What is the capital of France?

Fireworks : Speed: 20.55 tokens/s, Total: 242 tokens, Prompt: 10 tokens, Completion: 232 tokens, Time: 11.29s, Latency: 2.37s, Length: 1060 chars
Hyperbolic: Speed: 12.55 tokens/s, Total: 320 tokens, Prompt: 10 tokens, Completion: 310 tokens, Time: 24.70s, Latency: 1.37s, Length: 1452 chars
Together  : Speed: 12.51 tokens/s, Total: 376 tokens, Prompt: 10 tokens, Completion: 366 tokens, Time: 29.27s, Latency: 0.88s, Length: 1802 chars
DeepSeek  : Speed: 11.28 tokens/s, Total: 297 tokens, Prompt: 12 tokens, Completion: 285 tokens, Time: 25.27s, Latency: 4.27s, Length: 1359 chars
DeepInfra : Speed: 7.19 tokens/s, Total: 254 tokens, Prompt: 10 tokens, Completion: 244 tokens, Time: 33.94s, Latency: 1.11s, Length: 1149 chars

=== Final Benchmark Results ===
Current time: 2025-01-29T16:52:15.552Z
Test prompt: What is the capital of France?

Hyperbolic: Speed: 31.26 tokens/s, Total: 333 tokens, Prompt: 10 tokens, Completion: 323 tokens, Time: 10.33s, Latency: 1.10s, Length: 1574 chars
DeepSeek  : Speed: 18.86 tokens/s, Total: 248 tokens, Prompt: 12 tokens, Completion: 236 tokens, Time: 12.51s, Latency: 1.47s, Length: 1064 chars
Fireworks : Speed: 15.68 tokens/s, Total: 541 tokens, Prompt: 10 tokens, Completion: 531 tokens, Time: 33.87s, Latency: 2.44s, Length: 2438 chars
Together  : Speed: 8.69 tokens/s, Total: 201 tokens, Prompt: 10 tokens, Completion: 191 tokens, Time: 21.97s, Latency: 2.75s, Length: 872 chars
DeepInfra : Speed: 7.05 tokens/s, Total: 383 tokens, Prompt: 10 tokens, Completion: 373 tokens, Time: 52.90s, Latency: 2.03s, Length: 1778 chars

=== Final Benchmark Results ===
Current time: 2025-01-29T15:55:47.415Z
Test prompt: What is the capital of France?

Hyperbolic: Speed: 25.47 tokens/s, Total: 308 tokens, Prompt: 10 tokens, Completion: 298 tokens, Time: 11.70s, Latency: 1.02s, Length: 1372 chars

=== Final Benchmark Results ===
Current time: 2025-01-29T15:45:08.184Z
Test prompt: What is the capital of France?

Hyperbolic: Speed: 20.22 tokens/s, Total: 502 tokens, Prompt: 10 tokens, Completion: 492 tokens, Time: 24.34s, Latency: 1.21s, Length: 2390 chars

=== Final Benchmark Results ===
Current time: 2025-01-29T14:03:41.164Z
Test prompt: What is the capital of France?

DeepSeek  : Speed: 20.98 tokens/s, Total: 710 tokens, Prompt: 12 tokens, Completion: 698 tokens, Time: 33.27s, Latency: 1.42s, Length: 3293 chars
Fireworks : Speed: 14.15 tokens/s, Total: 270 tokens, Prompt: 10 tokens, Completion: 260 tokens, Time: 18.38s, Latency: 1.80s, Length: 1140 chars
DeepInfra : Speed: 9.37 tokens/s, Total: 294 tokens, Prompt: 10 tokens, Completion: 284 tokens, Time: 30.32s, Latency: 1.07s, Length: 1317 chars
Together  : Speed: 7.57 tokens/s, Total: 328 tokens, Prompt: 10 tokens, Completion: 318 tokens, Time: 42.02s, Latency: 1.36s, Length: 1429 chars

=== Final Benchmark Results ===
Current time: 2025-01-29T07:20:31.774Z
Test prompt: What is the capital of France?
DeepSeek  : Speed: 15.80 tokens/s, Total: 295 tokens, Prompt: 12 tokens, Completion: 283 tokens, Time: 17.91s, Latency: 4.37s, Length: 1331 chars
DeepInfra : Speed: 6.61 tokens/s, Total: 56 tokens, Prompt: 10 tokens, Completion: 46 tokens, Time: 6.95s, Latency: 1.11s, Length: 253 chars
Fireworks : Speed: 20.32 tokens/s, Total: 241 tokens, Prompt: 10 tokens, Completion: 231 tokens, Time: 11.37s, Latency: 1.26s, Length: 1034 chars
Together  : Speed: 8.51 tokens/s, Total: 250 tokens, Prompt: 10 tokens, Completion: 240 tokens, Time: 28.21s, Latency: 1.09s, Length: 1164 chars

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
```

Full outputs:

- Check [outputs](outputs) directory for full outputs

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
npm run analyze-speed     # Analyze the speed of the API
```

The script will measure:

- Total tokens generated
- Response time
- First response latency
- Tokens per second
- Prompt and completion token counts

## How it works

The benchmark script sends a standardized prompt to the DeepSeek API and measures:

- The time taken to receive the complete response
- The number of tokens in both the prompt and response
- Calculates the overall tokens per second processing speed

This helps in understanding the real-world performance of the DeepSeek API in your specific environment and use case.
