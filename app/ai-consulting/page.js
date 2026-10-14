import AiTemplate from "@/components/AiTemplate";
import { AI_PAGES } from "@/lib/aiData";

export const metadata = {
  title: "AI Consulting Services | Strategy, Feasibility & Rapid Pilots | GreeLogix",
  description: "AI strategy that delivers: readiness assessments, roadmaps, technology selection and pilots taken to production.",
};

export default function Page() {
  return <AiTemplate page={AI_PAGES["ai-consulting"]} />;
}
