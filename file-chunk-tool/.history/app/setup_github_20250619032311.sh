#!/bin/bash

# Script to set up GitHub repository for the file chunking service
# Repository: https://github.com/EekChuck/outperf-ai.git

# No need to provide repository name as it's already set
REPO_URL="https://github.com/EekChuck/outperf-ai.git"

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
git remote add origin "$REPO_URL"

# Determine default branch name
DEFAULT_BRANCH=$(git symbolic-ref --short HEAD)

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin $DEFAULT_BRANCH

echo ""
echo "Setup complete! Your code has been pushed to: $REPO_URL"
echo ""
echo "If you encounter any authentication issues, you may need to:"
echo "1. Set up a Personal Access Token on GitHub"
echo "2. Use the token as your password when prompted"
echo ""
echo "For more information, see: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"