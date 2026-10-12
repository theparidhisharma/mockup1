import { z } from 'zod';

export const MAX_EXPRESS_SLOTS = 3;
export const turnaroundOptions = [24, 48, 72] as const;
export const quoteSchema = z.object({
  type: z.enum(['essay', 'dissertation', 'application']),
  words: z.number().int().min(1).max(100000),
  hours: z.union([z.literal(24), z.literal(48), z.literal(72)]),
});
export type QuoteInput = z.infer<typeof quoteSchema>;
// Illustrative rates only, never a billable quote.
export function calculatePreviewQuote(input: QuoteInput) {
  const parsed = quoteSchema.safeParse(input);
  if (!parsed.success) return null;
  const rates = { essay: 0.018, dissertation: 0.02, application: 0.025 };
  const multipliers = { 24: 1.5, 48: 1.2, 72: 1 };
  return Math.round(parsed.data.words * rates[parsed.data.type] * multipliers[parsed.data.hours] * 100) / 100;
}
export function availableExpressSlots(booked: number) {
  return Math.max(0, MAX_EXPRESS_SLOTS - Math.max(0, Math.floor(booked)));
}
export function validatePreviewFile(file: { name: string; size: number }) {
  if (!/\.(pdf|docx|doc|txt)$/i.test(file.name)) return 'Please choose a PDF, Word or text document.';
  if (file.size > 20 * 1024 * 1024) return 'Please choose a document under 20 MB.';
  if (file.size === 0) return 'This document is empty.';
  return null;
}
export const enquirySchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(100),
  contact: z.string().trim().max(255).refine(value => z.string().email().safeParse(value).success || /^[+()\d\s-]{7,25}$/.test(value), 'Please enter a valid email or phone number.'),
  university: z.string().trim().max(150),
  needs: z.string().trim().min(10, 'Please tell us a little more (at least 10 characters).').max(1500),
});
