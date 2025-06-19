import os
import math
import uuid
import shutil
from typing import List, Dict, Any
from fastapi import FastAPI, UploadFile, File, Request, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI(title="File Chunker API", 
              description="Service to chunk large files into smaller pieces for Whisper transcription")

# Create a directory to store uploaded files and chunks
UPLOAD_DIR = "uploads"
CHUNK_DIR = "chunks"
MAX_CHUNK_SIZE = 25 * 1024 * 1024  # 25MB in bytes

# Create directories if they don't exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(CHUNK_DIR, exist_ok=True)

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
    
    # Create a directory for this specific upload's chunks
    file_chunk_dir = os.path.join(CHUNK_DIR, file_id)
    os.makedirs(file_chunk_dir, exist_ok=True)
    
    # Save the uploaded file
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Get file size
    file_size = os.path.getsize(file_path)
    
    # Check if file needs chunking
    if file_size <= MAX_CHUNK_SIZE:
        # File is small enough, no need to chunk
        return {
            "file_id": file_id,
            "original_filename": file.filename,
            "original_size": file_size,
            "chunked": False,
            "message": "File is under 25MB, no chunking needed"
        }
    
    # Calculate number of chunks needed
    num_chunks = math.ceil(file_size / MAX_CHUNK_SIZE)
    chunks_info = []
    
    # Open the file and create chunks
    with open(file_path, "rb") as f:
        for i in range(num_chunks):
            # Create chunk file
            chunk_filename = f"chunk_{i+1}_of_{num_chunks}_{file.filename}"
            chunk_path = os.path.join(file_chunk_dir, chunk_filename)
            
            # Read chunk data
            chunk_data = f.read(MAX_CHUNK_SIZE)
            
            # Write chunk to file
            with open(chunk_path, "wb") as chunk_file:
                chunk_file.write(chunk_data)
            
            # Get chunk size
            chunk_size = os.path.getsize(chunk_path)
            
            # Store chunk info
            chunks_info.append({
                "chunk_number": i + 1,
                "chunk_filename": chunk_filename,
                "chunk_path": chunk_path,
                "chunk_size": chunk_size
            })
    
    # Store information about this chunked file
    chunked_files[file_id] = {
        "original_filename": file.filename,
        "original_size": file_size,
        "num_chunks": num_chunks,
        "chunks": chunks_info
    }
    
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
    if file_id not in chunked_files:
        raise HTTPException(status_code=404, detail="File ID not found")
    
    return chunked_files[file_id]

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)