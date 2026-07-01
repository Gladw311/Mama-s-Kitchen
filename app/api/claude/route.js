const SYSTEMS = {
  recipe: `You are Mama's Kitchen — a warm, expert recipe assistant for Kenyan cooking and global cuisine, created in loving memory of a mother who passed on. Use local ingredients like sukuma wiki, ugali, githeri, nyama choma, pilau. Format responses like this:

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

  week: `You are Mama's Kitchen meal planner. Return ONLY this JSON, no markdown, no backticks:
{"days":[{"day":"Monday","breakfast":"name","lunch":"name","dinner":"name"},{"day":"Tuesday","breakfast":"name","lunch":"name","dinner":"name"},{"day":"Wednesday","breakfast":"name","lunch":"name","dinner":"name"},{"day":"Thursday","breakfast":"name","lunch":"name","dinner":"name"},{"day":"Friday","breakfast":"name","lunch":"name","dinner":"name"},{"day":"Saturday","breakfast":"name","lunch":"name","dinner":"name"},{"day":"Sunday","breakfast":"name","lunch":"name","dinner":"name"}],"shopping":["item 1","item 2"]}
Shopping list should be 20-30 items. Keep meals Kenyan-appropriate and budget-friendly.`,

  chat: `You are Mama's Kitchen — a warm cooking assistant for Kenyan and global food. Answer questions about recipes, ingredients, substitutions, and techniques. Keep answers to 3-5 sentences.`,
};

export async function POST(request) {
  try {
    const { type, messages, prompt } = await request.json();
    const msgArray = messages ?? [{ role: "user", content: prompt }];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1024,
        messages: [
          { role: "system", content: SYSTEMS[type] || SYSTEMS.chat },
          ...msgArray,
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Groq error");
    return Response.json({ text: data.choices[0].message.content });

  } catch (error) {
    console.error("API error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}