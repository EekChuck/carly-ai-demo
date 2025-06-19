# Deploying the File Chunker Service to Render

This guide explains how to deploy the File Chunker Service to Render directly from GitHub.

## Why Render?

Render is an excellent choice for this service because:
- It supports both Docker and Python deployments
- It provides persistent disk storage
- It has generous payload size limits
- It offers easy GitHub integration

## Deployment Options

You have two options for deploying to Render:

### Option 1: Deploy as a Web Service with Docker (Recommended)

1. Push your code to GitHub repository: https://github.com/EekChuck/audio-chunker.git
2. Log in to [Render](https://render.com/)
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository (EekChuck/audio-chunker)
5. Configure the service:
   - **Name**: Choose a name (e.g., "file-chunker")
   - **Environment**: Docker
   - **Root Directory**: `app/fastapi-service` (important!)
   - **Branch**: main (or your default branch)
   - **Plan**: Select an appropriate plan (at least 512MB RAM recommended)
   - **Disk**: Add persistent disk (at least 1GB for storing files)
   - **Advanced**: Set environment variables if needed

6. Click "Create Web Service"

Render will automatically use the `Dockerfile` in the `app/fastapi-service` directory.

### Option 2: Deploy as a Python Web Service

If you prefer not to use Docker:

1. Push your code to GitHub repository: https://github.com/EekChuck/audio-chunker.git
2. Log in to [Render](https://render.com/)
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository (EekChuck/audio-chunker)
5. Configure the service:
   - **Name**: Choose a name (e.g., "file-chunker")
   - **Environment**: Python
   - **Root Directory**: `app/fastapi-service` (important!)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Select an appropriate plan (at least 512MB RAM recommended)
   - **Disk**: Add persistent disk (at least 1GB for storing files)
   - **Advanced**: Set environment variables if needed

6. Click "Create Web Service"

## Important Configuration Notes

### Persistent Disk

Make sure to add a persistent disk to your Render service. This is crucial for storing uploaded files and chunks.

In the Render dashboard:
1. Go to your service
2. Click on "Environment"
3. Scroll down to "Disks"
4. Add a disk with at least 1GB of storage
5. Mount it at `/app/uploads` and `/app/chunks`

### Environment Variables

You may need to set these environment variables:
- `PORT`: Render sets this automatically
- `UPLOAD_DIR`: Path to store uploaded files (e.g., `/var/data/uploads`)
- `CHUNK_DIR`: Path to store chunked files (e.g., `/var/data/chunks`)

## Accessing Your Service

Once deployed, your service will be available at:
`https://your-service-name.onrender.com`

You can access the API documentation at:
- `https://your-service-name.onrender.com/docs`
- `https://your-service-name.onrender.com/redoc`

## What About docker-compose.yml?

The `docker-compose.yml` file in this project is **not needed for Render deployment**. It serves these purposes:

1. **Local Development**: Running both the FastAPI service and n8n locally for testing
2. **Self-hosted Deployments**: If you want to run the complete setup (FastAPI + n8n) on your own server

For Render deployment, you only need the files in the `app/fastapi-service` directory.

## Updating Your Deployment

When you push changes to your GitHub repository, Render will automatically rebuild and redeploy your service.