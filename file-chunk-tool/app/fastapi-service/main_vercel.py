import os
import math
import uuid
import json
from typing import List, Dict, Any
from fastapi import FastAPI, UploadFile, File, Request, HTTPException
from fastapi.responses import JSONResponse

# Note: Uncomment and use the appropriate cloud storage SDK
# For Vercel Blob Storage:
# from vercel_blob import PutBlobResult, del_blob, get_blob, list_blobs, put_blob

# For AWS S3:
# import boto3
# s3_client = boto3.client('s3')
# S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME', 'your-bucket-name')

# For Google Cloud Storage:
# from google.cloud import storage
# storage_client = storage.Client()
# GCS_BUCKET_NAME = os.environ.get('GCS_BUCKET_NAME', 'your-bucket-name')

app = FastAPI(title="File Chunker API", 
              description="Service to chunk large files into smaller pieces for Whisper transcription")

MAX_CHUNK_SIZE = 25 * 1024 * 1024  # 25MB in bytes

# Store information about chunked files (in-memory cache, will be lost on cold starts)
chunked_files = {}

# Helper functions for cloud storage operations
# Implement these functions based on your chosen cloud storage provider

async def upload_to_cloud(file_path: str, content: bytes) -> Dict[str, Any]:
    """
    Upload content to cloud storage
    
    Args:
        file_path: Path/key for the file in cloud storage
        content: File content as bytes
        
    Returns:
        Dict with information about the uploaded file, including URL
    """
    # Example implementation for Vercel Blob Storage:
    # blob_result = await put_blob(file_path, content)
    # return {"url": blob_result.url, "path": file_path}
    
    # Example implementation for AWS S3:
    # s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=file_path, Body=content)
    # url = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/{file_path}"
    # return {"url": url, "path": file_path}
    
    # Example implementation for Google Cloud Storage:
    # bucket = storage_client.bucket(GCS_BUCKET_NAME)
    # blob = bucket.blob(file_path)
    # blob.upload_from_string(content)
    # url = f"https://storage.googleapis.com/{GCS_BUCKET_NAME}/{file_path}"
    # return {"url": url, "path": file_path}
    
    # Placeholder implementation (replace with actual implementation)
    return {"url": f"https://example.com/{file_path}", "path": file_path}

async def get_from_cloud(file_path: str) -> bytes:
    """
    Get content from cloud storage
    
    Args:
        file_path: Path/key for the file in cloud storage
        
    Returns:
        File content as bytes
    """
    # Example implementation for Vercel Blob Storage:
    # blob = await get_blob(file_path)
    # return await blob.arrayBuffer()
    
    # Example implementation for AWS S3:
    # response = s3_client.get_object(Bucket=S3_BUCKET_NAME, Key=file_path)
    # return response['Body'].read()
    
    # Example implementation for Google Cloud Storage:
    # bucket = storage_client.bucket(GCS_BUCKET_NAME)
    # blob = bucket.blob(file_path)
    # return blob.download_as_bytes()
    
    # Placeholder implementation (replace with actual implementation)
    raise HTTPException(status_code=404, detail="File not found in cloud storage")

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
        blob_result = await upload_to_cloud(file_path, file_content)
        
        return {
            "file_id": file_id,
            "original_filename": file.filename,
            "original_size": file_size,
            "chunked": False,
            "blob_url": blob_result["url"],
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
        blob_result = await upload_to_cloud(chunk_path, chunk_data)
        
        # Store chunk info
        chunks_info.append({
            "chunk_number": i + 1,
            "chunk_filename": chunk_filename,
            "chunk_path": chunk_path,
            "chunk_size": chunk_size,
            "blob_url": blob_result["url"]
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
    metadata_content = json.dumps(chunked_files[file_id]).encode()
    await upload_to_cloud(metadata_path, metadata_content)
    
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
        metadata_content = await get_from_cloud(metadata_path)
        return json.loads(metadata_content.decode())
    except:
        raise HTTPException(status_code=404, detail="File ID not found")

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)