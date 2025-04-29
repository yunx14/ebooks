#!/bin/bash

# Change to the project directory
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
npm install

echo "Installation complete! Run 'npm run dev' to start the development server." 