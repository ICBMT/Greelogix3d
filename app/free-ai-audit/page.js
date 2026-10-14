import AuditClient from "@/components/AuditClient";

export const metadata = {
  title: "Free AI & Code Audit — Production Readiness Score | GreeLogix",
  description: "Answer 5 quick questions, get your Production Readiness Score and a free 60-minute debrief with a senior engineer. Built for Lovable, Cursor and legacy stacks.",
};

export default function FreeAiAuditPage() {
  return <AuditClient />;
}
