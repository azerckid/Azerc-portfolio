import { streamText, smoothStream } from "ai";
import { google } from "@ai-sdk/google";
import knowledgeBase from "@/lib/knowledge.json";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages: rawMessages } = await req.json();

    console.log(`[API Chat] Received request. Messages: ${rawMessages?.length}`);

    if (!rawMessages || !Array.isArray(rawMessages)) {
      return new Response(JSON.stringify({ error: "Messages are required" }), { status: 400 });
    }

    // Use pre-bundled knowledge from JSON
    const context = (knowledgeBase as any[]).map(item => {
      return `\n--- SOURCE: ${item.source} ---\n${item.content}\n`;
    }).join("\n");

    const systemPrompt = `
      You are the "AZERC AI Concierge", a sophisticated assistant for Nam Hyeongseog's professional portfolio.
      
      Your personality: Professional, encouraging, and deeply technical yet accessible.
      
      Your knowledge base is strictly limited to the provided context about Nam Hyeongseog (AZERC). When answering:
      1. Use specific technical details (Next.js 15, Three.js, Solidity, AI Agents) found in the context.
      2. If asked about "BondBase", explain the flow from Faucet -> Bond Market -> Invest.
      3. If asked about technical skills, highlight the "Nexus of Innovation" concept.
      4. Always respond in a way that feels premium and futuristic.
      
      CRITICAL:
      - If the information is not in the context, clearly state that you don't have that specific data but suggest they contact Nam directly.
      - Use Markdown for beautiful formatting (tables, lists, bold text).
      - Always respond as an AI Concierge who is here to guide visitors through AZERC's digital legacy.

      Context from Portfolio Database:
      ${context}
    `;

    const result = streamText({
      model: google("gemini-2.0-flash-exp"),
      system: systemPrompt,
      messages: rawMessages,
      experimental_transform: smoothStream({ delayInMs: 20 }),
    });

    return (result as any).toDataStreamResponse();
  } catch (error: any) {
    console.error("[API Chat Error]:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
