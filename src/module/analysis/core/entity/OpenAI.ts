import { default as OpenAIApi } from 'openai';

export default class OpenAI {
  private static instance: OpenAIApi;
  private constructor() {}

  public static getInstance(): OpenAIApi {
    if (!this.instance) {
      this.instance = new OpenAIApi({
        apiKey: process.env.OPENAI_KEY,
      });
    }

    return this.instance;
  }
}
