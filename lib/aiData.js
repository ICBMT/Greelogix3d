/* AI universe — sourced from greelogix.com/ai-solutions + its 7 sub-pages */

export const AI_LINKS = [
  { label: "AI Solutions", href: "/ai-solutions", desc: "Industry AI, built around your workflows" },
  { label: "AI Automation", href: "/ai-automation", desc: "n8n workflows, chatbots, voice & phone AI" },
  { label: "AI Chatbots", href: "/ai-chatbots", desc: "GPT-4 & Claude bots that resolve, not deflect" },
  { label: "Voice AI Agents", href: "/voice-ai-agents", desc: "ElevenLabs voices that sound remarkably human" },
  { label: "AI Phone Agents", href: "/ai-phone-agents", desc: "Retell agents handling real calls, 24/7" },
  { label: "Workflow Automation", href: "/workflow-automation", desc: "n8n pipelines across 400+ apps" },
  { label: "AI Consulting", href: "/ai-consulting", desc: "Strategy, readiness & rapid pilots" },
  { label: "AI Integration", href: "/ai-integration-services", desc: "AI inside the software you already have" },
];

const GENERIC_CHALLENGES = [
  { t: "Disconnected tools", d: "Chatbots, workflows, and CRM don't share context — customers repeat themselves." },
  { t: "Demo vs production", d: "AI features work in staging but fail under real load or API changes." },
  { t: "No owner post-launch", d: "Automations break when integrations update unless someone monitors them." },
];
const GENERIC_WHY = [
  { t: "Integration-first delivery", d: "n8n, GPT-4, ElevenLabs, Retell — designed as one system, not siloed demos." },
  { t: "Portfolio proof", d: "Ad Grants Pilot AI admin panel, Shepherd AI tutor app, and production chatbot deployments." },
  { t: "Maintenance retainers", d: "Alerting and tuning after go-live — we don't disappear after handoff." },
];
const GENERIC_TIMELINE = [
  { when: "Week 1", t: "Discovery", items: ["Workflow map", "ROI estimate", "Architecture"] },
  { when: "Week 2–4", t: "Build", items: ["Staging validation", "Integration tests"] },
  { when: "Week 4+", t: "Launch", items: ["Production deploy", "Monitoring"] },
];
const GENERIC_STACK = ["n8n", "OpenAI GPT-4", "Anthropic Claude", "ElevenLabs", "Retell AI", "HubSpot", "Shopify"];

export const AI_PAGES = {
  "ai-automation": {
    path: "/ai-automation", name: "AI Automation", eyebrow: "AI Automation Company",
    title: ["Automate", "everything."],
    intro: "An AI automation company for teams that need n8n workflows, production chatbots, voice agents, and phone AI — integrated with the CRM, ecommerce, and ops tools you already use.",
    stats: [["50+", "Automations deployed"], ["10K+", "Hours saved monthly"], ["$500K+", "Client savings"], ["99.9%", "Uptime"]],
    featuresTitle: "Our automation services",
    features: [
      { t: "n8n Workflow Automation", d: "End-to-end business process automation — we connect your tools and build intelligent workflows that save hours every day.", points: ["CRM & lead management", "Data sync across 400+ integrations", "Webhook-driven processing", "Scheduled reports & alerts"], href: "/workflow-automation", badge: "400+ integrations" },
      { t: "AI Chatbots & Assistants", d: "Custom chatbots powered by GPT-4, Claude and fine-tuned models — bots that actually understand your business.", points: ["Customer support automation", "Lead qualification bots", "Knowledge base assistants", "Conversation analytics"], href: "/ai-chatbots", badge: "80% query resolution" },
      { t: "ElevenLabs Voice Agents", d: "Natural-sounding voice agents for customer interactions, IVR systems, and conversational interfaces.", points: ["Conversational voice bots", "Custom voice cloning", "Real-time voice synthesis", "Interactive voice menus"], href: "/voice-ai-agents", badge: "29+ languages" },
      { t: "Retell AI Phone Agents", d: "Phone agents that handle inbound and outbound calls — scheduling, follow-ups, surveys and sales calls.", points: ["Inbound call handling", "Outbound sales & follow-ups", "Appointment scheduling", "CRM auto-logging"], href: "/ai-phone-agents", badge: "24/7 availability" },
    ],
    challenges: [
      { t: "Tool sprawl", d: "Zapier recipes, one-off scripts, and SaaS features that don't talk to each other." },
      { t: "Chatbots that don't resolve", d: "Generic bots increase frustration when they can't access order data or CRM context." },
      { t: "Voice & phone gaps", d: "IVR trees and missed calls while competitors deploy 24/7 AI agents." },
      { t: "No one owns maintenance", d: "Automations break silently when APIs change — unless someone monitors them." },
    ],
    why: [
      { t: "Full-stack automation partner", d: "n8n workflows, GPT-4 chatbots, ElevenLabs voice, and Retell phone agents — designed and maintained by one senior team." },
      { t: "50+ automations in production", d: "E-commerce, SaaS, healthcare, and real estate workflows with measurable hour and cost savings." },
      { t: "Integration-first", d: "400+ app connectors plus custom API work for Salesforce, HubSpot, Shopify, and internal systems." },
      { t: "Post-launch optimization", d: "We monitor, tune, and extend automations — not hand you a diagram and disappear." },
    ],
    timeline: [
      { when: "Week 1", t: "Process audit", items: ["Workflow map", "ROI estimate", "Tool selection"] },
      { when: "Week 1–2", t: "Design", items: ["Automation architecture", "Error handling plan", "Human fallback rules"] },
      { when: "Week 2–4", t: "Build & test", items: ["n8n / bot / voice build", "Integration tests", "Staging validation"] },
      { when: "Week 4+", t: "Deploy & monitor", items: ["Production rollout", "Alerting", "Optimization sprint"] },
    ],
    stack: ["n8n", "OpenAI GPT-4", "Anthropic Claude", "ElevenLabs", "Retell AI", "HubSpot", "Salesforce", "Shopify", "Slack", "Custom APIs"],
    industries: ["E-commerce", "SaaS", "Healthcare", "Real estate", "Professional services", "Nonprofits"],
    proof: ["MTS EdTech Rescue — Dead → Live", "Ad Grants Pilot — AI admin panel", "Shepherd — AI tutor app", "Jalebi — Restaurant SaaS"],
  },

  "ai-chatbots": {
    path: "/ai-chatbots", name: "AI Chatbots", eyebrow: "AI Chatbot Development",
    title: ["Chatbots that", "actually understand."],
    intro: "Custom AI chatbots powered by GPT-4 & Claude that handle support, qualify leads, and drive sales — available 24/7 across all your channels.",
    stats: [["70%", "Ticket auto-resolution"], ["24/7", "Always available"], ["50+", "Languages supported"], ["<2s", "Response time"]],
    featuresTitle: "Enterprise-grade chatbot features",
    features: [
      { t: "GPT-4 & Claude Powered", d: "The most advanced LLMs for natural, context-aware conversations that truly understand your customers." },
      { t: "Multilingual Support", d: "Chatbots that communicate fluently in 50+ languages, expanding your global reach instantly." },
      { t: "Enterprise Security", d: "SOC2-compliant deployments with data encryption, access controls, and audit trails for regulated industries." },
      { t: "Instant Integration", d: "Connect to your CRM, helpdesk, e-commerce platform, and 200+ tools in minutes, not weeks." },
      { t: "Human Handoff", d: "Smart escalation to live agents when needed, with full conversation context preserved seamlessly." },
      { t: "Analytics Dashboard", d: "Track resolution rates, customer satisfaction, conversation flows, and ROI in real-time." },
    ],
    casesTitle: "Chatbot use cases",
    cases: [
      { m: "70%", t: "Customer Support Automation", d: "Resolve 70% of support tickets automatically with AI that understands your product, policies, and processes." },
      { m: "3x", t: "Lead Qualification & Sales", d: "Engage visitors 24/7, qualify leads with intelligent questioning, and book meetings directly into your calendar." },
      { m: "80%", t: "Internal Knowledge Base", d: "Give employees instant access to company knowledge, HR policies, IT support, and onboarding materials." },
      { m: "25%", t: "E-commerce Shopping Assistant", d: "Guide shoppers with personalized product recommendations, size guides, and order tracking support." },
    ],
    challenges: GENERIC_CHALLENGES, why: GENERIC_WHY,
    timeline: [
      { when: "01", t: "Discovery & Strategy", items: ["Interaction analysis", "Automation opportunities", "Personality & scope"] },
      { when: "02", t: "Knowledge Training", items: ["Docs & FAQ ingestion", "Product data", "Past conversations"] },
      { when: "03", t: "Build & Test", items: ["Branding & flows", "Integrations", "Thorough QA testing"] },
      { when: "04", t: "Deploy & Optimize", items: ["Channel launch", "A/B testing", "Monthly optimization"] },
    ],
    stack: GENERIC_STACK,
  },

  "voice-ai-agents": {
    path: "/voice-ai-agents", name: "Voice AI Agents", eyebrow: "ElevenLabs Voice AI",
    title: ["Voice AI that sounds", "remarkably human."],
    intro: "Production voice AI agents with ElevenLabs — virtual receptionists, IVR replacements, and voice-enabled support that sound human and connect to your CRM, calendar, and knowledge base.",
    stats: [["29+", "Languages"], ["<1s", "Response latency"], ["99.9%", "Uptime"], ["4.8/5", "User satisfaction"]],
    featuresTitle: "Advanced voice AI features",
    features: [
      { t: "Natural Voice Synthesis", d: "Ultra-realistic AI voices powered by ElevenLabs that sound indistinguishable from human agents." },
      { t: "29+ Languages", d: "Voice agents that speak fluently in multiple languages with native-level pronunciation and intonation." },
      { t: "Emotion Detection", d: "AI that recognizes caller sentiment and adjusts tone, pace, and responses for empathetic interactions." },
      { t: "Real-Time Processing", d: "Sub-second response times with streaming voice synthesis for natural, uninterrupted conversations." },
      { t: "Custom Voice Cloning", d: "Create a unique brand voice or clone your best agent's voice for consistent customer experience." },
      { t: "Conversation Analytics", d: "Deep insights into call patterns, customer satisfaction, topic trends, and agent performance." },
    ],
    casesTitle: "Voice AI use cases",
    cases: [
      { m: "60%", t: "Interactive Voice Response", d: "Replace frustrating phone menus with voice AI that understands natural language and routes calls instantly." },
      { m: "90%", t: "Virtual Receptionist", d: "24/7 voice agent that answers calls, schedules appointments, takes messages, and transfers to the right department." },
      { m: "45%", t: "Voice-Enabled Support", d: "Handle common support queries via voice with context-aware responses, troubleshooting guides, and ticket creation." },
      { m: "35%", t: "Voice Commerce & Orders", d: "Enable customers to place orders, check status, and manage accounts through natural voice conversations." },
    ],
    challenges: [
      { t: "Robotic IVR experiences", d: "Customers abandon phone trees that can't understand natural speech." },
      { t: "Support outside business hours", d: "Global customers expect voice support when your team is offline." },
      { t: "Brand voice mismatch", d: "Generic TTS sounds cheap; ElevenLabs-quality voice builds trust." },
      { t: "Web vs telephony confusion", d: "Teams need clarity on in-app voice (ElevenLabs) vs phone lines (Retell)." },
    ],
    why: [
      { t: "ElevenLabs implementation experts", d: "Voice cloning, multilingual agents, and sub-second latency for web and app experiences." },
      { t: "Paired with phone AI", d: "We also deploy Retell AI for inbound/outbound calling when telephony is the channel." },
      { t: "Workflow integration", d: "Voice agents connected to CRM, calendars, and n8n automations — not standalone demos." },
      { t: "Production monitoring", d: "Transcripts, satisfaction signals, and fallback to human agents when confidence drops." },
    ],
    timeline: [
      { when: "Week 1", t: "Use-case & script design", items: ["Conversation flows", "Voice selection", "Escalation rules"] },
      { when: "Week 2–3", t: "Build & integrate", items: ["ElevenLabs agent", "API hooks", "Staging tests"] },
      { when: "Week 3–4", t: "Launch", items: ["Production deploy", "Analytics", "Tuning pass"] },
    ],
    stack: ["ElevenLabs", "OpenAI", "WebRTC", "n8n", "Node.js", "React", "Flutter"],
    industries: ["Healthcare", "Education", "E-commerce", "Hospitality", "SaaS"],
  },

  "ai-phone-agents": {
    path: "/ai-phone-agents", name: "AI Phone Agents", eyebrow: "Retell AI Phone Agents",
    title: ["Phone agents that handle", "real calls, really well."],
    intro: "Retell AI phone agents that answer inbound calls, run outbound campaigns, book appointments, and log every conversation to your CRM — cutting call center costs by up to 60%.",
    stats: [["60%", "Cost reduction"], ["1000+", "Concurrent calls"], ["95%", "Call completion"], ["24/7", "Always on"]],
    featuresTitle: "Powerful phone agent features",
    features: [
      { t: "Inbound & Outbound Calls", d: "Handle incoming customer calls and make proactive outbound calls for appointments, reminders, and follow-ups." },
      { t: "Appointment Scheduling", d: "Book, reschedule, and cancel appointments directly during the call with calendar integration." },
      { t: "Smart Call Routing", d: "Intelligently route calls to the right department or agent based on caller intent and history." },
      { t: "HIPAA Compliant", d: "Secure, compliant phone agents for healthcare, finance, and other regulated industries." },
      { t: "Payment Collection", d: "Securely process payments and handle billing inquiries during phone conversations." },
      { t: "Call Analytics & Recording", d: "Full call transcription, sentiment analysis, and performance dashboards for every interaction." },
    ],
    casesTitle: "Industry solutions",
    cases: [
      { m: "85%", t: "Healthcare & Clinics", d: "Patient intake, appointment booking, prescription refills, and post-visit follow-ups — 60% fewer no-shows, 24/7 patient access." },
      { m: "3x", t: "Real Estate", d: "Qualify leads, schedule viewings, answer listing questions, and follow up automatically — 3x more leads contacted." },
      { m: "50%", t: "Insurance", d: "Claims status, policy questions, quote requests, and renewal reminders — half the call volume, 92% satisfaction." },
      { m: "24/7", t: "Home Services", d: "Book appointments, provide quotes, dispatch technicians, and handle emergency calls round the clock — never miss a lead." },
    ],
    challenges: [
      { t: "Missed inbound revenue", d: "Calls go to voicemail after hours — leads call the next competitor." },
      { t: "Outbound scale limits", d: "Human SDRs can't dial every lead within five minutes of form fill." },
      { t: "Appointment no-shows", d: "Manual reminder calls don't scale for clinics and service businesses." },
      { t: "CRM logging gaps", d: "Reps forget to log calls; pipeline data becomes unreliable." },
    ],
    why: [
      { t: "Retell AI specialists", d: "Inbound/outbound phone agents with natural turn-taking and real PSTN connectivity." },
      { t: "CRM auto-logging", d: "Transcripts and outcomes pushed to HubSpot, Salesforce, or your stack automatically." },
      { t: "Complement to voice web agents", d: "ElevenLabs for in-app voice; Retell when the phone number is the product interface." },
      { t: "Industry playbooks", d: "Healthcare booking, real estate qualification, and SaaS demo scheduling templates." },
    ],
    timeline: [
      { when: "Week 1", t: "Script & routing design", items: ["Call flows", "Qualification logic", "Number setup"] },
      { when: "Week 2–3", t: "Retell build", items: ["Agent training", "CRM integration", "Test calls"] },
      { when: "Week 3–4", t: "Go-live", items: ["Production numbers", "Monitoring", "Optimization"] },
    ],
    stack: ["Retell AI", "Twilio", "HubSpot", "Salesforce", "Google Calendar", "n8n", "GPT-4"],
    industries: ["Healthcare", "Real estate", "Home services", "SaaS", "Insurance"],
  },

  "workflow-automation": {
    path: "/workflow-automation", name: "Workflow Automation", eyebrow: "n8n Workflow Automation",
    title: ["Automate everything", "with n8n workflows."],
    intro: "Connect 400+ apps, eliminate manual tasks, and build powerful automation pipelines that save thousands of hours. We design, build, and maintain your n8n workflows.",
    stats: [["400+", "App integrations"], ["10K+", "Hours saved monthly"], ["99.9%", "Workflow uptime"], ["50+", "Workflows deployed"]],
    featuresTitle: "What we automate",
    features: [
      { t: "E-commerce Automation", d: "Order processing, inventory sync, shipping notifications, and customer follow-ups across Shopify, WooCommerce, and more." },
      { t: "Email & Marketing Automation", d: "Personalized email sequences, audience segmentation, and lead sync between CRM and email tools automatically." },
      { t: "Data Sync & ETL", d: "Keep databases, spreadsheets, and tools in perfect sync with real-time data pipelines and transformations." },
      { t: "CRM & Lead Management", d: "Auto-capture leads, enrich data, score prospects, and route them to sales reps with zero manual work." },
      { t: "Document Processing", d: "Extract data from invoices, contracts, and forms using AI-powered OCR and route to your systems." },
      { t: "DevOps & IT Automation", d: "Deployments, monitoring alerts, incident response, and infrastructure management workflows." },
    ],
    challenges: GENERIC_CHALLENGES, why: GENERIC_WHY, timeline: GENERIC_TIMELINE, stack: GENERIC_STACK,
    proof: ["MTS EdTech Rescue — Dead → Live", "Ad Grants Pilot — AI admin panel", "The INCC — ongoing platform"],
  },

  "ai-consulting": {
    path: "/ai-consulting", name: "AI Consulting", eyebrow: "AI Consulting & Strategy",
    title: ["AI strategy that", "actually delivers."],
    intro: "Don't just adopt AI — implement it strategically. We help you identify the right opportunities, choose the right tools, and execute with confidence for measurable business impact.",
    stats: [["150+", "Products shipped"], ["75+", "AI systems built"], ["3–6mo", "Typical roadmap"], ["2019", "Founded"]],
    featuresTitle: "Our consulting services",
    features: [
      { t: "AI Readiness Assessment", d: "We evaluate your processes, data infrastructure, and team capabilities to identify the highest-ROI AI opportunities." },
      { t: "AI Strategy & Roadmap", d: "A phased implementation plan with clear milestones, budget estimates, and expected ROI for your AI transformation." },
      { t: "Technology Selection", d: "Vendor-agnostic recommendations for the right AI tools, platforms, and models based on your needs and constraints." },
      { t: "Team Training & Enablement", d: "Hands-on workshops and training programs to upskill your team on AI tools, prompt engineering, and automation best practices." },
      { t: "AI Governance & Ethics", d: "Responsible AI policies, data privacy frameworks, and compliance guidelines for regulated industries." },
      { t: "Pilot to Production", d: "We take your AI projects from proof-of-concept to production-ready systems with monitoring, scaling, and optimization." },
    ],
    challenges: GENERIC_CHALLENGES, why: GENERIC_WHY, timeline: GENERIC_TIMELINE, stack: GENERIC_STACK,
    proof: ["MTS EdTech Rescue — Dead → Live", "Ad Grants Pilot — AI admin panel", "The INCC — ongoing platform"],
  },

  "ai-integration-services": {
    path: "/ai-integration-services", name: "AI Integration", eyebrow: "AI Integration Services",
    title: ["AI superpowers for the", "software you have."],
    intro: "We integrate GPT-4, Claude, embeddings, RAG, and agents directly into your existing apps, CRMs, and workflows — without rebuilding what already works.",
    stats: [["50+", "AI integrations shipped"], ["2–6wk", "Typical timeline"], ["40%", "Avg productivity gain"], ["100%", "Your data stays yours"]],
    featuresTitle: "Full-stack AI engineering",
    features: [
      { t: "LLM Integration", d: "OpenAI, Anthropic, Google, Mistral, and open-source models with smart routing and fallbacks." },
      { t: "RAG Pipelines", d: "Retrieval-augmented generation over your docs with vector DBs (Pinecone, pgvector, Qdrant)." },
      { t: "AI Agents & Tools", d: "Multi-step agents that use tools, call APIs, and complete real workflows — not just chat." },
      { t: "Guardrails & Safety", d: "Prompt injection defense, PII redaction, output validation, and compliance-friendly logging." },
      { t: "Streaming & Speed", d: "Token streaming, response caching, and parallel calls for snappy real-time UX." },
      { t: "Cost Optimization", d: "Smart prompt design, caching, and model selection that cuts your AI costs by 40–70%." },
    ],
    casesTitle: "Common integrations",
    cases: [
      { m: "80%", t: "AI Search Over Your Docs", d: "Semantic search and Q&A over your help center, knowledge base, or product documentation." },
      { m: "10h/wk", t: "AI Inside Your CRM", d: "Auto-summarize calls, draft follow-up emails, score leads, and surface next-best-action — per rep." },
      { m: "95%", t: "Document Processing", d: "Extract structured data from invoices, contracts, and PDFs with validation and human-in-the-loop." },
      { m: "20x", t: "Content Generation", d: "Branded blog posts, product descriptions, social copy, and translations at scale with QA gates." },
    ],
    challenges: GENERIC_CHALLENGES, why: GENERIC_WHY, timeline: GENERIC_TIMELINE, stack: GENERIC_STACK,
  },
};

export const AI_HUB = {
  name: "AI Solutions", eyebrow: "Industry AI Solutions",
  title: ["AI built for", "your industry."],
  intro: "Generic chatbots fail because industries do not share the same workflows, systems, or risk. We design production AI around how transportation, hospitality, SaaS, healthcare, real estate, and ecommerce actually run — then say no when automation is the wrong lever.",
  stats: [["150+", "Products shipped"], ["75+", "AI systems built"], ["6", "Industry clusters"], ["QA", "Release sign-off"]],
  approach: [
    { t: "Problems before prompts", d: "We inventory the operational pain — missed handoffs, after-hours demand, manual data entry — before choosing a model." },
    { t: "AI opportunities, ranked", d: "Each use case is scored for ROI, integration risk, and whether software or staffing is a better answer than an LLM." },
    { t: "Workflow-native solutions", d: "Chat, voice, document extraction, or background automation — whichever matches how the work actually moves." },
    { t: "Systems of record", d: "CRM, PMS, TMS, EHR, Shopify, or custom APIs. Write-back and audit trails are in scope, not a phase-two surprise." },
    { t: "When AI does not make sense", d: "Undefined processes, one-off creative work, or missing data access get a no-go — and a recommendation for what to do instead." },
    { t: "Security and privacy by default", d: "PII boundaries, least-privilege keys, and human fallback for sensitive topics are designed in, not bolted on." },
  ],
  opportunities: [
    { m: "CX", t: "Customer operations", d: "After-hours support, booking changes, order status, and FAQ deflection that still escalates with full context." },
    { m: "Rev", t: "Revenue workflows", d: "Lead qualification, quoting assists, and follow-up that write into the CRM instead of dying in a chat transcript." },
    { m: "Ops", t: "Back-office automation", d: "Document intake, scheduling, status sync, and exception routing between the tools the industry already runs." },
    { m: "Voice", t: "Voice and phone replacement", d: "IVR and after-hours call handling for verticals where the phone is still the primary channel." },
  ],
  pricing: [
    { t: "Discovery & Pilot", price: "$5.5k – $14k", d: "Vertical discovery, prompt design, and a narrow production pilot." },
    { t: "Production Build", price: "$14k – $45k", d: "Full voice, chatbot, or automation rollout with guardrails and monitoring." },
    { t: "Managed AI Ops", price: "$4.5k – $12k/mo", d: "Ongoing tuning, model updates, and incident response for live AI systems." },
  ],
  timeline: [
    { when: "Week 1", t: "Discovery", items: ["Workflow map", "System inventory", "KPI baseline", "Go / no-go on AI"] },
    { when: "Weeks 2–3", t: "Pilot architecture", items: ["Integration design", "Guardrails", "Staging pilot", "Cost estimate"] },
    { when: "Weeks 3–8", t: "Production build", items: ["Write-back rules", "QA on critical paths", "Monitoring", "Runbook"] },
    { when: "Days 30–90", t: "Launch & optimize", items: ["KPI review", "Prompt/integration tuning", "Scale plan", "Retainer option"] },
  ],
  industries: ["Transportation", "Hospitality", "SaaS", "Healthcare", "Real estate", "Ecommerce"],
  stack: ["OpenAI GPT-4", "Anthropic Claude", "n8n", "LangChain / RAG", "HubSpot", "Salesforce", "Zendesk", "Twilio / Retell", "PostgreSQL"],
};
