#!/bin/bash

# Script to set up GitHub repository for the file chunking service
# Usage: ./setup_github.sh REPO_NAME

# Check if repository name is provided
if [ -z "$1" ]; then
  echo "Error: Repository name is required"
  echo "Usage: ./setup_github.sh REPO_NAME"
  exit 1
fi

REPO_NAME=$1

# Initialize Git repository
echo "Initializing Git repository..."
git init

# Add all files
echo "Adding files to Git..."
git add .

# Make initial commit
echo "Making initial commit..."
git commit -m "Initial commit: File chunking service for Whisper transcription"

# Add GitHub remote
echo "Adding GitHub remote..."
git remote add origin "https://github.com/EekChuck/$REPO_NAME.git"

# Determine default branch name
DEFAULT_BRANCH=$(git symbolic-ref --short HEAD)

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin $DEFAULT_BRANCH

echo ""
echo "Setup complete! Your code has been pushed to: https://github.com/EekChuck/$REPO_NAME"
echo ""
echo "If you encounter any authentication issues, you may need to:"
echo "1. Set up a Personal Access Token on GitHub"
echo "2. Use the token as your password when prompted"
echo ""
echo "For more information, see: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"