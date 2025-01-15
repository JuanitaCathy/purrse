import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

interface ReceiptData {
  date: string;
  store: string;
  amount: string;
  items?: string[];
}

interface ApiError {
  message: string;
}

// Define Nebius AI specific types
interface NebiusAIMessage {
  role: "user" | "assistant";
  content: Array<{
    type: "text" | "image_url";
    text?: string;
    image_url?: {
      url: string;
    };
  }>;
}

interface NebiusAICompletion {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const client = new OpenAI({
  baseURL: 'https://api.studio.nebius.ai/v1/',
  apiKey: process.env.NEBIUS_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReceiptData | ApiError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'Image data is required' });
    }

    // Use any type for the completion create call since Nebius AI has different parameters
    const completion = await (client as any).chat.completions.create({
      max_tokens: 100,
      temperature: 1,
      model: "Qwen/Qwen2-VL-72B-Instruct",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "What receipt information like date, amount, name of store etc are there in this receipt?" 
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${image}`
              },
            },
          ]
        }
      ],
      response_format: {
        type: "json_object"
      },
      // Custom parameters for Nebius AI
      guided_json: {
        type: "object",
        properties: {
          date: { type: "string" },
          store: { type: "string" },
          amount: { type: "string" },
          items: { 
            type: "array",
            items: { type: "string" }
          }
        }
      }
    }) as Promise<NebiusAICompletion>;

    // Safely handle the response content
    const content = (await completion)?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Invalid response from API');
    }

    const receiptData: ReceiptData = JSON.parse(content);
    res.status(200).json(receiptData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error processing receipt' });
  }
}