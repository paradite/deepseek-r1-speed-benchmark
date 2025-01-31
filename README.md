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
- [Nvidia NIM](https://build.nvidia.com/deepseek-ai/deepseek-r1)

Enterprise providers that I am not able to test due to high costs or lack of access:

- [Awesome Cloud](https://awesomecloud.ai/secure-deepseek-r1/)
- [AWS Bedrock](https://aws.amazon.com/blogs/aws/deepseek-r1-models-now-available-on-aws/)

Watch list for DeepSeek R1 support:

- [Groq](https://www.groq.com/)
- [Cerebras](https://cerebras.ai/)

## Speed statistics

Statistics of the speed of the API automatically generated by running `analyze-speed.js`.

```
=== Overall Speed Statistics (tokens/second) ===
Using latest 16 benchmark runs

DeepSeek  : Median: 22.66, Mean: 32.76, Min: 11.28, Max: 67.60, Runs: 14
Fireworks : Median: 16.73, Mean: 16.34, Min: 6.77, Max: 21.41, Runs: 14
Hyperbolic: Median: 15.27, Mean: 16.73, Min: 6.56, Max: 31.26, Runs: 8
Together  : Median: 10.32, Mean: 12.93, Min: 7.57, Max: 21.72, Runs: 14
DeepInfra : Median: 7.64, Mean: 7.75, Min: 3.09, Max: 9.76, Runs: 14
Azure     : Median: 4.71, Mean: 4.19, Min: 1.89, Max: 5.95, Runs: 6

=== Daily Statistics ===

Date: 1/31/2025
DeepSeek  : Median: 61.49, Mean: 61.49, Min: 55.38, Max: 67.60, Runs: 2
Together  : Median: 17.96, Mean: 17.96, Min: 15.44, Max: 20.49, Runs: 2
Fireworks : Median: 15.63, Mean: 15.63, Min: 13.24, Max: 18.01, Runs: 2
Hyperbolic: Median: 6.56, Mean: 6.56, Min: 6.56, Max: 6.56, Runs: 1
DeepInfra : Median: 5.32, Mean: 5.32, Min: 3.09, Max: 7.56, Runs: 2
Azure     : Median: 2.13, Mean: 2.13, Min: 1.89, Max: 2.37, Runs: 2

Date: 1/30/2025
Fireworks : Median: 20.39, Mean: 17.56, Min: 6.77, Max: 21.41, Runs: 6
DeepSeek  : Median: 20.30, Mean: 23.64, Min: 11.28, Max: 46.72, Runs: 6
Together  : Median: 15.54, Mean: 15.03, Min: 8.69, Max: 21.72, Runs: 6
Hyperbolic: Median: 13.19, Mean: 16.31, Min: 7.21, Max: 31.26, Runs: 5
DeepInfra : Median: 7.22, Mean: 7.33, Min: 6.87, Max: 7.89, Runs: 6
Azure     : Median: 5.49, Mean: 5.22, Min: 3.97, Max: 5.95, Runs: 4

Date: 1/29/2025
DeepSeek  : Median: 27.48, Mean: 32.31, Min: 15.80, Max: 67.60, Runs: 6
Hyperbolic: Median: 22.84, Mean: 22.84, Min: 20.22, Max: 25.47, Runs: 2
Fireworks : Median: 15.04, Mean: 15.36, Min: 11.79, Max: 20.32, Runs: 6
DeepInfra : Median: 9.37, Mean: 8.98, Min: 6.61, Max: 9.76, Runs: 6
Together  : Median: 9.09, Mean: 9.15, Min: 7.57, Max: 10.52, Runs: 6
```

## Sample output for a single run

```
=== Final Benchmark Results ===
Current time: 2025-01-30T07:23:37.790Z
Test prompt: What is the capital of France?

DeepSeek  : Speed: 24.34 tokens/s, Total: 424 tokens, Prompt: 12 tokens, Completion: 412 tokens, Time: 16.93s, Latency: 1.11s, Length: 1904 chars
Fireworks : Speed: 21.41 tokens/s, Total: 373 tokens, Prompt: 10 tokens, Completion: 363 tokens, Time: 16.96s, Latency: 2.16s, Length: 1785 chars
Together  : Speed: 18.65 tokens/s, Total: 393 tokens, Prompt: 10 tokens, Completion: 383 tokens, Time: 20.54s, Latency: 0.56s, Length: 1782 chars
DeepInfra : Speed: 6.87 tokens/s, Total: 73 tokens, Prompt: 10 tokens, Completion: 63 tokens, Time: 9.16s, Latency: 1.04s, Length: 297 chars
Azure     : Speed: 5.54 tokens/s, Total: 372 tokens, Prompt: 10 tokens, Completion: 362 tokens, Time: 65.34s, Latency: 5.35s, Length: 1783 chars
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
