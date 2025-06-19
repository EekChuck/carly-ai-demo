# File Chunker Service

A FastAPI service that chunks large files (>25MB) into smaller pieces (<25MB) for processing with Whisper transcription.

## Overview

This service provides endpoints to:
1. Upload files and automatically chunk them if they exceed 25MB
2. Retrieve information about chunked files
3. Health check endpoint

## API Endpoints

### POST /upload
Upload a file and chunk it if larger than 25MB.

**Request:**
- Form data with a file upload

**Response:**
```json
{
  "file_id": "unique-uuid",
  "original_filename": "example.mp3",
  "original_size": 52428800,
  "chunked": true,
  "num_chunks": 3,
  "chunks": [
    {
      "chunk_number": 1,
      "chunk_filename": "chunk_1_of_3_example.mp3",
      "chunk_path": "chunks/unique-uuid/chunk_1_of_3_example.mp3",
      "chunk_size": 25000000
    },
    ...
  ],
  "message": "File successfully chunked into 3 parts"
}
```

### GET /chunks/{file_id}
Get information about chunks for a specific file ID.

**Response:**
```json
{
  "original_filename": "example.mp3",
  "original_size": 52428800,
  "num_chunks": 3,
  "chunks": [
    {
      "chunk_number": 1,
      "chunk_filename": "chunk_1_of_3_example.mp3",
      "chunk_path": "chunks/unique-uuid/chunk_1_of_3_example.mp3",
      "chunk_size": 25000000
    },
    ...
  ]
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

## Running the Service

### Using Docker

Build the Docker image:
```bash
docker build -t file-chunker .
```

Run the container:
```bash
docker run -p 8000:8000 file-chunker
```

### Without Docker

Install dependencies:
```bash
pip install -r requirements.txt
```

Run the service:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Deployment

### Using Docker

Build the Docker image:
```bash
docker build -t file-chunker .
```

Run the container:
```bash
docker run -p 8000:8000 file-chunker
```

### Without Docker

Install dependencies:
```bash
pip install -r requirements.txt
```

Run the service:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Deploying to Render

For detailed instructions on deploying this service to Render directly from GitHub, see [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md).

Render is recommended because:
- It supports both Docker and Python deployments
- It provides persistent disk storage
- It has generous payload size limits
- It offers easy GitHub integration

## Integration with n8n

### Basic Integration

To integrate this service with n8n:

1. Use an HTTP Request node in n8n to send files to the `/upload` endpoint
2. Configure the HTTP Request node to use multipart/form-data with the file
3. Process the response to get the chunks information
4. Use additional HTTP Request nodes to process each chunk with Whisper

Example n8n workflow:
1. Read a large audio file
2. Send it to the File Chunker service
3. For each chunk returned:
   - Send the chunk to Whisper for transcription
   - Collect and combine the transcription results

### Example Workflow Files

Two example workflow files are provided:

1. `example_n8n_workflow.json` - A basic workflow that demonstrates the core functionality
2. `updated_n8n_workflow.json` - An advanced workflow that integrates with:
   - Google Drive for monitoring new audio files
   - OpenAI for transcription
   - Notion for storing results

The advanced workflow will:
1. Monitor a Google Drive folder for new audio files
2. Check if the file size exceeds 25MB
3. For large files: chunk them using the File Chunker service, transcribe each chunk, then combine
4. For smaller files: transcribe directly
5. Process the transcription with an AI agent to extract structured information
6. Format the results and save them to Notion

## Testing the Service

### Testing with Local Files

You can use the included test client to test the service with local files:

```bash
python test_client.py --file /path/to/large/file.mp3
```

This will upload the file to the service and display information about the chunks.

### Testing with Google Drive Files

For testing with Google Drive files, use the Google Drive test client:

```bash
python google_drive_test_client.py --file "https://drive.google.com/file/d/YOUR_FILE_ID/view"
```

The Google Drive test client supports various Google Drive URL formats:
- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/open?id=FILE_ID`
- `https://docs.google.com/uc?id=FILE_ID`

This client will:
1. Download the file from Google Drive to a temporary location
2. Upload it to the chunking service
3. Display information about the chunks

### Additional Test Client Options

Both test clients support the following options:

```bash
# Check the health of the service
python test_client.py --health

# Get information about chunks for a specific file ID
python test_client.py --file-id YOUR_FILE_ID

# Specify a different service URL
python test_client.py --url http://your-server:8000 --file /path/to/file.mp3
```