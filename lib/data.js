export const CALENDLY = "https://calendly.com/abuzer/30min?back=1";
export const SITE = "https://greelogix.com";

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  {
    label: "AI Solutions", href: "/ai-solutions",
    children: [
      { label: "AI Solutions Overview", href: "/ai-solutions", desc: "Industry AI, built around your workflows" },
      { label: "AI Automation", href: "/ai-automation", desc: "n8n workflows, chatbots, voice & phone AI" },
      { label: "AI Chatbots", href: "/ai-chatbots", desc: "GPT-4 & Claude bots that resolve, not deflect" },
      { label: "Voice AI Agents", href: "/voice-ai-agents", desc: "ElevenLabs voices that sound human" },
      { label: "AI Phone Agents", href: "/ai-phone-agents", desc: "Retell agents handling real calls, 24/7" },
      { label: "Workflow Automation", href: "/workflow-automation", desc: "n8n pipelines across 400+ apps" },
      { label: "AI Consulting", href: "/ai-consulting", desc: "Strategy, readiness & rapid pilots" },
      { label: "AI Integration", href: "/ai-integration-services", desc: "AI inside the software you already have" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Free AI Audit", href: "/free-ai-audit" },
];

export const PROBLEMS = [
  { n: "01", t: "Your MVP keeps slipping", d: "Investor pressure, market timing — but the build is stuck in scope creep and slow sprints.", tag: "MVP Development" },
  { n: "02", t: "AI demos that never ship", d: "Prototypes that break on real data, security and the integrations your business actually runs on.", tag: "AI Automation" },
  { n: "03", t: "Code you can't trust", d: "Lovable, Cursor or a previous vendor left a codebase you're afraid to put real users on.", tag: "Code Audit" },
  { n: "04", t: "Senior devs, without the hire", d: "Scale Laravel, Flutter, React or Node delivery — no recruiting, no junior hand-offs.", tag: "Dedicated Teams" },
  { n: "05", t: "Launch blocked by quality", d: "Regressions and edge cases surfacing right before go-live. QA that catches them first.", tag: "QA & Testing" },
  { n: "06", t: "A vendor failed you", d: "Missed deadlines, fragile architecture. We stabilise and ship what others couldn't.", tag: "Project Rescue" },
];

export const SERVICES = [
  { n: "01", t: "AI Automation", d: "Chatbots, voice agents, phone AI and n8n workflows — built for production, not demos.", k: ["GPT-4", "Claude", "n8n", "Voice AI"], hot: true },
  { n: "02", t: "MVP Development", d: "Investor-ready MVPs in 4–8 weeks. Lean scope, senior engineers, clear milestones.", k: ["4–8 weeks", "Lean scope", "Weekly demos"] },
  { n: "03", t: "Custom Software", d: "SaaS platforms, portals and enterprise systems with Laravel, React and Node.js.", k: ["SaaS", "Portals", "APIs"] },
  { n: "04", t: "Laravel", d: "Scalable PHP backends, APIs and admin-heavy business applications that last.", k: ["PHP", "APIs", "PostgreSQL"] },
  { n: "05", t: "flutter & Mobile", d: "Cross-platform iOS & Android apps with Flutter and React Native — one codebase, native feel.", k: ["iOS", "Android", "React Native"] },
  { n: "06", t: "QA & Testing", d: "Manual, automated, performance and security testing — before your users find the bugs.", k: ["Automated", "Security", "Performance"] },
  { n: "07", t: "Chatbot Development", d: "Custom GPT-4 & Claude bots for support, sales qualification and internal knowledge.", k: ["Support", "Sales", "Knowledge"] },
  { n: "08", t: "Code Review & Audit", d: "Senior review for inherited codebases and AI-generated apps. Know exactly where you stand.", k: ["Security", "Refactor", "Roadmap"] },
];

export const PROCESS = [
  { n: "01", t: "Discovery Call", d: "A 30-minute strategy call. We map goals, constraints, stack and timeline — and tell you honestly if we're the right fit.", meta: "30 min · No commitment" },
  { n: "02", t: "Scope & Roadmap", d: "A clear delivery plan: milestones, tech approach, and what ships first for the highest business impact.", meta: "Fixed milestones · No scope creep" },
  { n: "03", t: "Build in Sprints", d: "Senior engineers ship in weekly demos. AI-augmented where it helps — never at the cost of architecture or security.", meta: "Weekly demos · Direct access" },
  { n: "04", t: "Launch & Support", d: "Deployment, QA sign-off, documentation and post-launch fixes. Then we scale with you.", meta: "90 days free support" },
];

export const WORK = [
  { img: "/projects/Jalebi.jpg", t: "Jalebi", c: "Restaurant SaaS Platform", d: "Multi-branch restaurant ops — inventory, orders and reporting in one Laravel + React platform.", tags: ["Laravel", "React", "PostgreSQL"], g: "from-orange/70 via-[#7a2408] to-coal", glyph: "◈" },
  { img: "/projects/ad-grants-pilot.jpg", t: "Ad Grants Pilot", c: "AI Chatbot for Nonprofits", d: "Admin panel for nonprofit ad campaigns — conversation monitoring, AI responses, analytics.", tags: ["Node.js", "OpenAI", "React"], g: "from-[#2c4a3b] via-[#12241b] to-coal", glyph: "✦" },
  { img: "/projects/Shepherd.jpg", t: "Shepherd", c: "AI Tutor & Study App", d: "Flutter app with AI tutor, flashcards, quizzes and personalised study plans for students.", tags: ["Flutter", "OpenAI", "Firebase"], g: "from-[#31456e] via-[#131c30] to-coal", glyph: "⬡" },
];

export const TESTIMONIALS = [
  { q: "What a 70-engineer team could not deliver, a small senior team at GreeLogix shipped. The app went from stuck to live — mobile, web and backend.", a: "EdTech Founder", r: "Platform Rescue · MTS" },
  { q: "Clear communication, fast iterations, and engineers who actually understand the business logic — not just tickets.", a: "SaaS Operator", r: "Custom Software · UK" },
  { q: "They hardened our Lovable prototype, fixed the security gaps, and got us to production in weeks instead of months.", a: "Startup Founder", r: "AI Prototype → Production · US" },
];

export const STACK = ["React", "Next.js", "Flutter", "React Native", "Node.js", "Laravel", "Python", "TypeScript", "OpenAI", "TensorFlow", "PostgreSQL", "MongoDB", "AWS", "Docker", "Firebase", "Supabase", "Figma", "WordPress"];

export const FAQS = [
  { q: "What does GreeLogix actually build?", a: "AI products and automation, custom web & mobile apps, SaaS platforms, MVPs, and the QA that gets them production-ready — for startups, SMEs, nonprofits and international teams." },
  { q: "How fast can you deliver an MVP?", a: "A typical MVP ships in 4–8 weeks. Lean scope, senior engineers only, weekly demos, and milestones agreed before we write a line of code." },
  { q: "Can you fix AI-generated or inherited code?", a: "Yes — it's one of our most requested services. We audit the codebase, fix security and architecture gaps, and harden Lovable / Cursor / Bolt prototypes for real users." },
  { q: "Who will actually work on my project?", a: "Senior engineers, led by the people you meet on the first call. No junior hand-offs, no outsourced surprises — and a response within 4 business hours." },
  { q: "Can I hire dedicated developers?", a: "Yes. Dedicated Laravel, Flutter, React or Node.js engineers who embed in your roadmap, or a fully scoped project team if you prefer fixed milestones." },
];

export const STATS = [
  { v: 150, s: "+", l: "Products shipped" },
  { v: 75, s: "+", l: "AI systems built" },
  { v: 90, s: "+", l: "Happy clients" },
  { v: 5, s: "", l: "Countries served" },
];

/* ---- Portfolio (sourced from greelogix.com/portfolio) ---- */
export const FILTERS = [
  { id: "all", label: "All stories" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web & SaaS" },
  { id: "mobile", label: "Mobile" },
];

export const PROJECTS = [
  {
    slug: "Jalebi", title: "Jalebi", sub: "Restaurant SaaS Platform", cats: ["web"], industry: "Food & Hospitality",
    desc: "A full-featured SaaS platform for restaurants to manage inventory, orders, customers and operations — all in one place.",
    note: "Built to scale from single outlets to multi-branch chains.",
    features: ["Supply management", "Universal menu", "Smarter inventory", "Smarter orders", "Intelligent recipes", "Insightful reporting"],
    stack: ["Laravel", "React", "PostgreSQL", "Redis"], g: "from-[#ffb59d] via-[#ff7a45] to-[#a12c08]", glyph: "◈", device: "browser",
  },
  {
    slug: "ad-grants-pilot", title: "Ad Grants Pilot", sub: "AI Chatbot Admin Panel", cats: ["ai", "web"], industry: "Non-Profit · AI",
    desc: "A centralised admin panel for managing chatbot flows for non-profit ad campaigns — monitor conversations, configure automated responses, and understand performance at a glance.",
    note: "Every conversation, response and campaign — visible in one calm dashboard.",
    features: ["Conversation monitoring", "Automated response config", "Performance analytics", "Multi-campaign management"],
    stack: ["Node.js", "OpenAI", "React", "MongoDB"], g: "from-[#b9d8c5] via-[#4d7d63] to-[#173527]", glyph: "✦", device: "browser",
  },
  {
    slug: "on-card", title: "ON Card", sub: "Digital Business Card Platform", cats: ["mobile", "web"], industry: "Networking · FinTech",
    desc: "Create and share digital business cards with NFC support. Track transactions, capture leads and export straight to CRM — all from a tap.",
    note: "One tap replaces the paper card — and remembers everyone you meet.",
    features: ["Save & sort contacts", "Lead capture form", "Export to Salesforce / CRM", "NFC card (Ion NFC)", "ROI tracking on networking", "Engagement analytics"],
    stack: ["Flutter", "Node.js", "NFC", "Salesforce API"], g: "from-[#c3cdf5] via-[#5d6fb8] to-[#232c52]", glyph: "◎", device: "phone",
  },
  {
    slug: "kim-and-co", title: "Kim & Co", sub: "Internal Product & Sales Tool", cats: ["web"], industry: "Internal Tools · Retail",
    desc: "An internal management tool to manage, analyse and optimise products and the sales pipeline — giving leadership real-time visibility into performance.",
    note: "Leadership stopped asking for reports. The answer is always on screen.",
    features: ["Product management", "Sales analytics", "Performance dashboards", "Team reporting"],
    stack: ["React", "Laravel", "PostgreSQL", "Chart.js"], g: "from-[#f3d9a4] via-[#c99b45] to-[#6b4a12]", glyph: "▦", device: "browser",
  },
  {
    slug: "Lairo", title: "Lairo", sub: "AI Interest Analyzer", cats: ["ai", "mobile"], industry: "AI · Consumer",
    desc: "Upload a screenshot of a conversation and Lairo's AI analyses it to reveal the other person's level of interest — plus smart suggestions on what to reply next.",
    note: "A screenshot goes in. A read on the conversation — and your next reply — comes out.",
    features: ["Screenshot analysis", "Interest level scoring", "AI reply suggestions", "Conversation insights"],
    stack: ["Flutter", "OpenAI Vision", "Python", "FastAPI"], g: "from-[#f2b8d0] via-[#b4527d] to-[#571e38]", glyph: "♡", device: "phone",
  },
  {
    slug: "find-a-doc", title: "Find a Doc", sub: "Doctor Appointment Platform", cats: ["mobile", "web"], industry: "Healthcare",
    desc: "Patients book appointments with specialised doctors. Doctors set their schedule, manage staff and run their practice — one streamlined platform.",
    note: "Booking a doctor now takes less time than describing the symptom.",
    features: ["Patient appointment booking", "Doctor schedule management", "Staff management", "Specialisation search"],
    stack: ["Flutter", "Laravel", "MySQL", "Firebase"], g: "from-[#a8dcd8] via-[#3f8f8a] to-[#173f3c]", glyph: "✚", device: "phone",
  },
  {
    slug: "Shepherd", title: "Shepherd", sub: "AI Tutor & Study App", cats: ["ai", "mobile"], industry: "EdTech · AI",
    desc: "A smart AI tutor that makes learning personal, efficient and engaging — flashcards, quizzes, study plans, streaks and an AI tutor in one app.",
    note: "The tutor that remembers how you learn — and plans tomorrow's session.",
    features: ["AI-powered tutor", "Flashcards & quizzes", "Study plans", "Progress streaks", "Daily task management", "Instant topic help"],
    stack: ["Flutter", "OpenAI", "Firebase", "Node.js"], g: "from-[#b6c8ef] via-[#5470b8] to-[#1d2c52]", glyph: "⬡", device: "phone",
  },
  {
    slug: "DeltaBook", title: "DeltaBook", sub: "Interactive Learning Platform", cats: ["mobile"], industry: "EdTech",
    desc: "Interactive learning with structured lessons, quizzes and progress tracking — Biology, Mathematics, Physics and Historical Science, all guided.",
    note: "Four subjects, one guided path — learners always know what comes next.",
    features: ["Structured lessons", "Subject quizzes", "Progress tracking", "Multi-subject support"],
    stack: ["Flutter", "Firebase", "Node.js", "MongoDB"], g: "from-[#cde3ae] via-[#779c46] to-[#33491a]", glyph: "❧", device: "phone",
  },
  {
    slug: "Xpatio", title: "Xpatio", sub: "Expat Community App", cats: ["mobile"], industry: "Social · Community",
    desc: "A mobile app connecting people from the same country living abroad — community pages, events, job board, marketplace, business profiles and a social feed.",
    note: "A hometown, rebuilt inside an app — wherever in the world you land.",
    features: ["Community pages", "Local & global events", "Job board", "Marketplace", "Business profiles", "Social feed"],
    stack: ["Flutter", "Node.js", "PostgreSQL", "Firebase"], g: "from-[#ffd9a8] via-[#cf8438] to-[#6e3e10]", glyph: "⌂", device: "phone",
  },
  {
    slug: "Hotcoin", title: "Hotcoin", sub: "Video Rewards App", cats: ["mobile"], industry: "Entertainment · Rewards",
    desc: "Users earn coins by watching engaging videos and completing daily tasks — track progress, complete tasks and redeem coins for rewards.",
    note: "Watch, earn, redeem — a loop simple enough to become a daily habit.",
    features: ["Video-based coin earning", "Daily tasks", "Progress tracking", "Rewards redemption", "Smooth UX"],
    stack: ["Flutter", "Node.js", "Firebase", "Stripe"], g: "from-[#ffe29a] via-[#e0a51f] to-[#75540a]", glyph: "●", device: "phone",
  },
];

/* ---- Services hub (sourced from greelogix.com/services) ---- */
export const SERVICE_LANES = [
  {
    id: "ai", num: "01", name: "AI", glyph: "⌁",
    intro: "Chatbots, phone agents, workflow automation and integration work that sits on your existing stack — not a science project.",
    services: [
      { name: "AI Automation", d: "Process automation and agentic workflows for ops, support, and sales.", k: ["Workflow mapping & ROI triage", "Agentic pipelines with human approval steps", "n8n / API orchestration on your stack", "Monitoring, fallbacks & cost controls"], for: "Ops-heavy teams drowning in manual, repetitive work", time: "2–6 weeks" },
      { name: "AI Chatbot Development", d: "Production chatbots for web, WhatsApp, and helpdesks.", k: ["Custom GPT-4 / Claude assistants", "Knowledge-base & RAG setup", "Web, WhatsApp & helpdesk channels", "Admin panel, analytics & handoff to humans"], for: "Support and sales teams fielding the same questions daily", time: "3–6 weeks" },
      { name: "AI Consulting", d: "Readiness, roadmap, and build-vs-buy workshops.", k: ["AI readiness assessment", "Use-case ranking by impact vs effort", "Build-vs-buy analysis", "90-day implementation roadmap"], for: "Leaders who want a plan before a budget", time: "1–2 weeks" },
      { name: "AI Integration Services", d: "GPT, Claude, Gemini, or open-source LLMs inside your product.", k: ["LLM selection & cost modelling", "API integration & prompt engineering", "Guardrails, logging & evals", "Security & data-privacy review"], for: "Products adding AI features users will actually pay for", time: "2–5 weeks" },
      { name: "AI Phone Agents", d: "Inbound and outbound calling agents with human handoff.", k: ["Voice agent design & telephony setup", "Scripts, intents & escalation rules", "CRM & calendar integrations", "Call analytics & QA review"], for: "Teams missing calls — or paying too much to answer them", time: "3–6 weeks" },
    ],
  },
  {
    id: "product", num: "02", name: "Product", glyph: "⬡",
    intro: "From a 4–8 week MVP to a custom system you will still be running in five years.",
    services: [
      { name: "MVP Development", d: "Launch a startup-ready product in 4–8 weeks.", k: ["Lean scope & milestone roadmap", "Senior engineers, weekly demos", "Investor-ready polish & analytics", "Launch checklist & handover docs"], for: "Founders racing runway or a market window", time: "4–8 weeks" },
      { name: "Custom Software Development", d: "SaaS, portals, and internal tools for startups and SMEs.", k: ["Architecture & database design", "SaaS, portals & admin-heavy tools", "Role-based access & reporting", "Deployment, docs & support"], for: "Businesses outgrowing spreadsheets and off-the-shelf tools", time: "6–12 weeks" },
    ],
  },
  {
    id: "stacks", num: "03", name: "Stacks", glyph: "▦",
    intro: "Senior engineers in the stacks we actually ship in production — not a bench of juniors learning on your dime.",
    services: [
      { name: "Laravel Development", d: "SaaS, APIs, rescue, and dedicated Laravel teams.", k: ["SaaS & API platforms", "Admin-heavy business apps", "Legacy rescue & upgrades", "Performance & security hardening"], for: "Teams betting their backend on PHP done right", time: "4–10 weeks" },
      { name: "Django Development", d: "Python web apps, portals, and long-term maintenance.", k: ["Django web apps & portals", "REST APIs with DRF", "Admin & workflow systems", "Maintenance & upgrades"], for: "Python-first teams who need steady, senior hands", time: "4–10 weeks" },
      { name: "Python Development", d: "Django, FastAPI, and Python backends.", k: ["FastAPI micro-services", "Data pipelines & automation", "AI/ML service backends", "Testing & observability"], for: "Products whose brains live in Python", time: "3–8 weeks" },
      { name: "Node.js Development", d: "APIs, realtime backends, and Node services.", k: ["REST & GraphQL APIs", "Realtime (websockets) backends", "Queue & event systems", "Scaling & caching strategy"], for: "Products that must respond in milliseconds", time: "3–8 weeks" },
      { name: "Flutter App Development", d: "Cross-platform iOS and Android from one codebase.", k: ["One codebase, native feel", "Store submission handled", "Offline-first & push notifications", "Analytics & crash monitoring"], for: "Founders who refuse to build the same app twice", time: "5–10 weeks" },
      { name: "React Native Development", d: "Dedicated React Native engineers for iOS and Android.", k: ["Cross-platform app builds", "Native module integration", "OTA updates & CI pipelines", "Store release management"], for: "React teams going mobile without a second stack", time: "5–10 weeks" },
      { name: "WordPress Development", d: "Custom themes, WooCommerce, and headless WordPress.", k: ["Custom themes & blocks", "WooCommerce builds", "Headless WordPress + Next.js", "Speed & security tuning"], for: "Marketing teams who need a site that converts", time: "2–6 weeks" },
    ],
  },
  {
    id: "hire", num: "04", name: "Hire", glyph: "◎",
    intro: "Dedicated engineers in Pakistan with US/UK/UAE/AU overlap. You keep the repo, the process, and the product.",
    services: [
      { name: "Hire Laravel Developers", d: "PHP and SaaS engineers, hourly or monthly.", k: ["Senior Laravel engineers", "Hourly or monthly engagement", "Your repo, your process", "US/UK/UAE overlap hours"], for: "Teams scaling a Laravel product without local hiring", time: "Start in days" },
      { name: "Hire Flutter Developers", d: "Cross-platform mobile specialists.", k: ["Dedicated Flutter specialists", "iOS & Android from one pod", "Daily standups & demos", "Scales up or down monthly"], for: "Mobile roadmaps that can't wait for recruitment", time: "Start in days" },
      { name: "Hire React Native Developers", d: "iOS and Android from one dedicated pod.", k: ["Dedicated RN engineers", "Shared JS skills with your web team", "Release & store management", "Flexible monthly terms"], for: "Web teams extending into mobile", time: "Start in days" },
      { name: "Hire AI / ML Developers", d: "LLM, RAG, and production ML engineers.", k: ["LLM & RAG engineers", "Vector search & evals", "ML pipelines to production", "Cost & latency optimisation"], for: "AI features that must survive real users", time: "Start in days" },
      { name: "Hire Node.js Developers", d: "API and realtime backend engineers.", k: ["API & realtime specialists", "Micro-service architecture", "Testing & CI built-in", "Overlap with your timezone"], for: "Backends outgrowing their first author", time: "Start in days" },
      { name: "Hire Shopify Developers", d: "Custom storefronts and Shopify apps.", k: ["Custom storefronts & themes", "Private & public Shopify apps", "Checkout & subscription flows", "Conversion-focused tweaks"], for: "Stores whose theme stopped keeping up", time: "Start in days" },
    ],
  },
  {
    id: "qa", num: "05", name: "QA", glyph: "✓",
    intro: "Manual, automated, API, and performance testing — including vibe-coded and AI-generated apps before they hit production.",
    services: [
      { name: "Software QA Testing", d: "Full-service QA for web and mobile products.", k: ["Test strategy & planning", "Functional & regression cycles", "Device & browser matrix", "Go / no-go release reports"], for: "Teams whose releases keep breaking trust", time: "1 week – ongoing" },
      { name: "Automated QA Testing", d: "Playwright, Cypress, and CI regression suites.", k: ["Playwright / Cypress suites", "CI-wired regression runs", "Flake fixing & maintenance", "Coverage reporting"], for: "Products shipping too fast for manual QA", time: "2–4 weeks" },
      { name: "Manual Testing Services", d: "Human-led functional and exploratory testing.", k: ["Exploratory charters", "Usability & edge-case hunts", "Bug reports with repro steps", "Release candidate sign-off"], for: "Nuance machines can't catch — yet", time: "1 week – ongoing" },
      { name: "API Testing Services", d: "REST and GraphQL contract and regression tests.", k: ["Contract testing", "Auth & permission suites", "Regression automation", "Postman / code-based suites"], for: "APIs other teams (and apps) depend on", time: "1–3 weeks" },
      { name: "Performance & Load Testing", d: "k6 load tests before a traffic spike.", k: ["k6 load & stress scenarios", "Bottleneck profiling", "Capacity recommendations", "Before/after benchmarks"], for: "Launches that can't afford a slow first impression", time: "1–2 weeks" },
    ],
  },
  {
    id: "design", num: "06", name: "Design", glyph: "✎",
    intro: "Product UI/UX in Figma, design systems, and handoff that engineers can actually build from.",
    services: [
      { name: "Figma UI/UX Design", d: "SaaS and mobile product design from research to handoff.", k: ["Research & user flows", "Wireframes to hi-fi Figma", "Interactive prototypes", "Engineer-ready handoff"], for: "Products being designed before they're built", time: "2–5 weeks" },
      { name: "UI/UX Design", d: "Interfaces, prototypes, and conversion-led redesigns.", k: ["Interface design & prototyping", "Conversion-led redesigns", "Usability audits", "A/B-ready variants"], for: "Interfaces users tolerate instead of love", time: "2–5 weeks" },
      { name: "Figma Design Systems", d: "Reusable component libraries and tokens.", k: ["Component libraries", "Design tokens & variants", "Documentation & governance", "Dev-mode ready specs"], for: "Teams designing the same button for the ninth time", time: "2–4 weeks" },
      { name: "Mobile App UI/UX Design", d: "iOS and Android product design.", k: ["Platform-native patterns", "Onboarding & activation flows", "Motion & micro-interactions", "Store-ready screenshots"], for: "Apps that must feel at home on both stores", time: "2–5 weeks" },
    ],
  },
];
