#!/bin/bash

# Change to the project directory
cd "$(dirname "$0")"

# Create necessary directories if they don't exist
echo "Creating project directories..."
mkdir -p src/{components,pages,services,hooks,types} public

echo "Setup complete! Run './install.sh' to install dependencies." 