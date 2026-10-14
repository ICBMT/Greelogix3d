import AiTemplate from "@/components/AiTemplate";
import { AI_PAGES } from "@/lib/aiData";

export const metadata = {
  title: "n8n Workflow Automation Services | GreeLogix",
  description: "Connect 400+ apps and eliminate manual tasks with n8n workflows we design, build and maintain. 10K+ hours saved monthly.",
};

export default function Page() {
  return <AiTemplate page={AI_PAGES["workflow-automation"]} />;
}
