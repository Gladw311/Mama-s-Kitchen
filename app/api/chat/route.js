import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

const SYSTEMS = {
  recipe: `You are Mama's Kitchen — a warm, expert recipe assistant for Kenyan cooking and global cuisine... [Rest of your prompt here]`,
  week: `You are Mama's Kitchen meal planner. Return valid JSON only... [Rest of your prompt here]`,
  chat: `You are Mama's Kitchen — a warm cooking assistant for Kenyan and global food... [Rest of your prompt here]`,
};

export async function POST(req: Request) {
  const { type, messages } = await req.json();

  const result = await streamText({
    model: google('gemini-2.0-flash'),
    system: SYSTEMS[type as keyof typeof SYSTEMS] || SYSTEMS.chat,
    messages,
    // Automatically force JSON if the user is in the "week" planner mode
    ...(type === 'week' && { responseFormat: { type: 'json' } }),
  });

  return result.toDataStreamResponse();
}