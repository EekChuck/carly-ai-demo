# ⚠️ NOT RECOMMENDED: Deploying the File Chunker Service to Vercel

> **IMPORTANT**: Vercel is **NOT RECOMMENDED** for this service due to payload size limitations (typically 4.5-50MB) and ephemeral file systems, which defeat the purpose of a service designed to handle files larger than 25MB.
>
> Please consider the recommended deployment options in the main README.md file instead.

This guide is provided for educational purposes only, to explain the challenges of adapting a file processing service to serverless environments.

## Critical Limitations of Vercel for File Processing

Vercel's serverless architecture has several limitations that make it unsuitable for this specific use case:

1. **Payload Size Limits**: Vercel limits request/response sizes to 4.5MB (hobby) or up to 50MB (pro plans), which is incompatible with a service designed to handle files larger than 25MB.

2. **Ephemeral File System**: Vercel functions run in a stateless environment where the file system is ephemeral. Files written during one request won't persist for subsequent requests.

3. **Execution Time**: Vercel has a maximum execution time (10-60 seconds depending on your plan), which may not be enough for processing very large files.

4. **Cold Starts**: Serverless functions experience cold starts, which can add latency.

## Solution: Using Cloud Storage

To overcome these limitations, we'll modify the service to use cloud storage (like AWS S3, Google Cloud Storage, or Vercel Blob Storage) instead of the local file system.

## Step 1: Create a Vercel Project

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Create a `vercel.json` file in the `fastapi-service` directory:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "main.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "main.py"
       }
     ]
   }
   ```

## Step 2: Modify the Service for Cloud Storage

Create a modified version of `main.py` that uses cloud storage:

```python
# main_vercel.py
import os
import math
import uuid
import io
from typing import List, Dict, Any
from fastapi import FastAPI, UploadFile, File, Request, HTTPException
from fastapi.responses import JSONResponse

# Import your cloud storage provider
# Example for Vercel Blob Storage:
from vercel_blob import PutBlobResult, del_blob, get_blob, list_blobs, put_blob

app = FastAPI(title="File Chunker API", 
              description="Service to chunk large files into smaller pieces for Whisper transcription")

MAX_CHUNK_SIZE = 25 * 1024 * 1024  # 25MB in bytes

# Store information about chunked files
chunked_files = {}

@app.post("/process")
async def process(request: Request):
    """Legacy endpoint that accepts JSON data"""
    data = await request.json()
    return {"response": f"Received: {data}"}

@app.post("/upload", response_model=Dict[str, Any])
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a file and chunk it if larger than 25MB
    Returns information about the original file and its chunks
    """
    # Generate a unique ID for this upload
    file_id = str(uuid.uuid4())
    
    # Read the file content
    file_content = await file.read()
    file_size = len(file_content)
    
    # Create a unique path for this file
    file_path = f"uploads/{file_id}/{file.filename}"
    
    # Check if file needs chunking
    if file_size <= MAX_CHUNK_SIZE:
        # File is small enough, no need to chunk
        # Upload to cloud storage
        blob_result = await put_blob(file_path, file_content)
        
        return {
            "file_id": file_id,
            "original_filename": file.filename,
            "original_size": file_size,
            "chunked": False,
            "blob_url": blob_result.url,
            "message": "File is under 25MB, no chunking needed"
        }
    
    # Calculate number of chunks needed
    num_chunks = math.ceil(file_size / MAX_CHUNK_SIZE)
    chunks_info = []
    
    # Process the file in memory and create chunks
    for i in range(num_chunks):
        # Calculate chunk boundaries
        start = i * MAX_CHUNK_SIZE
        end = min(start + MAX_CHUNK_SIZE, file_size)
        
        # Extract chunk data
        chunk_data = file_content[start:end]
        chunk_size = len(chunk_data)
        
        # Create chunk filename
        chunk_filename = f"chunk_{i+1}_of_{num_chunks}_{file.filename}"
        chunk_path = f"chunks/{file_id}/{chunk_filename}"
        
        # Upload chunk to cloud storage
        blob_result = await put_blob(chunk_path, chunk_data)
        
        # Store chunk info
        chunks_info.append({
            "chunk_number": i + 1,
            "chunk_filename": chunk_filename,
            "chunk_path": chunk_path,
            "chunk_size": chunk_size,
            "blob_url": blob_result.url
        })
    
    # Store information about this chunked file (in memory - will be lost on cold starts)
    chunked_files[file_id] = {
        "original_filename": file.filename,
        "original_size": file_size,
        "num_chunks": num_chunks,
        "chunks": chunks_info
    }
    
    # Also store the chunked file info in cloud storage for persistence
    metadata_path = f"metadata/{file_id}.json"
    metadata_content = str(chunked_files[file_id]).encode()
    await put_blob(metadata_path, metadata_content)
    
    # Return information about the chunked file
    return {
        "file_id": file_id,
        "original_filename": file.filename,
        "original_size": file_size,
        "chunked": True,
        "num_chunks": num_chunks,
        "chunks": chunks_info,
        "message": f"File successfully chunked into {num_chunks} parts"
    }

@app.get("/chunks/{file_id}")
async def get_chunks(file_id: str):
    """
    Get information about chunks for a specific file ID
    """
    # Try to get from memory first
    if file_id in chunked_files:
        return chunked_files[file_id]
    
    # If not in memory, try to get from cloud storage
    try:
        metadata_path = f"metadata/{file_id}.json"
        blob = await get_blob(metadata_path)
        metadata_content = await blob.text()
        # Parse the string back to a dictionary (in a real app, use proper JSON serialization)
        import ast
        return ast.literal_eval(metadata_content)
    except:
        raise HTTPException(status_code=404, detail="File ID not found")

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy"}
```

## Step 3: Update Requirements

Create a `requirements_vercel.txt` file:

```
fastapi
uvicorn
python-multipart
# Add your cloud storage provider's SDK
# For Vercel Blob Storage:
@vercel/blob
```

## Step 4: Deploy to Vercel

1. Initialize and deploy:
   ```bash
   cd app/fastapi-service
   vercel
   ```

2. Follow the prompts to link to your Vercel account and project.

## Step 5: Configure Environment Variables

Set up any required environment variables for your cloud storage provider in the Vercel dashboard.

## Alternative: Use a Different Hosting Provider

If the limitations of Vercel are too restrictive, consider:

1. **Railway**: Supports Docker deployments and has more generous resource limits
2. **Render**: Offers both Docker and Python service deployments
3. **DigitalOcean App Platform**: Supports Docker deployments
4. **Heroku**: Traditional Python app deployment with persistent file system (in paid tiers)

These platforms would allow you to use the original Docker setup without modifications.

## Conclusion

While it's possible to deploy this service to Vercel with modifications, the serverless nature of Vercel makes it less ideal for file processing applications. Consider the trade-offs carefully before proceeding.