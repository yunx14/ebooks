#!/bin/bash

# Change to the project directory
cd "$(dirname "$0")"

# Run the development server
echo "Starting the Book Reader App development server..."
npm run dev

# The server will continue running until stopped with Ctrl+C 