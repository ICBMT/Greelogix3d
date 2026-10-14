import AiTemplate from "@/components/AiTemplate";
import { AI_PAGES } from "@/lib/aiData";

export const metadata = {
  title: "Voice AI Agents | ElevenLabs Development Company | GreeLogix",
  description: "Production ElevenLabs voice AI agents — virtual receptionists and IVR replacements that sound remarkably human, in 29+ languages.",
};

export default function Page() {
  return <AiTemplate page={AI_PAGES["voice-ai-agents"]} />;
}
