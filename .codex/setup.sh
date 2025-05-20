#!/bin/bash
set -e

# Install node dependencies using package-lock
if [ -f package-lock.json ]; then
    npm ci
else
    npm install
fi
