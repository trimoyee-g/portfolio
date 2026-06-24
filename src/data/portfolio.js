export const desktopItems = [
  { id: "about",        icon: "👤", label: "About Me" },
  { id: "experience",   icon: "💼", label: "Experience" },
  { id: "projects",     icon: "📁", label: "Projects" },
  { id: "skills",       icon: "⚡", label: "Skills" },
  { id: "achievements", icon: "🏆", label: "Achievements" },
  { id: "education",    icon: "🎓", label: "Education" },
  { id: "terminal",     icon: "🖥️", label: "Terminal" },
  { id: "contact",      icon: "📬", label: "Contact" },
];

export const profile = {
  name: "Trimoyee Ghosh",
  title: "Software Engineer · AI Applications · Distributed Systems",
  email: "trimoyeeg@gmail.com",
  phone: "+91 6289890955",
  linkedin: "linkedin.com/in/trimoyee-ghosh",
  github: "github.com/trimoyee-g",
  location: "India",
  status: "Seeking SDE-1 opportunities · Immediate Joiner",
  summary: [
    "I'm a recent B.E. graduate from Jadavpur University (May 2026), currently interning as a Software Engineer at Louisa AI in Bengaluru, where I'm building browser extensions that bring AI directly into news platforms.",
    "I prefer working on backend systems. What got me into it was realizing how much happens behind a simple user action. Something as basic as clicking a button can trigger multiple services, events, and database operations. Understanding how all those pieces fit together and building reliable systems around them is what I enjoy most.",
    "I also work with Scale AI evaluating pre-release language and multimodal models via RLHF, and previously interned at PwC India on ETL pipelines and data migration.",
  ],
};

export const experience = [
  {
    company: "Louisa AI",
    role: "Software Engineer Intern",
    period: "Jan 2026 – Present",
    location: "Bengaluru, Karnataka",
    blurb: "My first production engineering role - building a browser extension that lives on top of news platforms so you can talk to an AI without ever leaving the page. The UI part was fun; the part that actually took thinking was getting the three isolated browser contexts to stay in sync without stepping on each other.",
    bullets: [
      "I built the extension using React, TypeScript, and Plasmo - it injects a draggable floating UI into news pages via Shadow DOM keeping the extension's style fully isolated from the host page, with state that persists across tabs.",
      "I designed the messaging layer connecting the background script, content script, and UI context, and wired up the backend API integrations. ",
      "I integrated JWT auth with conditional rendering to provide a secure and dynamic user experience.",
    ],
    icon: "🤖",
    color: "#58a6ff",
  },
  {
    company: "Scale AI",
    role: "Freelance AI Quality Evaluator",
    period: "May 2026 – Present",
    location: "Remote",
    blurb: "I evaluate AI models before they ship, specifically hunting for the cases where the model sounds right but isn't, or where it technically follows the instruction but misses what was actually being asked. It's changed the way I think about writing prompts and about where LLMs actually break down.",
    bullets: [
      "I evaluate pre-release models across reasoning, factual accuracy, and logical consistency - writing structured RLHF feedback that feeds directly into the next training iteration.",
      "I design adversarial prompts aimed at specific failure modes: hallucinations under factual pressure, instruction-following gaps, and reasoning inconsistencies across multimodal inputs.",
    ],
    icon: "⚖️",
    color: "#a371f7",
  },
  {
    company: "PwC",
    role: "Technology Consultant Intern",
    period: "May 2025 – July 2025",
    location: "Kolkata, West Bengal",
    blurb: "I was on a data engineering team. What seemed like a simple transfer of data was actually a chain of ETL processes, transformations, and dependencies spread across multiple systems. Understanding how data flowed through those pipelines and how downstream reporting depended on it - gave me an appreciation for the engineering challenges behind reliable data movement.",
    bullets: [
      "Analyzed end-to-end ETL workflows for data migration pipelines, documenting data flow, transformation logic, and dependencies across pipeline stages.",
      "Built Power BI dashboards using DAX, transforming raw operational data into KPI reports that improved visibility into business metrics.",
    ],
    icon: "🏛️",
    color: "#e3b341",
  },
];

export const projects = [
  {
    id: "safeher",
    name: "SafeHer",
    tagline: "Crowdsourced women's safety ratings, powered by local AI",
    icon: "🛡️",
    color: "#56d364",
    stack: ["React", "TypeScript", "Java", "Spring Boot", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Kafka", "LangChain", "Docker"],
    github: "github.com/trimoyee-g/safeher",
    stats: [{ label: "Services", value: "8" }, { label: "AI Agents", value: "6" }, { label: "Stack", value: "10+" }],
    blurb: "I built SafeHer because the question 'is this place safe?' shouldn't have to be answered from scratch every single time. It's a platform where women can rate public places, read real reviews, and ask an AI safety chatbot — and the part I cared most about getting right was making sure the data couldn't be gamed. A safety app with fake reviews is worse than useless.",
    star: {
      situation: "Women make safety decisions about public places — stations, parks, restaurants — based on gut feeling or word-of-mouth. Generic review apps rate quality, not safety, and don't reflect the experience of people who've actually been there.",
      task: "Build a platform for crowdsourced safety ratings with AI-driven moderation rigorous enough to actually be trusted. Fake reviews on a safety app don't just lower quality — they actively mislead people.",
      action: [
        "Designed the full microservices architecture solo — 8 services across Java Spring Boot + Python FastAPI, with Kafka as the event spine. When a review comes in, score recalculation, moderation, anomaly detection, and vector ingestion all fire concurrently off a single Kafka event. The hot write path never slows down waiting for AI.",
        "Chose Python for the AI service specifically to use LangChain and LangGraph — 6 agents total: moderation, safety summarization, anomaly detection, a writing assistant, a place description generator, and a dual-mode RAG chatbot. All running locally on Ollama — no API keys, no per-call cost, no review data leaving the stack.",
        "The chatbot switches retrieval strategy based on what's being asked: live API fetch from the rating service for place-specific queries (always fresh, no stale vectors), pgvector semantic search for open discovery queries like 'which stations are safe at night?'. Vector ingestion batches 50 reviews per flush using asyncio.gather to avoid N+1 embedding calls.",
        "Materialised safety_score directly on the places row, updated async via Kafka — a GET /places/{id} never crosses a service boundary. PostGIS ST_DWithin handles geo-search with metre precision; Elasticsearch handles text search. Kept them separate — merging them would've sacrificed accuracy for both.",
      ],
      result: "Built and shipped end-to-end solo — 8 microservices, 6 AI agents, and a full Docker Compose deployment. Every decision — the Kafka fan-out, the materialised scores, the dual-mode retrieval — was made to hold up at scale, not just to work in a demo.",
    },
  },
  {
    id: "urlshortener",
    name: "TrimIt",
    tagline: "High-throughput URL shortener with async click analytics",
    icon: "🔗",
    color: "#e3b341",
    stack: ["React", "Java", "Spring Boot", "Redis", "RabbitMQ", "MySQL", "Prometheus", "Grafana", "Docker", "JUnit 5"],
    github: "github.com/trimoyee-g/url-shortener",
    stats: [{ label: "Peak RPS", value: "1232" }, { label: "Redirect P95", value: "138ms" }, { label: "Requests served", value: "1.25M+" }],
    blurb: "I built this because I wanted to know what high-throughput actually feels like — not just read about it. Most tutorials show you the happy path: hash the URL, store it, done. I wanted to make every design call myself and then put real numbers to whether they worked. The Cuckoo Filter before Redis wasn't the obvious first choice — I got there by thinking through what a bot scanning random short codes would actually do to my cache miss rate.",
    star: {
      situation: "I kept reading about caching strategies, rate limiting, and async architectures in system design content but had never had to make those calls under real constraints and then measure whether they held. I wanted a project where the performance was the entire point.",
      task: "Build a URL shortener with hard targets — high RPS, low redirect latency, zero redirect errors under sustained load — and instrument it well enough to see exactly where the limits were.",
      action: [
        "Three-layer read path: Cuckoo Filter → Redis → MySQL. A short code that's never existed gets rejected in microseconds before touching any data store. Unlike a Bloom Filter, the Cuckoo Filter supports deletion — when URLs expire or get deleted, the fingerprint is removed via CF.DEL so the false-positive rate stays bounded as codes get recycled.",
        "Synchronous write-through on creation — MySQL, Redis, and the Cuckoo Filter all updated in the same request. Eliminated the consistency window an async approach would create: a URL is resolvable the instant it's created, no race between the write and read paths.",
        "Click analytics on a RabbitMQ fire-and-forget queue. The redirect path publishes the event and returns immediately — never waiting for GeoIP lookup, device classification, or the DB write. Task queue semantics (process once, ACK, delete) are exactly what analytics needs, no offset management, no replay risk.",
        "Leaky bucket rate limiting as a Redis Lua script — the check-and-decrement has to be atomic or you get race conditions under concurrency. Enforced per IP and per user email independently. Absorbed 137K rate-limited requests in the stress test without touching success rates for legitimate traffic.",
        "Soft delete with deferred hard purge — no URL is immediately hard-deleted. A scheduled job hard-deletes in batches of 500 rows with 100ms pauses between batches to avoid long table locks. Password-protected links store a sentinel value in Redis instead of the destination URL, so the actual target is never cached.",
      ],
      result: "Stress tested at 1500 concurrent users over 17 minutes: 1232 req/s peak, 138ms P95 redirect latency, 100% redirect success rate, 1.25M+ requests served. Baseline at 1000 concurrent: 548 req/s, 57ms P95, 100% success. The Cuckoo Filter and the async analytics queue were the two decisions that had the biggest impact on redirect numbers.",
    },
  },
  {
    id: "deton8",
    name: "Deton8",
    tagline: "Chain Reaction reimagined — real-time multiplayer in the browser",
    icon: "🎮",
    color: "#f85149",
    stack: ["Next.js", "Node.js", "Express.js", "Socket.io", "TypeScript", "Tailwind CSS", "Docker", "Web Audio API"],
    github: "github.com/trimoyee-g/deton8",
    demo: "deton8.vercel.app",
    stats: [{ label: "Game Modes", value: "3" }, { label: "Max Players", value: "4" }, { label: "Deploy", value: "Vercel + Railway" }],
    blurb: "Honestly I just wanted to build something I could actually play with people — no portfolio-padding justification, just a game I liked. Chain Reaction felt perfect because the rules are dead simple but the strategy isn't. The interesting engineering problem snuck up on me: the moment I added online multiplayer, I had to make sure the server was always right, even when clients disagreed.",
    star: {
      situation: "I wanted to learn real-time WebSocket communication through something I'd actually use. CRUD apps are fine for learning databases but terrible for learning concurrency — a multiplayer game is better because a bug is immediately visible to everyone in the room.",
      task: "Build a full-stack multiplayer board game where the server is the single source of truth — no client can cheat, no two players can end up in different game states, and edge cases like disconnects have completely deterministic outcomes.",
      action: [
        "The core decision was making gameEngine.ts a file of pure functions with zero imports and no framework dependencies, then copying it verbatim into both the frontend and backend packages. Local modes run it entirely in the browser with no network call; online mode runs it on the server as the authoritative source. Client/server logic divergence is impossible by construction — they're literally the same file.",
        "Clients only emit moves. The backend validates (correct player? valid cell?), runs the full chain reaction resolution through the shared engine, and broadcasts the resulting state. Clients are renderers, not state managers.",
        "Timed turn skipping is backend-authoritative — only the client whose turn it is emits skipTurn. The backend validates and broadcasts to everyone. Two clients can't independently decide to skip the same turn, and a slow connection can't skip someone else's turn early.",
        "Disconnect handling: when a socket disconnects mid-game with one player remaining, the backend immediately sets status: 'finished' and assigns the winner before broadcasting. No polling, no timeout — the win screen appears on the server's say-so via a gameOver event.",
        "All sounds are procedural Web Audio API — no audio files, nothing to bundle or host. Four events (orb place, chain explosion, urgent tick, win fanfare) synthesised with oscillators and gain envelopes at runtime. AudioContext created lazily on first interaction to stay inside browser autoplay policy.",
      ],
      result: "Live at deton8.vercel.app — Hot Seat, vs Computer (easy/medium AI), and Online Multiplayer, all with optional timed turns, in-game chat, single undo, and a 3D CSS board. The pure shared engine was the right call: I never once had to debug a case where the frontend and backend disagreed on game state.",
    },
  },
];

export const skills = {
  "Languages": ["Java", "Python", "JavaScript", "TypeScript", "SQL"],
  "Frameworks": ["Spring Boot", "React", "FastAPI", "Node.js", "Express.js", "LangChain", "Socket.io", "JUnit 5"],
  "Distributed Systems": ["Kafka", "RabbitMQ", "Redis", "Elasticsearch", "Docker", "Microservices"],
  "Databases": ["PostgreSQL", "MongoDB", "MySQL", "pgvector"],
  "DevOps & Tools": ["GitHub Actions", "Docker", "Prometheus", "Grafana", "k6", "Git"],
  "AI / ML": ["RAG", "LangGraph", "RLHF", "LLM Agents"],
};

export const achievements = [
  {
    icon: "🏆",
    title: "Flipkart Grid 7.0",
    desc: "National Semi-Finalist among 1,60,000+ participants",
    skills: ["Problem Solving", "Data Structures and Algorithms"],
  },
  {
    icon: "💻",
    logo: "https://cdn.simpleicons.org/leetcode/FFA116",
    title: "LeetCode",
    desc: "1200+ problems solved · Highest rating: 1834",
    skills: ["Competitive Programming", "Data Structures and Algorithms"],
  },
  {
    icon: "⭐",
    logo: "https://cdn.simpleicons.org/codechef/B92B27",
    title: "CodeChef",
    desc: "3★ rated · Highest rating: 1627",
    skills: ["Competitive Programming", "Data Structures and Algorithms"],
  },
];

export const education = [
  {
    institution: "Jadavpur University",
    degree: "B.E. in Mechanical Engineering",
    period: "Nov 2022 – May 2026",
    location: "Kolkata, West Bengal, India",
    icon: "🎓",
  },
  {
    institution: "G.D. Birla Centre for Education",
    degree: "Higher Secondary (ISC)",
    period: "May 2022",
    location: "Kolkata, West Bengal, India",
    icon: "🏫",
  },
];
