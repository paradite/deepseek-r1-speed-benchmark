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
Using latest 12 benchmark runs

DeepSeek  : Median: 22.66, Mean: 29.50, Min: 11.28, Max: 67.60, Runs: 10
Hyperbolic: Median: 20.22, Mean: 19.34, Min: 7.21, Max: 31.26, Runs: 5
Fireworks : Median: 16.73, Mean: 17.05, Min: 11.79, Max: 21.41, Runs: 10
Together  : Median: 9.65, Mean: 11.33, Min: 7.57, Max: 18.65, Runs: 10
DeepInfra : Median: 8.55, Mean: 8.29, Min: 6.61, Max: 9.76, Runs: 10
Azure     : Median: 4.75, Mean: 4.75, Min: 3.97, Max: 5.54, Runs: 2

=== Daily Statistics ===

Date: 1/30/2025
DeepSeek  : Median: 21.60, Mean: 25.30, Min: 11.28, Max: 46.72, Runs: 4
Fireworks : Median: 20.63, Mean: 19.59, Min: 15.68, Max: 21.41, Runs: 4
Together  : Median: 15.54, Mean: 14.61, Min: 8.69, Max: 18.65, Runs: 4
Hyperbolic: Median: 12.55, Mean: 17.01, Min: 7.21, Max: 31.26, Runs: 3
DeepInfra : Median: 7.12, Mean: 7.25, Min: 6.87, Max: 7.89, Runs: 4
Azure     : Median: 4.75, Mean: 4.75, Min: 3.97, Max: 5.54, Runs: 2

Date: 1/29/2025
DeepSeek  : Median: 27.48, Mean: 32.31, Min: 15.80, Max: 67.60, Runs: 6
Hyperbolic: Median: 22.84, Mean: 22.84, Min: 20.22, Max: 25.47, Runs: 2
Fireworks : Median: 15.04, Mean: 15.36, Min: 11.79, Max: 20.32, Runs: 6
DeepInfra : Median: 9.37, Mean: 8.98, Min: 6.61, Max: 9.76, Runs: 6
Together  : Median: 9.09, Mean: 9.15, Min: 7.57, Max: 10.52, Runs: 6
```

## Sample recent outputs

```
=== Final Benchmark Results ===
Current time: 2025-01-30T07:23:37.790Z
Test prompt: What is the capital of France?

DeepSeek  : Speed: 24.34 tokens/s, Total: 424 tokens, Prompt: 12 tokens, Completion: 412 tokens, Time: 16.93s, Latency: 1.11s, Length: 1904 chars
Fireworks : Speed: 21.41 tokens/s, Total: 373 tokens, Prompt: 10 tokens, Completion: 363 tokens, Time: 16.96s, Latency: 2.16s, Length: 1785 chars
Together  : Speed: 18.65 tokens/s, Total: 393 tokens, Prompt: 10 tokens, Completion: 383 tokens, Time: 20.54s, Latency: 0.56s, Length: 1782 chars
DeepInfra : Speed: 6.87 tokens/s, Total: 73 tokens, Prompt: 10 tokens, Completion: 63 tokens, Time: 9.16s, Latency: 1.04s, Length: 297 chars
Azure     : Speed: 5.54 tokens/s, Total: 372 tokens, Prompt: 10 tokens, Completion: 362 tokens, Time: 65.34s, Latency: 5.35s, Length: 1783 chars

=== Final Benchmark Results ===
Current time: 2025-01-30T06:31:40.351Z
Test prompt: What is the capital of France?

DeepSeek  : Speed: 46.72 tokens/s, Total: 273 tokens, Prompt: 12 tokens, Completion: 261 tokens, Time: 5.59s, Latency: 1.32s, Length: 1255 chars
Fireworks : Speed: 20.72 tokens/s, Total: 240 tokens, Prompt: 10 tokens, Completion: 230 tokens, Time: 11.10s, Latency: 2.30s, Length: 1067 chars
Together  : Speed: 18.58 tokens/s, Total: 413 tokens, Prompt: 10 tokens, Completion: 403 tokens, Time: 21.69s, Latency: 0.79s, Length: 1942 chars
DeepInfra : Speed: 7.89 tokens/s, Total: 482 tokens, Prompt: 10 tokens, Completion: 472 tokens, Time: 59.82s, Latency: 1.20s, Length: 2273 chars
Hyperbolic: Speed: 7.21 tokens/s, Total: 231 tokens, Prompt: 10 tokens, Completion: 221 tokens, Time: 30.66s, Latency: 1.00s, Length: 1005 chars
Azure     : Speed: 3.97 tokens/s, Total: 217 tokens, Prompt: 10 tokens, Completion: 207 tokens, Time: 52.18s, Latency: 1.27s, Length: 989 chars

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
```

Full outputs:

- Check [outputs](outputs) directory for full outputs

## Missing data for some providers

A timeout of 10 seconds is used for all providers.

If the API does not respond within 10 seconds, the provider is skipped for that run.

This is why some providers are missing data.

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
