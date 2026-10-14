import AiTemplate from "@/components/AiTemplate";
import { AI_PAGES } from "@/lib/aiData";

export const metadata = {
  title: "AI Automation Company | n8n, Voice Agents & LLM Workflows | GreeLogix",
  description: "AI automation for teams that need n8n workflows, production chatbots, voice agents and phone AI integrated with the tools you already use.",
};

export default function Page() {
  return <AiTemplate page={AI_PAGES["ai-automation"]} />;
}
