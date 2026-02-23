import { openai } from "@ai-sdk/openai";
import { streamText, Message } from "ai";
import connectDB from "@/lib/mongodb";
import ChatLog from "@/lib/models/ChatLog";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, id } = await req.json();
  const sessionId = id || "anonymous";

  // Connect to DB and log the interaction in the background
  const logInteraction = async (msgs: Message[]) => {
    try {
      await connectDB();
      const lastMessage = msgs[msgs.length - 1];
      
      let chatLog = await ChatLog.findOne({ sessionId });
      
      if (!chatLog) {
        chatLog = new ChatLog({
          sessionId,
          messages: msgs,
          userIp: req.headers.get("x-forwarded-for") || "unknown",
          userAgent: req.headers.get("user-agent") || "unknown",
        });
      } else {
        chatLog.messages = msgs;
      }
      
      await chatLog.save();
    } catch (error) {
      console.error("Failed to log chat:", error);
    }
  };

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    onFinish: async (event) => {
      // Log the full conversation including the AI response
      await logInteraction([...messages, event.response.messages[0]]);
    },
    system: `
      You are a helpful and professional real estate assistant for "Yadadri Icon", a premium residential project by Thomes Infra.
      
      Key project details:
      - Location: Near Yadadri Temple, Telangana.
      - Developer: Thomes Infra (10+ years experience).
      - Project Type: HMDA/DTCP approved open plots.
      - Highlights: 100% Vaastu, 40' & 30' CC roads, underground drainage, electricity, 24/7 security, park area, overhead water tank.
      - Nearby Attractions: Yadadri Temple, Collectorate, Educational Institutions, AIIMS.
      - Documentation: Clear title, spot registration, bank loan facility available.
      
      Your goals:
      1. Answer questions about the project, locations, and amenities.
      2. Be polite, encouraging, and professional.
      3. If a user asks about specific pricing, suggest they fill out the contact form or visit the site for the most accurate quote.
      4. Highlight the trust factors: HMDA/DTCP approvals and Thomes Infra's reputation.
      5. Keep responses concise and focused on helping the customer make an informed decision.
    `,
  });

  return result.toDataStreamResponse();
}
