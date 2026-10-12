/**
 * Books / long-form writing catalog.
 *
 * Add a book here and it appears on /books and gets a detail page at
 * /books/[slug]. The current catalog is empty — books will be added as
 * they're written.
 *
 * TODO (Richard): Drop in real book entries as you write them. Fields
 * below are the minimum for the listing + detail page to render.
 */

export interface BookDefinition {
  slug: string;
  title: string;
  subtitle?: string;
  category: "guide" | "essay" | "manual" | "notes" | "whitepaper";
  status: "draft" | "in-progress" | "published";
  summary: string;
  description: string;
  topics: string[];
  audience: string;
  lengthMinutes?: number;
  publishedAt?: string; // ISO date
  formats: ("ebook" | "pdf" | "physical")[];
  price?: {
    currency: "USD" | "ZMW" | "EUR" | "GBP";
    ebook?: number;
    physical?: number;
  };
  buyLinks?: { label: string; href: string; external?: boolean }[];
  cover?: string; // path under /public
}

export const books: BookDefinition[] = [
  // Example entry — commented out so the catalog stays empty until you publish.
  // {
  //   slug: "ai-for-zambian-smes",
  //   title: "AI for Zambian SMEs",
  //   subtitle: "A practical guide to using AI in your business",
  //   category: "guide",
  //   status: "published",
  //   summary: "...",
  //   description: "...",
  //   topics: ["AI", "SMEs", "Zambia"],
  //   audience: "...",
  //   lengthMinutes: 90,
  //   publishedAt: "2026-12-01",
  //   formats: ["ebook", "pdf"],
  //   price: { currency: "USD", ebook: 9 },
  //   buyLinks: [],
  //   cover: "/images/books/ai-for-zambian-smes.png",
  // },
];

export const allBooks = books;

export function getBookBySlug(slug: string): BookDefinition | undefined {
  return books.find((b) => b.slug === slug);
}

export function getPublishedBooks(): BookDefinition[] {
  return books.filter((b) => b.status === "published");
}