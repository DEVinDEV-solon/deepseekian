import { ItemView, Notice, WorkspaceLeaf } from "obsidian";
import DeepSeekianPlugin from "./main";
import { DeepSeekAPI } from "./api";

export const VIEW_TYPE_DEEPSEEKIAN = "deepseekian-view";

export class DeepSeekianView extends ItemView {
  plugin: DeepSeekianPlugin;
  private selectedSkill: string = "deepseek-chat";
  private promptInput: HTMLTextAreaElement | null = null;
  private responseContainer: HTMLElement | null = null;
  private isLoading: boolean = false;

  constructor(leaf: WorkspaceLeaf, plugin: DeepSeekianPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType() {
    return VIEW_TYPE_DEEPSEEKIAN;
  }

  getDisplayText() {
    return "DeepSeekian";
  }

  getIcon() {
    return "brain";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass("deepseekian-container");

    // Title
    const title = container.createEl("h3", { text: "DeepSeekian" });
    title.addClass("deepseekian-title");

    // Skill selector
    const skillContainer = container.createEl("div", { cls: "deepseekian-skill-selector" });
    skillContainer.createEl("label", { text: "Wähle einen Skill:" });
    const skillSelect = skillContainer.createEl("select") as HTMLSelectElement;
    skillSelect.innerHTML = `
      <option value="deepseek-chat">DeepSeek Chat (Konversation)</option>
      <option value="deepseek-reasoner">DeepSeek Reasoner (Analyse)</option>
      <option value="deepseek-coder">DeepSeek Coder (Code)</option>
      <option value="deepseek-obsidian">DeepSeek Obsidian (Workflows)</option>
      <option value="deepseek-settings">DeepSeek Einstellungen</option>
    `;
    skillSelect.value = this.selectedSkill;
    skillSelect.addEventListener("change", (e) => {
      this.selectedSkill = (e.target as HTMLSelectElement).value;
    });

    // Prompt input
    const promptContainer = container.createEl("div", { cls: "deepseekian-prompt-input" });
    promptContainer.createEl("label", { text: "Deine Anfrage:" });
    this.promptInput = promptContainer.createEl("textarea", {
      placeholder: "Gib deine Anfrage ein...",
    }) as HTMLTextAreaElement;
    this.promptInput.addClass("deepseekian-prompt-textarea");

    // Buttons
    const buttonGroup = container.createEl("div", { cls: "deepseekian-button-group" });
    
    const sendBtn = buttonGroup.createEl("button", { text: "📤 Senden" });
    sendBtn.addEventListener("click", () => this.sendRequest());

    const insertBtn = buttonGroup.createEl("button", { text: "✏️ Einfügen" });
    insertBtn.addEventListener("click", () => this.insertResponse());

    const clearBtn = buttonGroup.createEl("button", { text: "🗑️ Löschen" });
    clearBtn.addEventListener("click", () => this.clearResponses());

    // Response container
    this.responseContainer = container.createEl("div", { cls: "deepseekian-response-container" });
    this.responseContainer.addClass("deepseekian-response");
    this.responseContainer.textContent = "Keine Antwort noch.";
  }

  private async sendRequest() {
    if (!this.promptInput || !this.promptInput.value.trim()) {
      new Notice("❌ Bitte gib eine Anfrage ein");
      return;
    }

    if (!this.plugin.settings.apiKey) {
      new Notice("❌ API-Schlüssel nicht konfiguriert. Gehe zu Plugin-Einstellungen.");
      return;
    }

    this.isLoading = true;
    if (this.responseContainer) {
      this.responseContainer.innerHTML = '<div class="deepseekian-loading">⏳ Wird verarbeitet...</div>';
    }

    try {
      let response = "";
      const api = this.plugin.api;

      switch (this.selectedSkill) {
        case "deepseek-reasoner":
          response = await api.reasonerChat(this.promptInput.value);
          break;
        case "deepseek-coder":
          response = await api.codeGeneration(this.promptInput.value);
          break;
        case "deepseek-obsidian":
          response = await api.chat(
            this.promptInput.value,
            "Du bist ein Assistent für Obsidian-Notizen. Helfe beim Organisieren, Zusammenfassen und Verknüpfen von Wissen."
          );
          break;
        default:
          response = await api.chat(this.promptInput.value);
      }

      if (this.responseContainer) {
        this.responseContainer.innerHTML = `<pre>${this.escapeHtml(response)}</pre>`;
      }
      new Notice("✅ Anfrage verarbeitet!");
    } catch (error) {
      if (this.responseContainer) {
        this.responseContainer.innerHTML = `<div class="deepseekian-error">❌ Fehler: ${error}</div>`;
      }
      new Notice(`❌ Fehler: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }

  private insertResponse() {
    if (!this.responseContainer) return;

    const responseText = this.responseContainer.innerText;
    if (responseText === "Keine Antwort noch." || !responseText) {
      new Notice("❌ Keine Antwort zum Einfügen");
      return;
    }

    const activeEditor = this.app.workspace.activeEditor?.editor;
    if (!activeEditor) {
      new Notice("❌ Kein aktiver Editor. Öffne eine Notiz.");
      return;
    }

    activeEditor.replaceSelection(`\n\n${responseText}\n\n`);
    new Notice("✅ Antwort eingefügt!");
  }

  private clearResponses() {
    if (this.responseContainer) {
      this.responseContainer.textContent = "Keine Antwort noch.";
    }
    if (this.promptInput) {
      this.promptInput.value = "";
    }
    new Notice("🗑️ Gelöscht");
  }

  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}
