import AiTemplate from "@/components/AiTemplate";
import { AI_PAGES } from "@/lib/aiData";

export const metadata = {
  title: "AI Integration Services | Add AI to Your Existing Software | GreeLogix",
  description: "GPT-4, Claude, RAG and agents integrated into your existing apps, CRMs and workflows — without rebuilding what works.",
};

export default function Page() {
  return <AiTemplate page={AI_PAGES["ai-integration-services"]} />;
}
