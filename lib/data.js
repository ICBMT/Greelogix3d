export const CALENDLY = "https://calendly.com/abuzer/30min?back=1";
export const SITE = "https://greelogix.com";

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" },
  { label: "FAQ", href: "#faq" },
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
  { t: "Jalebi", c: "Restaurant SaaS Platform", d: "Multi-branch restaurant ops — inventory, orders and reporting in one Laravel + React platform.", tags: ["Laravel", "React", "PostgreSQL"], g: "from-orange/70 via-[#7a2408] to-coal", glyph: "◈" },
  { t: "Ad Grants Pilot", c: "AI Chatbot for Nonprofits", d: "Admin panel for nonprofit ad campaigns — conversation monitoring, AI responses, analytics.", tags: ["Node.js", "OpenAI", "React"], g: "from-[#2c4a3b] via-[#12241b] to-coal", glyph: "✦" },
  { t: "Shepherd", c: "AI Tutor & Study App", d: "Flutter app with AI tutor, flashcards, quizzes and personalised study plans for students.", tags: ["Flutter", "OpenAI", "Firebase"], g: "from-[#31456e] via-[#131c30] to-coal", glyph: "⬡" },
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
