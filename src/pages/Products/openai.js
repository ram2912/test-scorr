class Configuration {
  constructor({ apiKey }) {
    this.apiKey = "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";
  }
}

class OpenAIApi {
  constructor(configuration) {
    this.configuration = configuration;
  }

  async createCompletion(params) {
    const response = await fetch("https://api.openai.com/v1/engines/" + params.model + "/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.configuration.apiKey
      },
      body: JSON.stringify({
        prompt: params.prompt,
        max_tokens: params.maxTokens,
        temperature: params.temperature,
        stop: params.stop
      })
    });

    const json = await response.json();
    return json;
  }
}

export { Configuration, OpenAIApi };
