import { NextResponse } from "next/server";

const SYSTEMS = {
  recipe: `You are Mama's Kitchen — a warm expert recipe assistant for Kenyan cooking and global cuisine. Use local ingredients like sukuma wiki, ugali, githeri, nyama choma, pilau. Format responses exactly like this:

🍽️ RECIPE NAME
[One warm sentence]

⏱️ Prep: X mins | Cook: Y mins | Serves: Z

📋 INGREDIENTS
- [ingredient with quantity]

👩‍🍳 METHOD
1. [Step]

💚 HEALTH NOTES
[Relevant notes]

💡 MAMA'S TIP
[One warm tip]`,

  week: `You are Mama's Kitchen meal planner. Return ONLY valid JSON, no markdown, no backticks, nothing else:
{"days":[{"day":"Monday","breakfast":"name","lunch":"name","dinner":"name"},{"day":"Tuesday","breakfast":"name","lunch":"name","dinner":"name"},{"day":"Thursday","breakfast":"name","lunch":"name","dinner":"name"},{"day":"Friday","breakfast":"name","lunch":"name","dinner":"name"},{"day":"Saturday","breakfast":"name","lunch":"name","dinner":"name"},{"day":"Sunday","breakfast":"name","lunch":"name","dinner":"name"}],"shopping":["item 1","item 2"]}`,

  chat: `You are Mama's Kitchen — a warm cooking assistant for Kenyan and global food. Keep answers to 3-5 sentences.`,
};

export async function POST(request) {
  try {
    const { type, messages, prompt } = await request.json();
    const msgArray = messages ?? [{ role: "user", content: prompt }];

    // 1. Build Payload
    const payload = {
      model: "openai/gpt-oss-20b",
      max_tokens: 1024,
      messages: [
        { role: "system", content: SYSTEMS[type] || SYSTEMS.chat },
        ...msgArray,
      ],
    };

    // 2. Enable forced JSON output for 'week' mode
    if (type === "week") {
      payload.response_format = { type: "json_object" };
    }

    // 3. Make fetch call
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    // 4. Handle HTTP errors from Groq API directly
    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      console.error("Groq API Error Details:", errorPayload);
      return NextResponse.json(
        { error: errorPayload.error?.message || "Groq API Request Failed" },
        { status: response.status }
      );
    }

    // 5. Parse and return final output
    const data = await response.json();
    const reply = data.choices[0]?.message?.content;

    return NextResponse.json({ result: reply });
  } catch (error) {
    console.error("Server API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}