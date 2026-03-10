"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type ChatLink = { label: string; href: string };

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
  links?: ChatLink[];
};

type Intent =
  | "general"
  | "colleges"
  | "courses"
  | "career"
  | "admissions"
  | "exams"
  | "finance"
  | "counselor"
  | "support";

type BotReply = {
  text: string;
  links?: ChatLink[];
  intent?: Intent;
};

const starterLinks: ChatLink[] = [
  { label: "Find Colleges", href: "/college" },
  { label: "Explore Courses", href: "/course" },
  { label: "Career Guidance", href: "/services" },
  { label: "Admission Help", href: "/help" },
  { label: "Talk to Counselor", href: "/contact" },
];

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "bot",
    text: "Hi! I’m Saarthi Buddy 👩🏻‍💻. I can help with colleges, courses, admissions, careers, and support.",
    links: starterLinks,
  },
];

const defaultReply: BotReply = {
  text: "Great question. Share your class/degree, target course, budget, and city, and I’ll guide you clearly.",
  links: starterLinks,
  intent: "general",
};

const interestKeywords = [
  "it",
  "cse",
  "computer",
  "ai",
  "ml",
  "mba",
  "medical",
  "law",
  "design",
  "commerce",
  "finance",
  "marketing",
];

const streamKeywords = ["pcmb", "pcm", "pcb", "science", "commerce", "arts", "humanities"];

function extractContext(input: string) {
  const normalized = input.toLowerCase();
  const percentMatch = normalized.match(/\b(\d{2,3})\s*%\b/);
  const stream = streamKeywords.find((item) => normalized.includes(item));
  const interests = interestKeywords.filter((item) => normalized.includes(item));
  const words = normalized.trim().split(/\s+/).filter(Boolean);

  return {
    normalized,
    percentage: percentMatch ? Number(percentMatch[1]) : undefined,
    stream,
    interests,
    words,
  };
}

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function detectIntent(normalized: string): Intent {
  if (includesAny(normalized, ["counselor", "counsellor", "call me", "contact"])) return "counselor";
  if (includesAny(normalized, ["admission", "apply", "application", "deadline"])) return "admissions";
  if (includesAny(normalized, ["scholarship", "financial", "loan", "budget", "fees", "fee"])) return "finance";
  if (includesAny(normalized, ["exam", "cat", "mat", "jee", "neet", "cuet"])) return "exams";
  if (includesAny(normalized, ["college", "colleges", "polytechnic"])) return "colleges";
  if (includesAny(normalized, ["course", "courses", "btech", "bca", "mba", "degree", "diploma"])) return "courses";
  if (includesAny(normalized, ["career", "future", "guidance", "confused", "after 10", "after 12"])) return "career";
  if (includesAny(normalized, ["help", "support", "issue", "problem"])) return "support";

  return "general";
}

function isShortDetailInput(normalized: string, words: string[]) {
  if (words.length === 0 || words.length > 4) return false;
  if (normalized.includes("?")) return false;
  return /^[a-z0-9\s%.-]+$/i.test(normalized);
}

function getBotReply(input: string, lastIntent: Intent): BotReply {
  const { normalized, percentage, stream, interests, words } = extractContext(input);
  const detectedIntent = detectIntent(normalized);
  const activeIntent = detectedIntent === "general" ? lastIntent : detectedIntent;

  if (includesAny(normalized, ["hello", "hi", "hey", "hii"])) {
    return {
      text: "Hello! Tell me what you want first: colleges, courses, career path, or admissions.",
      links: starterLinks,
      intent: "general",
    };
  }

  if (includesAny(normalized, ["who are you", "about", "yourself", "what do you do"])) {
    return {
      text: "I’m Saarthi Buddy, your guide inside Saarthi4u. I help you navigate colleges, courses, exams, scholarships, and counseling support.",
      links: [
        { label: "Services", href: "/services" },
        { label: "Help Center", href: "/help" },
      ],
      intent: "support",
    };
  }

  if (isShortDetailInput(normalized, words) && activeIntent === "colleges") {
    return {
      text: `Great. I noted "${input}". Please add your target course and budget so I can suggest better-fit colleges.`,
      links: [
        { label: "Browse Colleges", href: "/college" },
        { label: "Scholarships", href: "/scholarships" },
      ],
      intent: "colleges",
    };
  }

  if (isShortDetailInput(normalized, words) && activeIntent === "courses") {
    return {
      text: `Nice choice: "${input}". I can now guide eligibility, duration, fees, and best next steps for this option.`,
      links: [
        { label: "Explore Courses", href: "/course" },
        { label: "Relevant Exams", href: "/exam" },
      ],
      intent: "courses",
    };
  }

  if (isShortDetailInput(normalized, words) && activeIntent === "career") {
    return {
      text: `Understood: "${input}". I can suggest 2-3 practical career paths and the right course route from here.`,
      links: [
        { label: "Career Guidance", href: "/services" },
        { label: "Explore Courses", href: "/course" },
      ],
      intent: "career",
    };
  }

  if (activeIntent === "counselor") {
    return {
      text: "You can connect with a counselor for personalized admission planning and profile review.",
      links: [
        { label: "Talk to Counselor", href: "/contact" },
        { label: "Pricing", href: "/pricing" },
      ],
      intent: "counselor",
    };
  }

  if (activeIntent === "admissions") {
    return {
      text: "For admissions, focus on eligibility, entrance exams, documents, and timelines. I can guide each step.",
      links: [
        { label: "Admission Services", href: "/services" },
        { label: "Exams", href: "/exam" },
      ],
      intent: "admissions",
    };
  }

  if (activeIntent === "finance") {
    return {
      text: "I can help you shortlist options based on budget and scholarship opportunities.",
      links: [
        { label: "Scholarships", href: "/scholarships" },
        { label: "Colleges", href: "/college" },
      ],
      intent: "finance",
    };
  }

  if (activeIntent === "exams") {
    return {
      text: "I can map your target course to relevant entrance exams and next actions.",
      links: [
        { label: "Explore Exams", href: "/exam" },
        { label: "Explore Courses", href: "/course" },
      ],
      intent: "exams",
    };
  }

  if (activeIntent === "colleges") {
    return {
      text: "Share preferred city, budget range, and course. I’ll help narrow the best college options quickly.",
      links: [
        { label: "Browse Colleges", href: "/college" },
        { label: "Talk to Counselor", href: "/contact" },
      ],
      intent: "colleges",
    };
  }

  if (activeIntent === "courses") {
    if (normalized.includes("mba")) {
      return {
        text: "For MBA, choose by specialization, entrance score, fees, and location. I can help with a focused shortlist.",
        links: [
          { label: "MBA-Related Exams", href: "/exam" },
          { label: "MBA Colleges", href: "/college" },
        ],
        intent: "courses",
      };
    }

    return {
      text: "I can help compare courses by eligibility, duration, fees, and career outcomes.",
      links: [
        { label: "Explore Courses", href: "/course" },
        { label: "Career Guidance", href: "/services" },
      ],
      intent: "courses",
    };
  }

  if (activeIntent === "career") {
    if (includesAny(normalized, ["after 10", "10th"])) {
      return {
        text: "After 10th, choose between 11th-12th track or diploma based on your interests, goals, and budget. I can help compare both.",
        links: [
          { label: "Explore Courses", href: "/course" },
          { label: "Talk to Counselor", href: "/contact" },
        ],
        intent: "career",
      };
    }

    const streamInfo = stream ? ` from ${stream.toUpperCase()}` : "";
    const scoreInfo = percentage ? ` with ${percentage}%` : "";
    const interestInfo = interests.length ? ` and interest in ${interests.join(", ")}` : "";

    return {
      text: `Great profile${scoreInfo}${streamInfo}${interestInfo}. I suggest starting with 2-3 aligned course tracks, then filtering by colleges and budget.`,
      links: [
        { label: "Career Services", href: "/services" },
        { label: "Explore Courses", href: "/course" },
      ],
      intent: "career",
    };
  }

  if (percentage || stream || interests.length) {
    const streamInfo = stream ? `, stream: ${stream.toUpperCase()}` : "";
    const scoreInfo = percentage ? `score: ${percentage}%` : "profile noted";
    const interestInfo = interests.length ? `, interest: ${interests.join(", ")}` : "";

    return {
      text: `Thanks, I captured your details (${scoreInfo}${streamInfo}${interestInfo}). Next, choose whether you want college shortlisting or course comparison first.`,
      links: [
        { label: "Find Colleges", href: "/college" },
        { label: "Explore Courses", href: "/course" },
      ],
      intent: "general",
    };
  }

  if (includesAny(normalized, ["what", "which", "how", "can you", "should i"])) {
    return {
      text: "Good question. I can answer around colleges, courses, admissions, exams, scholarships, and career direction. Tell me your priority first.",
      links: starterLinks,
      intent: "general",
    };
  }

  return defaultReply;
}

async function getServerBotReply(input: string, lastIntent: Intent): Promise<BotReply | null> {
  try {
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input, lastIntent }),
    });

    if (!response.ok) return null;

    const data = (await response.json()) as BotReply;
    if (!data?.text) return null;

    return data;
  } catch {
    return null;
  }
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastIntent, setLastIntent] = useState<Intent>("general");
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
  }, [messages, loading]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const restartChat = () => {
    setMessages(initialMessages);
    setInput("");
    setLoading(false);
    setLastIntent("general");
  };

  const submitMessage = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const serverReply = await getServerBotReply(trimmed, lastIntent);
    const reply = serverReply ?? getBotReply(trimmed, lastIntent);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: reply.text,
          links: reply.links,
        },
      ]);
      if (reply.intent) {
        setLastIntent(reply.intent);
      }
      setLoading(false);
    }, 900);
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  return (
    <>
      <div className="fixed bottom-40 right-6 z-[9998] sm:bottom-40">
        <button
          type="button"
          onClick={openChat}
          aria-label="Open AI assistant"
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-105 ${
            isOpen && !isMinimized ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
          }`}
        >
          <span className="text-xl" aria-hidden>
            👩🏻‍💻
          </span>
        </button>
      </div>

      <section
        className={`fixed right-4 z-[9998] flex h-[min(38rem,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl transition-all duration-300 sm:right-6 ${
          isOpen && !isMinimized
            ? "bottom-[6.5rem] translate-y-0 opacity-100"
            : "pointer-events-none bottom-[5.5rem] translate-y-4 opacity-0"
        }`}
        aria-live="polite"
      >
        <header className="flex items-center justify-between rounded-t-2xl bg-primary px-4 py-3 text-white">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-base" aria-hidden>
              👩🏻‍💻
            </span>
            <div>
              <p className="text-sm font-semibold">Saarthi Buddy</p>
              <p className="text-xs text-white/90">Instant support for courses, colleges & admissions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={restartChat}
              aria-label="Restart chat"
              className="rounded-md px-2 py-1 text-white/90 transition hover:bg-white/20"
            >
              ↺
            </button>
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              aria-label="Minimize chatbot"
              className="rounded-md px-2 py-1 text-white/90 transition hover:bg-white/20"
            >
              —
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsMinimized(false);
              }}
              aria-label="Close chatbot"
              className="rounded-md px-2 py-1 text-white/90 transition hover:bg-white/20"
            >
              ✕
            </button>
          </div>
        </header>

        <div ref={scrollContainerRef} className="flex-1 space-y-3 overflow-y-auto bg-hero-bg px-4 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
            >
              <p
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "rounded-br-sm bg-primary text-white"
                    : "rounded-bl-sm bg-white text-midnight_text shadow-sm"
                }`}
              >
                {message.text}
              </p>
              {message.role === "bot" && message.links?.length ? (
                <div className="mt-2 flex max-w-[85%] flex-wrap gap-2">
                  {message.links.map((link) => (
                    <a
                      key={`${message.id}-${link.href}`}
                      href={link.href}
                      className="rounded-full border border-primary/30 bg-white px-3 py-1 text-xs font-medium text-primary transition hover:bg-primary/10"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}

          {loading ? (
            <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-sm text-midnight_text shadow-sm">
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
            </div>
          ) : null}
        </div>

        <div className="space-y-3 border-t border-border bg-white px-4 py-3">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitMessage(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about colleges, courses, careers..."
              className="h-10 w-full rounded-xl border border-border bg-white px-3 text-sm"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="h-10 min-w-10 rounded-xl bg-primary px-3 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </section>

    </>
  );
};

export default AIChatbot;
