# DeepSeekian — DeepSeek Plugin für Obsidian

Ein vollständig versioniertes Obsidian-Plugin für die Integration von DeepSeek-Modellen. Nutze **DeepSeek-Chat (V3)**, **DeepSeek-Reasoner (R1)** und **DeepSeek-Coder** direkt aus Obsidian heraus.

## 🚀 Features

- ✨ **Fünf spezialisierte Skills**: Chat, Reasoner, Coder, Obsidian-Workflows, Einstellungen
- 🎨 **Sidebar-Interface**: Skill-Auswahl, Prompt-Editor, Antwort-Vorschau
- ⚙️ **Obsidian-Einstellungen**: API-Key, Modell, Endpunkt direkt konfigurierbar
- 📝 **Direkt einfügen**: Responses direkt in deine aktuelle Notiz einfügen
- 🔐 **Lokal & Sicher**: Dein API-Key wird nur lokal gespeichert

## 📦 Installation

### Option 1: BRAT (Automatisch — Empfohlen)

1. Installiere [BRAT](https://github.com/TfTHacker/obsidian42-brat) wenn nicht vorhanden
2. Öffne BRAT: `Ctrl+P → BRAT: Add a beta plugin for testing`
3. Gib diese URL ein:
   ```
   https://github.com/zarbot/deepseekian
   ```
4. Klick "Add Plugin"
5. Aktiviere "DeepSeekian" in Obsidian-Plugins

### Option 2: Manuelles Installation von Release

1. Gehe zu [Releases](https://github.com/zarbot/deepseekian/releases)
2. Lade die neueste Version herunter
3. Extrahiere die Dateien in `.obsidian/plugins/deepseekian/`
4. Neu laden und aktivieren

### Option 3: Aus Quellcode bauen

```bash
git clone https://github.com/zarbot/deepseekian.git
cd deepseekian
npm install
npm run build
```

Die `main.js` wird generiert und ist ready für Obsidian.

## ⚡ Erste Schritte

1. **Öffne Plugin-Einstellungen**: `Ctrl+,` → "DeepSeekian"
2. **Hole einen API-Key**: https://platform.deepseek.com → Kostenlos!
3. **Gib deinen API-Key ein** und speichere
4. **Öffne die Sidebar**: Klick auf das Gehirn-Icon in der Ribbon oder nutze `Ctrl+P → DeepSeekian`
5. **Wähle einen Skill** und schreib eine Anfrage!

## 💡 Use Cases

| Skill | Beispiel |
|-------|----------|
| **Chat (V3)** | Fragen beantworten, Text generieren, brainstormen |
| **Reasoner (R1)** | Komplexe Probleme analysieren, Math, Philosophie |
| **Coder** | Code generieren, Bugs suchen, Refactoring |
| **Obsidian** | Notizen zusammenfassen, verknüpfen, metadaten extrahieren |
| **Einstellungen** | API-Konfiguration, Modell-Wechsel |

## 🛠️ Entwicklung

### Build lokal

```bash
# Installation
npm install

# Development (watch mode)
npm run dev

# Production Build
npm run build
```

### Struktur

```
.
├── manifest.json         # Plugin-Metadaten
├── main.js              # Kompilierter Code (wichtig für Installation!)
├── styles.css           # UI-Styling
├── package.json         # Abhängigkeiten & Build-Scripts
├── tsconfig.json        # TypeScript-Konfiguration
├── esbuild.config.mjs   # Build-Tool Konfiguration
└── src/
    ├── main.ts          # Plugin-Einstiegspunkt
    ├── api.ts           # DeepSeek API-Wrapper
    ├── settings.ts      # Einstellungen UI
    └── view.ts          # Sidebar-View
```

## 📋 API-Referenz

### Konfiguration in den Einstellungen

- **API Key**: `sk-...` von https://platform.deepseek.com
- **Base URL**: Standard ist `https://api.deepseek.com`
- **Standard-Modell**: Wählbar zwischen Chat, Reasoner, Coder

### Verfügbare Modelle

| Modell | ID | Details |
|--------|-----|---------|
| DeepSeek-V3 | `deepseek-chat` | Schnell, vielseitig, 128K context |
| DeepSeek-R1 | `deepseek-reasoner` | Tiefes Denken, Chain-of-Thought, Best für Mathe/Logik |
| DeepSeek-Coder-V2 | `deepseek-coder` | Code-spezialisiert, Fill-in-the-Middle |

## 🔗 Links

- **DeepSeek Plattform**: https://platform.deepseek.com
- **API Dokumentation**: https://api-docs.deepseek.com
- **GitHub Repo**: https://github.com/zarbot/deepseekian
- **Issue Tracker**: https://github.com/zarbot/deepseekian/issues

## 📝 Lizenz

MIT License — Copyright (c) 2026 [DEVinDEV Development L.L.C.](https://devindev.de/)

**Kontakt**: service@devindev.de | **CEO**: Alexander Mitchell (MSc)

---

**Hinweis**: DeepSeekian ist ein Community-Plugin und wird nicht offiziell von DeepSeek oder Obsidian unterstützt. Nutze es auf eigenes Risiko.
