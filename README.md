# LeetCode GTA: WASTED (spoof)

Show a "SUBMISSION WASTED" overlay and short jingle when LeetCode submissions fail.

## Quick start (local testing)
1. Put your assets in `assets/`:
   - `assets/wasted.png` (SVG or PNG)

2. Load extension:
   - Open Chrome -> `chrome://extensions`
   - Enable Developer mode
   - Click "Load unpacked" and select this folder

3. Verify assets:
   - Open DevTools on a LeetCode tab, Console → you'll see printed URLs for `wasted.png` and `wasted.mp3`.
   - Copy-paste each `chrome-extension://<ID>/assets/...` URL into the address bar to confirm they load (no 404).

4. Test:
   - Cause a failing submission (WA/TLE/RE) on LeetCode; overlay should appear once, stay for 6s, then hide.
   - If audio autoplay is blocked, a "Play sound" button appears on the overlay.

## Notes
- **Do not** include Rockstar/GTA protected assets if you intend to publish publicly. Use spoofed artwork or original audio.
- `manifest.json` uses `web_accessible_resources` so injected DOM elements can load the extension's assets.
