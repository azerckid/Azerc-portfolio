import { streamText, smoothStream } from "ai";
import { google } from "@ai-sdk/google";
import knowledgeBase from "@/lib/knowledge.json";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Check for API key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("[API Chat] GOOGLE_GENERATIVE_AI_API_KEY is not set");
      return new Response(
        JSON.stringify({ 
          error: "API configuration error. Please check server logs.",
          details: "GOOGLE_GENERATIVE_AI_API_KEY environment variable is missing"
        }), 
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const requestBody = await req.json();
    const rawMessages = requestBody.messages || requestBody;

    console.log(`[API Chat] Received request. Request body keys:`, Object.keys(requestBody));
    console.log(`[API Chat] Messages type:`, Array.isArray(rawMessages) ? 'array' : typeof rawMessages);
    console.log(`[API Chat] Messages length:`, Array.isArray(rawMessages) ? rawMessages.length : 'N/A');
    
    if (Array.isArray(rawMessages) && rawMessages.length > 0) {
      console.log(`[API Chat] First message sample:`, JSON.stringify(rawMessages[0], null, 2));
    }

    if (!rawMessages || !Array.isArray(rawMessages)) {
      return new Response(
        JSON.stringify({ error: "Messages are required and must be an array" }), 
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Filter and validate messages - handle different message formats
    const validMessages = rawMessages
      .map((msg: any) => {
        // Handle messages with 'parts' array (AI SDK v6 format)
        if (msg.parts && Array.isArray(msg.parts)) {
          const textParts = msg.parts
            .filter((part: any) => part.type === 'text' && part.text)
            .map((part: any) => part.text)
            .join(' ');
          
          if (textParts.trim().length > 0) {
            return {
              role: msg.role || 'user',
              content: textParts.trim()
            };
          }
        }
        
        // Handle standard format with content
        if (msg.content && typeof msg.content === 'string' && msg.content.trim().length > 0) {
          return {
            role: msg.role || 'user',
            content: msg.content.trim()
          };
        }
        
        // Handle text property (sendMessage format)
        if (msg.text && typeof msg.text === 'string' && msg.text.trim().length > 0) {
          return {
            role: msg.role || 'user',
            content: msg.text.trim()
          };
        }
        
        return null;
      })
      .filter((msg: any) => msg !== null && (msg.role === "user" || msg.role === "assistant"));

    console.log(`[API Chat] Valid messages after processing: ${validMessages.length}`);

    if (validMessages.length === 0) {
      console.error(`[API Chat] No valid messages found. Raw messages:`, JSON.stringify(rawMessages, null, 2));
      return new Response(
        JSON.stringify({ error: "No valid messages found" }), 
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
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
      - Always respond in Korean unless the user explicitly asks in another language.

      Context from Portfolio Database:
      ${context}
    `;

    console.log(`[API Chat] Processing ${validMessages.length} valid messages`);

    const result = await streamText({
      model: google("gemini-2.0-flash-exp"),
      system: systemPrompt,
      messages: validMessages,
      experimental_transform: smoothStream({ delayInMs: 50 }),
    });

    console.log(`[API Chat] Streaming started`);

    // Use toUIMessageStreamResponse - the standard method for useChat compatibility
    // This handles multiple parts (text, tools, etc.) and is compatible with useChat hook
    try {
      // Debug: Check available methods
      console.log('[API Chat] Checking result methods:', {
        hasToUIMessageStreamResponse: typeof (result as any).toUIMessageStreamResponse === 'function',
        hasToDataStreamResponse: typeof (result as any).toDataStreamResponse === 'function',
        hasToTextStreamResponse: typeof (result as any).toTextStreamResponse === 'function',
        resultKeys: Object.keys(result).slice(0, 10), // First 10 keys
      });
      
      // Check if toUIMessageStreamResponse exists (preferred method)
      if (typeof (result as any).toUIMessageStreamResponse === 'function') {
        console.log('[API Chat] Using toUIMessageStreamResponse');
        return (result as any).toUIMessageStreamResponse();
      }
      
      // Fallback: try toDataStreamResponse
      if (typeof (result as any).toDataStreamResponse === 'function') {
        console.log('[API Chat] Using toDataStreamResponse as fallback');
        return (result as any).toDataStreamResponse();
      }
      
      // Last resort: manual stream creation
      console.warn('[API Chat] Using manual stream creation');
      const encoder = new TextEncoder();
      const dataStream = new ReadableStream({
        async start(controller) {
          try {
            if ((result as any).textStream) {
              for await (const textChunk of (result as any).textStream) {
                if (textChunk && typeof textChunk === 'string') {
                  const data = `0:${textChunk}\n`;
                  controller.enqueue(encoder.encode(data));
                }
              }
            }
            controller.enqueue(encoder.encode('d:[DONE]\n'));
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        }
      });
      
      return new Response(dataStream, {
        headers: {
          'Content-Type': 'text/x-data-stream; charset=utf-8',
          'x-vercel-ai-data-stream': 'v1',
        },
      });
    } catch (error: any) {
      console.error('[API Chat] Error creating stream response:', error);
      throw error;
    }
  } catch (error: any) {
    console.error("[API Chat Error]:", error);
    console.error("[API Chat Error Stack]:", error.stack);
    
    // Provide more detailed error information
    const errorMessage = error.message || "Internal Server Error";
    const isApiKeyError = errorMessage.includes("API key") || errorMessage.includes("GOOGLE");
    
    return new Response(
      JSON.stringify({ 
        error: isApiKeyError 
          ? "API 인증 오류가 발생했습니다. API 키를 확인해주세요."
          : "AI 서버와 통신 중 오류가 발생했습니다.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
