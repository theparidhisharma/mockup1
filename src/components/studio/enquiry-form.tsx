import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { enquirySchema } from '@/lib/studio-preview';
export function EnquiryForm() {
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const result = enquirySchema.safeParse(Object.fromEntries(fields.entries()));
    if (!result.success) { setError(result.error.issues[0]?.message ?? 'Please check your details.'); return; }
    setError(''); setSubmitted(true);
  }
  return <section className="contact-band" id="contact"><div className="wrap contact-layout"><div><MessageCircle className="contact-icon" size={35} strokeWidth={1.3} /><p className="eyebrow">A FRIENDLY PLACE TO START</p><h2>Big deadline?<br />Blank page?<br /><em>Let’s talk.</em></h2><p>You don’t need to have it all figured out.<br />Tell us what’s on your mind.</p><span className="consultation-note">Your first 15 minutes are on us.</span></div><form onSubmit={submit} onChange={() => setSubmitted(false)}><div className="contact-fields"><label>Your name<Input name="name" required maxLength={100} placeholder="First and last name" autoComplete="name" /></label><label>Email or phone<Input name="contact" required maxLength={255} placeholder="A way to reach you" autoComplete="email" /></label></div><label>University <span>(optional)</span><Input name="university" maxLength={150} placeholder="Where you’re studying or applying" /></label><label>What could you use a little help with?<Textarea name="needs" required minLength={10} maxLength={1500} placeholder="Your document, deadline, or the bit you’re finding tricky…" rows={4} /></label>{error && <p role="alert" className="field-error">{error}</p>}<div className="contact-submit"><p>Enquiry preview · not sent.<br />No details leave your device.</p><Button type="submit">{submitted ? <><Check />Enquiry checked</> : <>Preview enquiry <ArrowUpRight /></>}</Button></div>{submitted && <p role="status" className="preview-confirmation">Your enquiry is ready. Sending is not connected in this design preview.</p>}</form></div></section>;
}
