import { App, PluginSettingTab, Setting } from "obsidian";
import DeepSeekianPlugin from "./main";

export class DeepSeekianSettingTab extends PluginSettingTab {
  plugin: DeepSeekianPlugin;

  constructor(app: App, plugin: DeepSeekianPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl("h2", { text: "DeepSeekian Einstellungen" });

    new Setting(containerEl)
      .setName("API-Schlüssel")
      .setDesc("Dein DeepSeek API-Key (sk-...)")
      .addText((text) =>
        text
          .setPlaceholder("sk-...")
          .setValue(this.plugin.settings.apiKey)
          .onChange(async (value) => {
            this.plugin.settings.apiKey = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("API Base URL")
      .setDesc("DeepSeek API Endpunkt")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.apiBaseUrl)
          .onChange(async (value) => {
            this.plugin.settings.apiBaseUrl = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Standard-Modell")
      .setDesc("Wähle das Standard-Modell")
      .addDropdown((dropdown) =>
        dropdown
          .addOption("deepseek-chat", "DeepSeek Chat (V3)")
          .addOption("deepseek-reasoner", "DeepSeek Reasoner (R1)")
          .addOption("deepseek-coder", "DeepSeek Coder")
          .setValue(this.plugin.settings.model)
          .onChange(async (value) => {
            this.plugin.settings.model = value as any;
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("hr");

    containerEl.createEl("p", {
      text: "💡 Tipp: Hole einen kostenlosen API-Key auf https://platform.deepseek.com",
      cls: "deepseekian-tip",
    });
  }
}
