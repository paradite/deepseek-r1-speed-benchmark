```js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '$DEEPINFRA_TOKEN',
  baseURL: 'https://api.deepinfra.com/v1/openai',
});

const stream = false; // or true

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Hello' }],
    model: 'meta-llama/Meta-Llama-3-8B-Instruct',
    stream: stream,
  });

  if (stream) {
    for await (const chunk of completion) {
      if (chunk.choices[0].finish_reason) {
        console.log(
          chunk.choices[0].finish_reason,
          chunk.usage.prompt_tokens,
          chunk.usage.completion_tokens
        );
      } else {
        console.log(chunk.choices[0].delta.content);
      }
    }
  } else {
    console.log(completion.choices[0].message.content);
    console.log(completion.usage.prompt_tokens, completion.usage.completion_tokens);
  }
}

main();
```
