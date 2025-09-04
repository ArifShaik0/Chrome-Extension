# Space Shooter Chrome Extension

A fun space shooter game to play while waiting for things to load! Perfect for those moments when you're waiting for a page to load, a file to download, or just need a quick break.

## Features

- Classic space shooter gameplay
- Score tracking and lives system
- Smooth controls with arrow keys and spacebar
- Progressively increasing difficulty
- Compact popup window design

## How to Install

### Method 1: Load as Unpacked Extension (Recommended for Development)

1. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Go to `chrome://extensions/` in your address bar
   - OR click the three dots menu → More tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

3. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to the folder containing these extension files
   - Select the folder and click "Select Folder"

4. **Create Icons (Optional)**
   - Open `create_icons.html` in your browser
   - Download the generated icon files (icon16.png, icon48.png, icon128.png)
   - Place them in the extension folder
   - Reload the extension in Chrome

5. **Start Playing**
   - Click the extension icon in your Chrome toolbar
   - The game popup will open and you can start playing immediately!

### Method 2: Package as .crx (For Distribution)

1. In Chrome extensions page, click "Pack extension"
2. Select the extension folder
3. Click "Pack Extension" to create a .crx file
4. Share the .crx file with others to install

## How to Play

- **Move**: Use arrow keys (↑↓←→) to move your spaceship
- **Shoot**: Press spacebar to fire bullets
- **Objective**: Destroy red enemy ships to earn points
- **Lives**: You have 3 lives - avoid colliding with enemies!
- **Scoring**: Each enemy destroyed gives you 10 points

## Game Controls

- `Arrow Keys` - Move spaceship
- `Spacebar` - Shoot bullets
- `Play Again` button appears when game ends

## Files Structure

- `manifest.json` - Extension configuration
- `popup.html` - Game interface
- `game.js` - Game logic and mechanics
- `create_icons.html` - Helper to generate extension icons
- `README.md` - This file

## Troubleshooting

- **Extension not loading**: Make sure all files are in the same folder
- **Game not responding**: Check if popup is focused (click on it)
- **Icons not showing**: Generate icons using create_icons.html or use placeholder images

Enjoy your space shooting adventures! 🚀