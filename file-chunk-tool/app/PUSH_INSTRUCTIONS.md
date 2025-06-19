# Push Instructions for Your Git Repository

Follow these steps to push this project to your Git repository at https://github.com/EekChuck/audio-chunker.git

## Option 1: Using the Setup Script (Recommended)

The setup_github.sh script has been updated to handle existing remote content. Simply run:

```bash
cd app
chmod +x setup_github.sh  # Make sure the script is executable
./setup_github.sh
```

This script will:
1. Initialize a Git repository
2. Add all files
3. Commit them with a message
4. Try to pull from the remote repository with --allow-unrelated-histories
5. Push to your repository

If the push fails, the script will provide guidance on how to resolve the issue.

## Option 2: Manual Steps

If you prefer to do it manually or if the script doesn't work as expected:

```bash
# Navigate to the app directory
cd app

# Initialize a Git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Add file chunking service for Whisper transcription"

# Add the remote repository
git remote add origin https://github.com/EekChuck/audio-chunker.git

# Pull from the remote repository (if it has existing content)
git pull origin main --allow-unrelated-histories

# Push to the remote repository
git push -u origin main
```

## If You Encounter Push Rejection

If you see an error like:
```
! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/EekChuck/audio-chunker.git'
```

Try one of these approaches:

### Approach 1: Pull First, Then Push (Recommended)

```bash
git pull origin main --allow-unrelated-histories
# Resolve any merge conflicts if they occur
git push origin main
```

### Approach 2: Force Push (Use with caution)

```bash
git push -f origin main
```

⚠️ **WARNING**: This will overwrite any existing content in the remote repository.

### Approach 3: Create a New Branch

```bash
git checkout -b file-chunker
git push origin file-chunker
```

## After Successful Push

Once you've successfully pushed to your repository, you can deploy to Render following the instructions in [RENDER_DEPLOYMENT.md](app/fastapi-service/RENDER_DEPLOYMENT.md).