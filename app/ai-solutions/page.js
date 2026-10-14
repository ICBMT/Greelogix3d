import AiTemplate from "@/components/AiTemplate";
import { AI_HUB } from "@/lib/aiData";

export const metadata = {
  title: "AI Solutions by Industry | GreeLogix",
  description: "Production AI built around your industry's workflows — transportation, hospitality, SaaS, healthcare, real estate and ecommerce. 75+ AI systems built.",
};

export default function AiSolutionsPage() {
  return <AiTemplate page={{ ...AI_HUB, path: "/ai-solutions" }} hub />;
}
