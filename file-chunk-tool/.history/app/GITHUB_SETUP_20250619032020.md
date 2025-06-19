# Connecting to Your GitHub Repository

Your GitHub repository is already set up at:
**https://github.com/EekChuck/audio-chunker.git**

Follow these steps to connect your local project to this repository.

## Step 2: Initialize Git in the Local Project

```bash
cd app
git init
```

## Step 3: Add Your Files to Git

```bash
git add .
```

## Step 4: Make the Initial Commit

```bash
git commit -m "Initial commit: File chunking service for Whisper transcription"
```

## Step 5: Connect to Your GitHub Repository

Connect to your existing repository:

```bash
git remote add origin https://github.com/EekChuck/audio-chunker.git
```

## Step 6: Push Your Code to GitHub

```bash
git push -u origin main
```

Note: If your default branch is named "master" instead of "main", use:

```bash
git push -u origin master
```

## Step 7: Verify on GitHub

Go to `https://github.com/EekChuck/REPO_NAME` to verify that your code has been successfully pushed.

## Additional Commands for Future Updates

After making changes to your code:

```bash
git add .
git commit -m "Description of your changes"
git push