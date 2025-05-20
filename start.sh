#!/bin/bash

# Determine the directory of this script
DIR="$(cd "$(dirname "$0")" && pwd)"

# Navigate to your project root
cd "$DIR"

# Open key files in VS Code
code index.html style.css js/main.js

# Start Tailwind watcher
osascript -e "tell application \"iTerm\" to do script \"cd ${DIR} && npx tailwindcss -i ./style.css -o ./output.css --watch\""

# Start local server in a new tab
osascript -e "tell application \"iTerm\" to do script \"cd ${DIR} && npx serve .\""

