#!/bin/bash

# Navigate to your project root
cd /Users/laney/dev/404core

# Open key files in VS Code
code index.html style.css js/main.js

# Start Tailwind watcher
osascript -e 'tell application "iTerm" to do script "cd /Users/laney/dev/404core && npx tailwindcss -i ./style.css -o ./output.css --watch"'

# Start local server in a new tab
osascript -e 'tell application "iTerm" to do script "cd /Users/laney/dev/404core && npx serve ."'

