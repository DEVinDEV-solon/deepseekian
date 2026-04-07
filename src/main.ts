import { Plugin, PluginSettingTab, App, Setting, Notice, WorkspaceLeaf } from "obsidian";
import { DeepSeekAPI } from "./api";
import { DeepSeekianSettingTab } from "./settings";
import { DeepSeekianView, VIEW_TYPE_DEEPSEEKIAN } from "./view";

interface DeepSeekianSettings {
  apiKey: string;
  apiBaseUrl: string;
  model: "deepseek-chat" | "deepseek-reasoner" | "deepseek-coder";
}

const DEFAULT_SETTINGS: DeepSeekianSettings = {
  apiKey: "",
  apiBaseUrl: "https://api.deepseek.com",
  model: "deepseek-chat",
};

export default class DeepSeekianPlugin extends Plugin {
  settings: DeepSeekianSettings = DEFAULT_SETTINGS;
  api!: DeepSeekAPI;

  async onload() {
    await this.loadSettings();

    // Initialize API
    this.api = new DeepSeekAPI(this.settings);

    // Register view
    this.registerView(VIEW_TYPE_DEEPSEEKIAN, (leaf) => new DeepSeekianView(leaf, this));

    // Add ribbon icon
    const ribbonIconEl = this.addRibbonIcon("brain", "DeepSeekian", (evt: MouseEvent) => {
      this.activateView();
    });
    ribbonIconEl.addClass("deepseekian-ribbon-class");

    // Add commands
    this.addCommand({
      id: "deepseekian-chat",
      name: "DeepSeek Chat — Konversation",
      editorCallback: (editor) => {
        new Notice("DeepSeek Chat geöffnet. Nutze die Sidebar.");
      },
    });

    this.addCommand({
      id: "deepseekian-reasoner",
      name: "DeepSeek Reasoner — Tiefere Analyse",
      editorCallback: (editor) => {
        new Notice("DeepSeek Reasoner aktiviert. Nutze die Sidebar.");
      },
    });

    this.addCommand({
      id: "deepseekian-coder",
      name: "DeepSeek Coder — Code-Generierung",
      editorCallback: (editor) => {
        new Notice("DeepSeek Coder aktiviert. Nutze die Sidebar.");
      },
    });

    this.addCommand({
      id: "deepseekian-obsidian",
      name: "DeepSeek Obsidian — Notizen-Workflows",
      editorCallback: (editor) => {
        new Notice("DeepSeek Obsidian-Werkzeuge geöffnet. Nutze die Sidebar.");
      },
    });

    // Settings tab
    this.addSettingTab(new DeepSeekianSettingTab(this.app, this));

    console.log("DeepSeekian Plugin loaded");
  }

  onunload() {
    console.log("DeepSeekian Plugin unloaded");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.api.updateSettings(this.settings);
  }

  async activateView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE_DEEPSEEKIAN)[0];

    if (!leaf) {
      leaf = workspace.getRightLeaf(false) as WorkspaceLeaf;
      await leaf.setViewState({ type: VIEW_TYPE_DEEPSEEKIAN, active: true });
    }

    workspace.revealLeaf(leaf);
  }
}
