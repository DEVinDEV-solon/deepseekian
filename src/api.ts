import { OpenAI } from "openai";

export interface DeepSeekianSettings {
  apiKey: string;
  apiBaseUrl: string;
  model: "deepseek-chat" | "deepseek-reasoner" | "deepseek-coder";
}

export class DeepSeekAPI {
  private client: OpenAI | null = null;
  private settings: DeepSeekianSettings;

  constructor(settings: DeepSeekianSettings) {
    this.settings = settings;
    this.initializeClient();
  }

  private initializeClient() {
    if (this.settings.apiKey) {
      this.client = new OpenAI({
        apiKey: this.settings.apiKey,
        baseURL: this.settings.apiBaseUrl,
        dangerouslyAllowBrowser: true, // Obsidian runs as Electron, but we set this for clarity
      });
    }
  }

  updateSettings(settings: DeepSeekianSettings) {
    this.settings = settings;
    this.initializeClient();
  }

  async chat(message: string, systemPrompt?: string): Promise<string> {
    if (!this.client) {
      throw new Error("API-Schlüssel nicht konfiguriert");
    }

    try {
      const response = await this.client.chat.completions.create({
        model: this.settings.model,
        messages: [
          ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
          { role: "user" as const, content: message },
        ],
        stream: false,
      });

      return response.choices[0].message.content || "Keine Antwort";
    } catch (error) {
      throw new Error(`DeepSeek API Fehler: ${error}`);
    }
  }

  async reasonerChat(message: string, systemPrompt?: string): Promise<string> {
    if (!this.client) {
      throw new Error("API-Schlüssel nicht konfiguriert");
    }

    try {
      const response = await this.client.chat.completions.create({
        model: "deepseek-reasoner",
        messages: [
          ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
          { role: "user" as const, content: message },
        ],
      });

      return response.choices[0].message.content || "Keine Antwort";
    } catch (error) {
      throw new Error(`DeepSeek Reasoner Fehler: ${error}`);
    }
  }

  async codeGeneration(prompt: string): Promise<string> {
    if (!this.client) {
      throw new Error("API-Schlüssel nicht konfiguriert");
    }

    try {
      const response = await this.client.chat.completions.create({
        model: "deepseek-coder",
        messages: [
          {
            role: "system" as const,
            content: "Du bist ein hilfreicher Code-Assistent. Generiere nur sauberen, gut kommentierten Code.",
          },
          { role: "user" as const, content: prompt },
        ],
      });

      return response.choices[0].message.content || "Keine Antwort";
    } catch (error) {
      throw new Error(`DeepSeek Coder Fehler: ${error}`);
    }
  }
}
