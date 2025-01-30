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

DeepSeek  : Mean: 29.40, Median: 20.49, Min: 11.28, Max: 67.60, Runs: 8
DeepInfra : Mean: 8.35, Median: 8.63, Min: 6.61, Max: 9.76, Runs: 8
Fireworks : Mean: 17.16, Median: 16.73, Min: 12.43, Max: 20.72, Runs: 8
Together  : Mean: 10.57, Median: 9.09, Min: 7.57, Max: 18.58, Runs: 8
Hyperbolic: Mean: 19.34, Median: 20.22, Min: 7.21, Max: 31.26, Runs: 5
Azure     : Mean: 3.97, Median: 3.97, Min: 3.97, Max: 3.97, Runs: 1

=== Daily Statistics ===

Date: 1/30/2025
DeepSeek  : Mean: 25.62, Median: 18.86, Min: 11.28, Max: 46.72, Runs: 3
DeepInfra : Mean: 7.38, Median: 7.19, Min: 7.05, Max: 7.89, Runs: 3
Fireworks : Mean: 18.98, Median: 20.55, Min: 15.68, Max: 20.72, Runs: 3
Together  : Mean: 13.26, Median: 12.51, Min: 8.69, Max: 18.58, Runs: 3
Hyperbolic: Mean: 17.01, Median: 12.55, Min: 7.21, Max: 31.26, Runs: 3
Azure     : Mean: 3.97, Median: 3.97, Min: 3.97, Max: 3.97, Runs: 1

Date: 1/29/2025
DeepSeek  : Mean: 31.67, Median: 20.98, Min: 15.80, Max: 67.60, Runs: 5
DeepInfra : Mean: 8.93, Median: 9.37, Min: 6.61, Max: 9.76, Runs: 5
Fireworks : Mean: 16.07, Median: 15.94, Min: 12.43, Max: 20.32, Runs: 5
Together  : Mean: 8.96, Median: 9.01, Min: 7.57, Max: 10.52, Runs: 5
Hyperbolic: Mean: 22.84, Median: 22.84, Min: 20.22, Max: 25.47, Runs: 2
```

## Sample recent outputs

```
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
