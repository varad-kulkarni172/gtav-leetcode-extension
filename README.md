# LeetCode GTA: WASTED (Spoof)

Show a "SUBMISSION REJECTED" overlay and play a short jingle when your LeetCode submission fails. This extension brings a bit of gaming fun to your coding practice.

![WASTED Screenshot](https://raw.githubusercontent.com/varad-kulkarni172/gtav-leetcode-extension/main/assets/wasted.png)

---

## ⭐ Star and Fork the Repository ⭐

**If you find this extension useful or fun, please consider starring and forking the repository!**

* **Starring** helps to show your appreciation and makes the project more visible to others.
* **Forking** allows you to make your own modifications and contribute back to the project.

---

## 🚀 Features

* **Visual Feedback**: Displays a "SUBMISSION REJECTED" overlay, inspired by the iconic "WASTED" screen from Grand Theft Auto V.
* **Audio Cue**: Plays a jingle to accompany the visual overlay for a more immersive experience.
* **Customizable**: You can easily replace the default assets with your own images and sounds.
* **Lightweight**: The extension is small and has a minimal performance impact on your browser.

---

## 🛠️ How It Works

The extension uses a content script that runs on LeetCode pages. Here's a breakdown of the key files:

* **`manifest.json`**: This is the main configuration file for the Chrome extension. It defines the extension's name, version, permissions, and the scripts to be loaded.
* **`content_script.js`**: This script is injected into LeetCode pages and is the core of the extension's logic. It monitors the page for changes in the submission status. When it detects a failed submission (e.g., "Wrong Answer," "Time Limit Exceeded"), it triggers the overlay and sound effect.
* **`wasted.css`**: This file contains the styling for the "SUBMISSION REJECTED" overlay, controlling its appearance and positioning.
* **`assets/`**: This directory contains the images and audio files used by the extension.
    * `wasted.png`: The image displayed on the overlay.
    * `wasted.mp3`: The jingle that plays on a failed submission.
    * `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png`: The icons for the extension.

---

## 👨‍💻 Installation and Usage (Local Setup)

1.  **Download the code**: Clone or download this repository to your local machine.
2.  **Prepare your assets**:
    * Place your desired image for the overlay in the `assets/` folder and name it `wasted.png`.
    * Place your desired audio file in the `assets/` folder and name it `wasted.mp3`.
3.  **Load the extension in Chrome**:
    * Open Google Chrome and navigate to `chrome://extensions`.
    * Enable **Developer mode** using the toggle switch in the top-right corner.
    * Click on the **Load unpacked** button.
    * Select the folder where you downloaded the repository.
4.  **Verify assets**:
    * Open any LeetCode problem page.
    * Open the Developer Tools (Right-click on the page -> Inspect or press `F12`).
    * Go to the **Console** tab. You should see URLs for `wasted.png` and `wasted.mp3`.
    * Copy and paste each `chrome-extension://<ID>/assets/...` URL into a new tab to ensure they load correctly.
5.  **Test it out**:
    * Submit a solution that you know will fail (e.g., with a wrong answer or an infinite loop).
    * The "SUBMISSION REJECTED" overlay should appear with the jingle.

---

## ⚠️ Disclaimer

**Do not** use any protected assets from Rockstar Games or the Grand Theft Auto series if you plan to publish this extension publicly. Use your own original or royalty-free artwork and audio to avoid copyright infringement.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
