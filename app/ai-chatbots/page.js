import AiTemplate from "@/components/AiTemplate";
import { AI_PAGES } from "@/lib/aiData";

export const metadata = {
  title: "AI Chatbot Development Services | GreeLogix",
  description: "Custom GPT-4 & Claude chatbots that handle support, qualify leads and drive sales — 24/7 across all your channels.",
};

export default function Page() {
  return <AiTemplate page={AI_PAGES["ai-chatbots"]} />;
}
