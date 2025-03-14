# DeepSeek R1 speed benchmark

Code for benchmarking the speed of DeepSeek R1 from different providers' APIs.

Read the full report: [DeepSeek R1: Comparing Pricing and Speed Across Providers](https://prompt.16x.engineer/blog/deepseek-r1-cost-pricing-speed)

## Providers

Currently supported:

- [DeepSeek](https://www.deepseek.com/)
- [DeepInfra](https://deepinfra.com/)
- [Fireworks](https://fireworks.ai/)
- [Together](https://www.together.ai/)
- [Chutes](https://chutes.ai/)
- [Hyperbolic](https://hyperbolic.xyz/)
- [Azure AI Foundry](https://azure.microsoft.com/en-us/products/ai-foundry)
- [Nebius](https://nebius.com/)
- [Nvidia NIM](https://build.nvidia.com/deepseek-ai/deepseek-r1)
- [Kluster](https://www.kluster.ai/)
- [Novita](https://novita.ai/)

TODO:

- [Sambanova Cloud](https://cloud.sambanova.ai/plans/pricing) (waiting list)
- [replicate](https://replicate.com/deepseek-ai/deepseek-r1)

Providers that I am not able to test due to high costs or lack of open access:

- [Awesome Cloud](https://awesomecloud.ai/secure-deepseek-r1/) (Contact sales)
- [AWS Bedrock](https://aws.amazon.com/blogs/aws/deepseek-r1-models-now-available-on-aws/) (Requires dedicated ec2 instance)
- [featherless](https://featherless.ai/#pricing) (Requires subscription)
- [Avian](https://avian.io/) (Requires dedicated deployment with 4 GPUs)

Watch list for DeepSeek R1 support:

- [Groq](https://www.groq.com/)
- [Cerebras](https://cerebras.ai/)

## Speed statistics

Statistics of the speed of the API automatically generated by running `analyze-speed.js`.

```
=== Overall Speed Statistics (tokens/second) ===
Using latest 48 benchmark runs

Fireworks : Median: 20.63, Error rate:  0.00%, Mean: 22.86, Min/Max:  6.77/54.62, Success/Error: 30/0
DeepSeek  : Median: 20.00, Error rate: 16.67%, Mean: 26.14, Min/Max: 11.28/67.60, Success/Error: 25/5
Kluster   : Median: 19.59, Error rate:  0.00%, Mean: 22.14, Min/Max: 15.62/33.75, Success/Error: 4/0
Together  : Median: 15.61, Error rate:  0.00%, Mean: 16.40, Min/Max:  7.57/40.91, Success/Error: 30/0
Novita    : Median: 13.57, Error rate:  0.00%, Mean: 12.88, Min/Max:  9.75/15.39, Success/Error: 5/0
Hyperbolic: Median: 12.87, Error rate: 20.00%, Mean: 13.48, Min/Max:  4.49/31.26, Success/Error: 20/5
Nvidia    : Median: 11.87, Error rate: 33.33%, Mean: 14.13, Min/Max:  4.50/34.26, Success/Error: 12/6
DeepInfra : Median:  7.80, Error rate:  0.00%, Mean:  7.77, Min/Max:  3.09/ 9.76, Success/Error: 30/0
Azure     : Median:  6.40, Error rate:  4.55%, Mean:  5.68, Min/Max:  1.89/ 8.64, Success/Error: 21/1
Nebius    : Median:  6.28, Error rate:  0.00%, Mean:  7.59, Min/Max:  3.21/17.24, Success/Error: 18/0

=== Daily Statistics ===

Date: 11/03/2025
Novita    : Median: 13.57, Error rate:  0.00%, Mean: 12.88, Min/Max:  9.75/15.39, Success/Error: 5/0

Date: 12/02/2025
Together  : Median: 38.42, Error rate:  0.00%, Mean: 38.42, Min/Max: 35.93/40.91, Success/Error: 2/0
Nvidia    : Median: 33.92, Error rate:  0.00%, Mean: 33.92, Min/Max: 33.59/34.26, Success/Error: 2/0
Fireworks : Median: 27.05, Error rate:  0.00%, Mean: 27.05, Min/Max: 21.84/32.25, Success/Error: 2/0
Kluster   : Median: 19.59, Error rate:  0.00%, Mean: 22.14, Min/Max: 15.62/33.75, Success/Error: 4/0
DeepSeek  : Median: 16.07, Error rate:  0.00%, Mean: 16.07, Min/Max: 14.13/18.02, Success/Error: 2/0
Nebius    : Median:  9.43, Error rate:  0.00%, Mean:  9.43, Min/Max:  8.43/10.42, Success/Error: 2/0
DeepInfra : Median:  8.80, Error rate:  0.00%, Mean:  8.80, Min/Max:  8.52/ 9.09, Success/Error: 2/0
Azure     : Median:  6.04, Error rate:  0.00%, Mean:  6.04, Min/Max:  5.50/ 6.59, Success/Error: 2/0
Hyperbolic: Median:  5.40, Error rate:  0.00%, Mean:  5.40, Min/Max:  4.49/ 6.31, Success/Error: 2/0

Date: 05/02/2025
Hyperbolic: Median: 21.13, Error rate: 33.33%, Mean: 21.13, Min/Max: 16.03/26.24, Success/Error: 2/1
DeepSeek  : Median: 20.00, Error rate: 33.33%, Mean: 20.00, Min/Max: 16.35/23.64, Success/Error: 2/1
Fireworks : Median: 13.44, Error rate:  0.00%, Mean: 13.67, Min/Max:  8.68/18.90, Success/Error: 3/0
Together  : Median: 12.67, Error rate:  0.00%, Mean: 14.44, Min/Max: 10.88/19.78, Success/Error: 3/0
DeepInfra : Median:  7.45, Error rate:  0.00%, Mean:  7.89, Min/Max:  7.18/ 9.03, Success/Error: 3/0
Nebius    : Median:  6.75, Error rate:  0.00%, Mean:  6.76, Min/Max:  3.21/10.31, Success/Error: 3/0
Azure     : Median:  3.68, Error rate:  0.00%, Mean:  5.33, Min/Max:  3.67/ 8.64, Success/Error: 3/0
Nvidia    : Error rate: 100.00%, Success/Error: 0/3

Date: 03/02/2025
Fireworks : Median: 31.70, Error rate:  0.00%, Mean: 31.34, Min/Max: 29.53/32.79, Success/Error: 3/0
Together  : Median: 16.87, Error rate:  0.00%, Mean: 16.51, Min/Max: 15.67/16.98, Success/Error: 3/0
DeepSeek  : Median: 16.34, Error rate: 66.67%, Mean: 16.34, Min/Max: 16.34/16.34, Success/Error: 1/2
Nebius    : Median:  9.91, Error rate:  0.00%, Mean:  8.80, Min/Max:  3.25/13.23, Success/Error: 3/0
DeepInfra : Median:  7.83, Error rate:  0.00%, Mean:  7.90, Min/Max:  7.30/ 8.56, Success/Error: 3/0
Azure     : Median:  6.71, Error rate:  0.00%, Mean:  6.69, Min/Max:  6.61/ 6.75, Success/Error: 3/0
Hyperbolic: Median:  6.66, Error rate:  0.00%, Mean:  6.85, Min/Max:  6.44/ 7.46, Success/Error: 3/0
Nvidia    : Error rate: 100.00%, Success/Error: 0/3

Date: 02/02/2025
Fireworks : Median: 26.83, Error rate:  0.00%, Mean: 27.46, Min/Max: 25.77/29.77, Success/Error: 3/0
Together  : Median: 14.14, Error rate:  0.00%, Mean: 14.16, Min/Max: 12.79/15.55, Success/Error: 3/0
Hyperbolic: Median: 13.64, Error rate:  0.00%, Mean: 13.77, Min/Max: 12.41/15.26, Success/Error: 3/0
DeepSeek  : Median: 13.44, Error rate:  0.00%, Mean: 13.37, Min/Max: 13.21/13.45, Success/Error: 3/0
DeepInfra : Median:  8.89, Error rate:  0.00%, Mean:  8.80, Min/Max:  8.23/ 9.28, Success/Error: 3/0
Nvidia    : Median:  6.76, Error rate:  0.00%, Mean:  9.39, Min/Max:  6.60/14.82, Success/Error: 3/0
Azure     : Median:  6.67, Error rate:  0.00%, Mean:  6.69, Min/Max:  6.62/ 6.78, Success/Error: 3/0
Nebius    : Median:  4.80, Error rate:  0.00%, Mean:  6.23, Min/Max:  3.73/10.15, Success/Error: 3/0

Date: 01/02/2025
Fireworks : Median: 27.15, Error rate:  0.00%, Mean: 27.15, Min/Max: 26.94/27.35, Success/Error: 2/0
Together  : Median: 20.88, Error rate:  0.00%, Mean: 20.88, Min/Max: 20.79/20.97, Success/Error: 2/0
Nvidia    : Median: 15.43, Error rate:  0.00%, Mean: 15.43, Min/Max: 14.76/16.09, Success/Error: 2/0
Azure     : Median:  6.92, Error rate: 50.00%, Mean:  6.92, Min/Max:  6.92/ 6.92, Success/Error: 1/1
DeepInfra : Median:  6.81, Error rate:  0.00%, Mean:  6.81, Min/Max:  6.46/ 7.17, Success/Error: 2/0
Nebius    : Median:  4.83, Error rate:  0.00%, Mean:  4.83, Min/Max:  4.16/ 5.49, Success/Error: 2/0
DeepSeek  : Error rate: 100.00%, Success/Error: 0/2
Hyperbolic: Error rate: 100.00%, Success/Error: 0/2

Date: 31/01/2025
Fireworks : Median: 28.99, Error rate:  0.00%, Mean: 32.51, Min/Max: 13.24/54.62, Success/Error: 5/0
DeepSeek  : Median: 26.14, Error rate:  0.00%, Mean: 37.87, Min/Max: 17.55/67.60, Success/Error: 5/0
Together  : Median: 18.22, Error rate:  0.00%, Mean: 18.58, Min/Max: 15.44/20.66, Success/Error: 5/0
Nvidia    : Median:  9.41, Error rate:  0.00%, Mean:  8.53, Min/Max:  4.50/13.45, Success/Error: 5/0
DeepInfra : Median:  7.56, Error rate:  0.00%, Mean:  6.07, Min/Max:  3.09/ 8.45, Success/Error: 5/0
Hyperbolic: Median:  6.56, Error rate: 40.00%, Mean:  9.16, Min/Max:  5.65/15.28, Success/Error: 3/2
Nebius    : Median:  5.80, Error rate:  0.00%, Mean:  8.56, Min/Max:  4.10/17.24, Success/Error: 5/0
Azure     : Median:  5.64, Error rate:  0.00%, Mean:  4.64, Min/Max:  1.89/ 6.90, Success/Error: 5/0

Date: 30/01/2025
Fireworks : Median: 20.39, Error rate:  0.00%, Mean: 17.56, Min/Max:  6.77/21.41, Success/Error: 6/0
DeepSeek  : Median: 20.30, Error rate:  0.00%, Mean: 23.64, Min/Max: 11.28/46.72, Success/Error: 6/0
Together  : Median: 15.54, Error rate:  0.00%, Mean: 15.03, Min/Max:  8.69/21.72, Success/Error: 6/0
Hyperbolic: Median: 13.19, Error rate:  0.00%, Mean: 16.31, Min/Max:  7.21/31.26, Success/Error: 5/0
DeepInfra : Median:  7.22, Error rate:  0.00%, Mean:  7.33, Min/Max:  6.87/ 7.89, Success/Error: 6/0
Azure     : Median:  5.49, Error rate:  0.00%, Mean:  5.22, Min/Max:  3.97/ 5.95, Success/Error: 4/0

Date: 29/01/2025
DeepSeek  : Median: 27.48, Error rate:  0.00%, Mean: 32.31, Min/Max: 15.80/67.60, Success/Error: 6/0
Hyperbolic: Median: 22.84, Error rate:  0.00%, Mean: 22.84, Min/Max: 20.22/25.47, Success/Error: 2/0
Fireworks : Median: 15.04, Error rate:  0.00%, Mean: 15.36, Min/Max: 11.79/20.32, Success/Error: 6/0
DeepInfra : Median:  9.37, Error rate:  0.00%, Mean:  8.98, Min/Max:  6.61/ 9.76, Success/Error: 6/0
Together  : Median:  9.09, Error rate:  0.00%, Mean:  9.15, Min/Max:  7.57/10.52, Success/Error: 6/0
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
