# 🚀 GitHub Release Checkliste

## Schritt 1: Git Repository initialisieren (falls nicht vorhanden)
```bash
cd deepseekian
git init
git add -A
git commit -m "Initial commit: DeepSeekian Obsidian Plugin"
git branch -M main
git remote add origin https://github.com/zarbot/deepseekian.git
git push -u origin main
```

## Schritt 2: Wichtige Dateien erzwingen (wenn in .gitignore)
```bash
# Falls main.js, manifest.json, styles.css von .gitignore ignoriert werden:
git add -f main.js manifest.json styles.css
git commit -m "Build files for Obsidian installation"
git push
```

## Schritt 3: GitHub Release erstellen

1. Gehe zu: `https://github.com/zarbot/deepseekian/releases`
2. Klick **"Create a new release"**
3. **Tag**: `1.0.0`
4. **Release Title**: `DeepSeekian v1.0.0`
5. **Description**: 
   ```markdown
   # 🎉 DeepSeekian v1.0.0 - Stable Release

   DeepSeek-Integration für Obsidian mit vollständiger Unterstützung für:
   - DeepSeek Chat (V3)
   - DeepSeek Reasoner (R1)
   - DeepSeek Coder
   - Obsidian Workflows
   - Einstellungen UI

   ## Installation
   - **BRAT**: `https://github.com/zarbot/deepseekian`
   - **Manuell**: Lade die Dateien aus "Assets" herunter

   ## Was ist neu?
   - ✨ Vollständiges klassisches Obsidian-Plugin
   - 📝 Sidebar-View mit Skill-Selector
   - ⚙️ Plugin-Einstellungen (API-Key, Modell, Endpunkt)
   - 🔌 OpenAI-kompatible API-Integration
   ```

6. **Assets hochladen** (drag & drop oder click "Attach binaries"):
   - `main.js`
   - `manifest.json`
   - `styles.css`

7. Klick **"Publish release"**

## Schritt 4: BRAT Support
Nach dem Release können Nutzer das Plugin via BRAT installieren:
```
https://github.com/zarbot/deepseekian
```

## Schritt 5: Obsidian Community Library (Optional)
Reiche dein Plugin optional ein:
https://github.com/obsidianmd/obsidian-releases
