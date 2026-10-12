import { describe, expect, it } from 'vitest';
import { availableExpressSlots, calculatePreviewQuote, enquirySchema, MAX_EXPRESS_SLOTS, turnaroundOptions, validatePreviewFile } from '../lib/studio-preview';
describe('studio preview rules', () => {
  it('limits 24-hour capacity to three simultaneous bookings', () => {
    expect(MAX_EXPRESS_SLOTS).toBe(3);
    expect(availableExpressSlots(0)).toBe(3);
    expect(availableExpressSlots(2)).toBe(1);
    expect(availableExpressSlots(3)).toBe(0);
    expect(availableExpressSlots(4)).toBe(0);
  });
  it('offers exactly 24, 48 and 72 hour turnaround', () => { expect(turnaroundOptions).toEqual([24, 48, 72]); });
  it('calculates the illustrative estimate dynamically', () => {
    expect(calculatePreviewQuote({ type: 'essay', words: 3000, hours: 72 })).toBe(54);
    expect(calculatePreviewQuote({ type: 'essay', words: 3000, hours: 24 })).toBe(81);
    expect(calculatePreviewQuote({ type: 'application', words: 2000, hours: 48 })).toBe(60);
  });
  it('rejects invalid word counts', () => {
    expect(calculatePreviewQuote({ type: 'essay', words: -1, hours: 72 })).toBeNull();
    expect(calculatePreviewQuote({ type: 'essay', words: 1.5, hours: 72 })).toBeNull();
  });
  it('accepts document previews and rejects unsupported files', () => {
    expect(validatePreviewFile({ name: 'essay.docx', size: 200 })).toBeNull();
    expect(validatePreviewFile({ name: 'script.exe', size: 200 })).not.toBeNull();
    expect(validatePreviewFile({ name: 'essay.pdf', size: 21 * 1024 * 1024 })).not.toBeNull();
  });
  it('validates enquiry contact information', () => {
    const enquiry = { name: 'Student', contact: 'student@example.com', university: '', needs: 'Help with my dissertation' };
    expect(enquirySchema.safeParse(enquiry).success).toBe(true);
    expect(enquirySchema.safeParse({ ...enquiry, contact: 'invalid' }).success).toBe(false);
  });
});
