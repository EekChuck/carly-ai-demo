import os
import requests
import argparse
import json

def upload_file(file_path, server_url="http://localhost:8000"):
    """
    Upload a file to the chunking service
    
    Args:
        file_path: Path to the file to upload
        server_url: URL of the chunking service
        
    Returns:
        Response JSON from the server
    """
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} does not exist")
        return None
    
    print(f"Uploading file: {file_path}")
    
    # Get file size
    file_size = os.path.getsize(file_path)
    print(f"File size: {file_size / (1024 * 1024):.2f} MB")
    
    # Prepare the file for upload
    with open(file_path, 'rb') as f:
        files = {'file': (os.path.basename(file_path), f)}
        
        # Send the request
        response = requests.post(f"{server_url}/upload", files=files)
    
    # Check if the request was successful
    if response.status_code == 200:
        result = response.json()
        print(f"Upload successful!")
        
        if result.get('chunked', False):
            print(f"File was chunked into {result['num_chunks']} parts")
            for chunk in result['chunks']:
                print(f"  Chunk {chunk['chunk_number']}: {chunk['chunk_size'] / (1024 * 1024):.2f} MB")
        else:
            print("File was not chunked (under 25MB)")
            
        return result
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None

def get_chunks_info(file_id, server_url="http://localhost:8000"):
    """
    Get information about chunks for a specific file ID
    
    Args:
        file_id: The file ID to get chunks for
        server_url: URL of the chunking service
        
    Returns:
        Response JSON from the server
    """
    print(f"Getting chunks info for file ID: {file_id}")
    
    # Send the request
    response = requests.get(f"{server_url}/chunks/{file_id}")
    
    # Check if the request was successful
    if response.status_code == 200:
        result = response.json()
        print(f"Found {result['num_chunks']} chunks for file {result['original_filename']}")
        return result
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None

def check_health(server_url="http://localhost:8000"):
    """
    Check the health of the chunking service
    
    Args:
        server_url: URL of the chunking service
        
    Returns:
        True if the service is healthy, False otherwise
    """
    print(f"Checking health of service at {server_url}")
    
    try:
        # Send the request
        response = requests.get(f"{server_url}/health")
        
        # Check if the request was successful
        if response.status_code == 200:
            result = response.json()
            print(f"Service is {result['status']}")
            return True
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            return False
    except requests.exceptions.ConnectionError:
        print(f"Error: Could not connect to {server_url}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Test client for the file chunking service')
    parser.add_argument('--url', default='http://localhost:8000', help='URL of the chunking service')
    parser.add_argument('--file', help='Path to the file to upload')
    parser.add_argument('--file-id', help='File ID to get chunks for')
    parser.add_argument('--health', action='store_true', help='Check the health of the service')
    
    args = parser.parse_args()
    
    if args.health:
        check_health(args.url)
    elif args.file:
        result = upload_file(args.file, args.url)
        if result:
            print("\nFull response:")
            print(json.dumps(result, indent=2))
    elif args.file_id:
        result = get_chunks_info(args.file_id, args.url)
        if result:
            print("\nFull response:")
            print(json.dumps(result, indent=2))
    else:
        parser.print_help()

if __name__ == "__main__":
    main()