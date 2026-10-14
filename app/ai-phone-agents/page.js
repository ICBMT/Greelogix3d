import AiTemplate from "@/components/AiTemplate";
import { AI_PAGES } from "@/lib/aiData";

export const metadata = {
  title: "AI Phone Agents | Retell AI Calling Company | GreeLogix",
  description: "Retell AI phone agents that answer inbound calls, run outbound campaigns and book appointments — logging everything to your CRM.",
};

export default function Page() {
  return <AiTemplate page={AI_PAGES["ai-phone-agents"]} />;
}
