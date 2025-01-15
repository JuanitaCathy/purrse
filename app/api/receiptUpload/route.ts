import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

interface ReceiptData {
  date: string;
  store: string;
  amount: string;
  items?: string[];
}

// Define Nebius AI specific types for better type safety
interface NebiusAICompletion {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Initialize the OpenAI client with Nebius AI configuration
const client = new OpenAI({
  baseURL: 'https://api.studio.nebius.ai/v1/',
  apiKey: process.env.NEBIUS_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    // Validate API key
    if (!process.env.NEBIUS_API_KEY) {
      console.error('NEBIUS_API_KEY is not set');
      return NextResponse.json(
        { message: 'API key configuration error' },
        { status: 500 }
      );
    }

    // Parse request body
    const { image } = await req.json();

    // Validate image data
    if (!image) {
      return NextResponse.json(
        { message: 'Image data is required' },
        { status: 400 }
      );
    }

    try {
      // Make API call to Nebius AI
      const completion = await client.chat.completions.create({
        model: "Qwen/Qwen2-VL-72B-Instruct",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract the following information from this receipt: date, store name, total amount, and list of items if visible. Format the response as a JSON object with the following structure: {\"date\": \"YYYY-MM-DD\", \"store\": \"store name\", \"amount\": \"total amount\", \"items\": [\"item1\", \"item2\"]}"
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${image}`
                }
              }
            ]
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: "json_object" }
      });

      // Validate API response
      const content = completion.choices[0]?.message?.content;
      if (!content) {
        console.error('Empty response from Nebius AI');
        return NextResponse.json(
          { message: 'Invalid API response' },
          { status: 500 }
        );
      }

      // Parse and validate the response data
      try {
        const receiptData: ReceiptData = JSON.parse(content);
        
        // Basic validation of required fields
        if (!receiptData.date || !receiptData.store || !receiptData.amount) {
          throw new Error('Missing required fields in API response');
        }

        return NextResponse.json(receiptData);
      } catch (parseError) {
        console.error('Error parsing API response:', parseError);
        return NextResponse.json(
          { message: 'Failed to parse receipt data' },
          { status: 500 }
        );
      }
    } catch (apiError: any) {
      console.error('Nebius AI API Error:', {
        status: apiError.status,
        message: apiError.message,
        details: apiError.response?.data || apiError.response || apiError
      });
      
      return NextResponse.json(
        { message: `API Error: ${apiError.message}` },
        { status: apiError.status || 500 }
      );
    }
  } catch (error: any) {
    console.error('Request Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}