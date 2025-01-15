import { NextResponse } from 'next/server';
import fs from 'fs';
import { IncomingForm } from 'formidable';
import axios from 'axios';
import FormData from 'form-data'; // Use the form-data package
import { Readable } from 'stream';
import { IncomingMessage } from 'http';

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser to handle multipart/form-data
  },
};

// Helper function to convert ReadableStream to Node.js Readable stream
function convertReadableStreamToNodeReadable(readableStream: ReadableStream<Uint8Array> | null): Readable | null {
  if (!readableStream) {
    return null;
  }

  const reader = readableStream.getReader();
  const stream = new Readable({
    read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          this.push(null);
        } else {
          this.push(Buffer.from(value));
        }
      });
    },
  });

  return stream;
}

export async function POST(request: Request) {
  try {
    // Ensure the request body is a stream and not null
    if (!request.body) {
      return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
    }

    // Convert ReadableStream to Node.js Readable stream
    const nodeReadableStream = convertReadableStreamToNodeReadable(request.body);

    // Ensure the converted stream is not null before passing to formidable
    if (!nodeReadableStream) {
      return NextResponse.json({ error: 'Failed to convert body to stream' }, { status: 500 });
    }

    // Use formidable to parse the multipart form data
    const form = new IncomingForm();

    // Parse the incoming request body
    const formData: any = await new Promise((resolve, reject) => {
      form.parse(nodeReadableStream as unknown as IncomingMessage, (err, fields, files) => {
        if (err) {
          // Enhanced error logging to capture the actual error
          console.error('Error parsing form:', err);
          return reject(NextResponse.json({ error: 'Failed to process the receipt' }, { status: 500 }));
        }
        
        // Check if files exist
        if (!files || !files.file) {
          return reject(NextResponse.json({ error: 'No file uploaded' }, { status: 400 }));
        }

        // Successfully parsed form data
        resolve({ fields, files });
      });
    });

    // Retrieve file data from the parsed formData
    const file = formData.files.file[0]; // Get the uploaded file
    const filePath = file.filepath; // Get the path of the file

    // Create a new FormData object to send to Nebius API (use form-data package)
    const nebApiFormData = new FormData();
    nebApiFormData.append('file', fs.createReadStream(filePath), file.originalFilename || 'file');

    // Send the file data to Nebius API using axios
    const response = await axios.post(
      'https://api.studio.nebius.ai/v1/models/Qwen/Qwen2-VL-7B-Instruct/inference',
      nebApiFormData,
      {
        headers: nebApiFormData.getHeaders(), // This adds the correct headers for multipart/form-data
      }
    );

    // Return the response from Nebius API
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error uploading receipt:', error);
    return NextResponse.json({ error: 'Failed to process the receipt' }, { status: 500 });
  }
}
