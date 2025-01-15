import { NextRequest, NextResponse } from "next/server";

const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://api.studio.nebius.ai/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = await client.chat.completions.create({
      max_tokens: 100,
      temperature: 1,
      top_p: 1,
      top_k: 50,
      n: 1,
      stream: false,
      presence_penalty: 0,
      frequency_penalty: 0,
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are a finance expert. You help broke students to manage finances better. Your name is Orange. Add jokes about cats to your responses from time to time.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const assistantReply = response.choices[0]?.message?.content || "I couldn't think of a good response. 😿";

    return NextResponse.json({ reply: assistantReply });
  } catch (error) {
    console.error("Error communicating with Nebius AI:", error);
    return NextResponse.json({ error: "Failed to fetch response from Nebius AI." }, { status: 500 });
  }
}
