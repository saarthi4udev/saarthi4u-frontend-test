
import { NextResponse } from "next/server";
import { scholarships } from "@/app/api/scholarshipDiscovery";
import { footerLinks } from "@/app/api/data";
import { headerData } from "@/components/Layout/Header/Navigation/menuData";
import { exams } from "../examDiscovery";

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

type ChatLink = { label: string; href: string };

type BotReply = {
  text: string;
  links?: ChatLink[];
  intent?: Intent;
};

type KnowledgeEntry = {
  question: string;
  answer: string;
  links: ChatLink[];
  intent: Intent;
  searchable: string;
};

const starterLinks: ChatLink[] = [
  { label: "Find Colleges", href: "/college" },
  { label: "Explore Courses", href: "/course" },
  { label: "Career Guidance", href: "/services" },
  { label: "Admission Help", href: "/help" },
  { label: "Talk to Counselor", href: "/contact" },
];

const stopWords = new Set([
  "the",
  "is",
  "a",
  "an",
  "to",
  "of",
  "for",
  "in",
  "on",
  "and",
  "or",
  "with",
  "me",
  "my",
  "i",
  "you",
  "can",
  "do",
  "it",
  "we",
  "our",
  "your",
  "about",
  "please",
  "want",
  "need",
  "tell",
  "how",
  "what",
  "which",
  "when",
  "where",
]);

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(text: string) {
  return normalize(text)
    .split(" ")
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function detectIntent(normalized: string): Intent {
  if (includesAny(normalized, ["counselor", "counsellor", "contact", "call"])) return "counselor";
  if (includesAny(normalized, ["admission", "apply", "application", "deadline", "document"])) return "admissions";
  if (includesAny(normalized, ["scholarship", "fees", "budget", "loan", "financial"])) return "finance";
  if (includesAny(normalized, ["exam", "cat", "mat", "jee", "neet", "cuet", "gate", "clat", "xat"])) {
    return "exams";
  }
  if (includesAny(normalized, ["college", "colleges", "campus", "polytechnic"])) return "colleges";
  if (includesAny(normalized, ["course", "courses", "degree", "diploma", "mba", "btech", "bca"])) {
    return "courses";
  }
  if (includesAny(normalized, ["career", "future", "after 10", "after 12", "guidance"])) return "career";
  if (includesAny(normalized, ["help", "support", "faq", "problem", "issue"])) return "support";

  return "general";
}

function flattenHeaderLinks() {
  const links: ChatLink[] = [];

  for (const item of headerData) {
    links.push({ label: item.label, href: item.href });
    for (const sub of item.submenu ?? []) {
      links.push({ label: sub.label, href: sub.href });
    }
  }

  return links;
}

const navigationLinks: ChatLink[] = [
  ...flattenHeaderLinks(),
  ...footerLinks.features,
  ...footerLinks.resources,
  ...footerLinks.platform,
];

const navigationEntries: KnowledgeEntry[] = navigationLinks.map((link) => ({
  question: link.label,
  answer: `You can open ${link.label} from this page directly.`,
  links: [link],
  intent: link.href.includes("help") || link.href.includes("faq") ? "support" : "general",
  searchable: `${link.label} ${link.href}`,
}));

const examEntries: KnowledgeEntry[] = exams.flatMap((exam) => {
  const examOverview: KnowledgeEntry = {
    question: exam.name,
    answer: `${exam.name}: ${exam.description}`,
    links: [
      { label: "Explore Exams", href: "/exam" },
      { label: "Related Colleges", href: "/college" },
    ],
    intent: "exams",
    searchable: `${exam.name} ${exam.category} ${exam.stream} ${exam.description}`,
  };

  const faqs = exam.faqs.map((faq) => ({
    question: faq.question,
    answer: `${faq.answer} (${exam.name})`,
    links: [
      { label: `${exam.name} Details`, href: `/exam/${exam.slug}` },
      { label: "Explore Exams", href: "/exam" },
    ],
    intent: "exams" as Intent,
    searchable: `${faq.question} ${faq.answer} ${exam.name} ${exam.category}`,
  }));

  return [examOverview, ...faqs];
});

const scholarshipEntries: KnowledgeEntry[] = scholarships.flatMap((item) => {
  const overview: KnowledgeEntry = {
    question: item.name,
    answer: `${item.name}: ${item.shortDescription}`,
    links: [
      { label: "Explore Scholarships", href: "/scholarships" },
      { label: "Eligibility Help", href: "/help" },
    ],
    intent: "finance",
    searchable: `${item.name} ${item.shortDescription} ${item.provider} ${item.level} ${item.stream}`,
  };

  const faqs = item.faqs.map((faq) => ({
    question: faq.question,
    answer: `${faq.answer} (${item.name})`,
    links: [
      { label: `${item.name} Details`, href: `/scholarships/${item.slug}` },
      { label: "Explore Scholarships", href: "/scholarships" },
    ],
    intent: "finance" as Intent,
    searchable: `${faq.question} ${faq.answer} ${item.name} ${item.provider}`,
  }));

  return [overview, ...faqs];
});

const coreEntries: KnowledgeEntry[] = [
  {
    question: "what does saarthi4u do",
    answer:
      "Saarthi4u helps students discover colleges and courses, understand exams and scholarships, and get guided admission and counseling support.",
    links: starterLinks,
    intent: "general",
    searchable: "saarthi4u platform services colleges courses exams scholarships counseling",
  },
  {
    question: "after 10th what should i do",
    answer:
      "After 10th, pick between 11th-12th and diploma based on your interests, career goal, and budget. I can help you compare both options clearly.",
    links: [
      { label: "Explore Courses", href: "/course" },
      { label: "Talk to Counselor", href: "/contact" },
    ],
    intent: "career",
    searchable: "after 10th diploma 11th 12th career guidance",
  },
  {
    question: "after 12th what should i do",
    answer:
      "After 12th, start by finalizing stream + career target, then shortlist courses, colleges, exams, and scholarships together.",
    links: [
      { label: "Career Guidance", href: "/services" },
      { label: "Find Colleges", href: "/college" },
    ],
    intent: "career",
    searchable: "after 12th courses colleges exams career",
  },
];

const knowledgeBase: KnowledgeEntry[] = [...coreEntries, ...navigationEntries, ...examEntries, ...scholarshipEntries];

function scoreEntry(query: string, tokens: string[], entry: KnowledgeEntry) {
  const entryText = normalize(entry.searchable);
  const entryTokens = new Set(tokenize(entry.searchable));
  let score = 0;

  const normalizedQuestion = normalize(entry.question);
  if (query === normalizedQuestion) score += 12;
  if (query.length > 4 && (query.includes(normalizedQuestion) || normalizedQuestion.includes(query))) score += 8;

  for (const token of tokens) {
    if (entryTokens.has(token)) score += 2;
    if (entryText.includes(token)) score += 1;
  }

  return score;
}

function findBestKnowledgeReply(message: string): BotReply | null {
  const normalized = normalize(message);
  const tokens = tokenize(message);

  if (!tokens.length && normalized.length < 2) return null;

  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const score = scoreEntry(normalized, tokens, entry);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (!best || bestScore < 6) return null;

  return {
    text: best.answer,
    links: best.links,
    intent: best.intent,
  };
}

function fallbackReply(message: string, lastIntent: Intent): BotReply {
  const normalized = normalize(message);
  const detectedIntent = detectIntent(normalized);
  const activeIntent = detectedIntent === "general" ? lastIntent : detectedIntent;

  if (activeIntent === "colleges") {
    return {
      text: "Share city, budget, and preferred course. I’ll help with a focused college shortlist.",
      links: [
        { label: "Find Colleges", href: "/college" },
        { label: "Talk to Counselor", href: "/contact" },
      ],
      intent: "colleges",
    };
  }

  if (activeIntent === "courses") {
    return {
      text: "Tell me your class/degree and interests. I’ll suggest suitable course options and next steps.",
      links: [
        { label: "Explore Courses", href: "/course" },
        { label: "Explore Exams", href: "/exam" },
      ],
      intent: "courses",
    };
  }

  if (activeIntent === "career") {
    return {
      text: "I can guide your career path step-by-step. Share your class, marks, and interest areas.",
      links: [
        { label: "Career Guidance", href: "/services" },
        { label: "Talk to Counselor", href: "/contact" },
      ],
      intent: "career",
    };
  }

  if (activeIntent === "admissions") {
    return {
      text: "For admissions, I can help with eligibility, exam route, documents, and timeline planning.",
      links: [
        { label: "Admission Help", href: "/help" },
        { label: "Services", href: "/services" },
      ],
      intent: "admissions",
    };
  }

  if (activeIntent === "finance") {
    return {
      text: "I can help with scholarship and budget-focused options based on your profile.",
      links: [
        { label: "Explore Scholarships", href: "/scholarships" },
        { label: "Find Colleges", href: "/college" },
      ],
      intent: "finance",
    };
  }

  return {
    text: "I can help with colleges, courses, exams, scholarships, admissions, and support. Ask your goal and I’ll guide you.",
    links: starterLinks,
    intent: "general",
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { message?: string; lastIntent?: Intent };
    const message = (body.message ?? "").toString().trim();
    const lastIntent = body.lastIntent ?? "general";

    if (!message) {
      return NextResponse.json(
        {
          text: "Please type your question, and I’ll help.",
          links: starterLinks,
          intent: "general",
        } satisfies BotReply,
        { status: 200 },
      );
    }

    const knowledgeReply = findBestKnowledgeReply(message);
    const reply = knowledgeReply ?? fallbackReply(message, lastIntent);

    return NextResponse.json(reply, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        text: "I’m here to help with colleges, courses, exams, and admissions. Please try again.",
        links: starterLinks,
        intent: "general",
      } satisfies BotReply,
      { status: 200 },
    );
  }
}
