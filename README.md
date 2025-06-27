

# 🎬 YouTube Speed Booster

A lightweight Chrome extension that gives you full control over YouTube playback speed — from 0.1x to 10x — using a clean floating UI panel or quick keyboard shortcuts.

---

## 🚀 Features

- 🎛️ Floating **speed controller panel** on all YouTube videos
- 🖱️ **Preset speed buttons** (0.1x → 10x) for one-click changes
- 🔢 **Custom speed input** for precision control
- ⌨️ **Keyboard shortcuts**: `Alt + 1–9` to change speeds instantly
- 🔁 Works dynamically across video navigations with `MutationObserver`
- 📦 Clean IIFE-based structure — no interference with YouTube scripts

---

## 🖥️ Preview

> As soon as you open a YouTube video, the speed controller panel appears at the bottom-right of the screen:


+-----------------------------------------+

| Speed Control                               |
| ------------------------------------------- |
| 0.1x  0.25x  0.5x  0.75x  1x  ...  10x      |
| \[Custom Speed Input]  \[Apply Button]      |
| Current: 1x                                 |
| +-----------------------------------------+ |


## ⌨️ Keyboard Shortcuts

You can instantly set speeds using:

| Shortcut      | Playback Speed |
|---------------|----------------|
| `Alt + 1`     | 0.25x          |
| `Alt + 2`     | 0.5x           |
| `Alt + 3`     | 0.75x          |
| `Alt + 4`     | 1x             |
| `Alt + 5`     | 1.25x          |
| `Alt + 6`     | 1.5x           |
| `Alt + 7`     | 1.75x          |
| `Alt + 8`     | 2x             |
| `Alt + 9`     | 3x             |

> The selected speed is applied instantly and reflected on the UI.

---

## 📦 Installation (Developer Mode)

To test or use the extension locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/sahilmadaan048/youtube-speed-booster.git
   cd youtube-speed-booster

2. Open **Chrome** and go to: `chrome://extensions/`

3. Enable **Developer Mode** (toggle in top-right)

4. Click **“Load unpacked”** and select the root folder of this project.

5. Visit YouTube and play any video. You’ll see the speed controller.

---

## 📂 Project Structure

```
youtube-speed-booster/
├── content.js          # Core logic: UI, speed control, video detection
├── manifest.json       # Chrome extension metadata (Manifest v3)
├── popup.html          # Optional popup page (not used actively)
├── style.css           # Styling for the floating UI panel
├── icon.png            # Extension icon
└── README.md           # Project documentation
```

---

## 🧠 How It Works

* The script runs on all YouTube video pages.
* It detects the video element (`<video>`) and injects a UI panel.
* Buttons and custom input change the video’s `playbackRate`.
* Mutation observers ensure the panel persists even after YouTube navigations (like when switching videos without page reload).
* Keyboard shortcuts let you set speed instantly using `Alt + 1` to `Alt + 9`.

---

## 🛠 Tech Stack

* **Vanilla JavaScript** (wrapped in IIFE for safety)
* **DOM API** for video & UI manipulation
* **Chrome Extension API** with Manifest V3
* **MutationObserver** to handle SPA-style URL changes on YouTube

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🙋‍♂️ Author

Made with ❤️ by **[Sahil Madaan](https://github.com/sahilmadaan048)**
📧 [sahilmadaan048@gmail.com](mailto:madaan,sahil27@gmail.com)

---

## 🙌 Contributions

Suggestions and PRs are welcome!
If you find a bug or have a feature request, please open an [issue here](https://github.com/sahilmadaan048/youtube-speed-booster/issues).

---

## ⭐ If you like this project...

Please ⭐️ star the repo — it helps more people discover it!

