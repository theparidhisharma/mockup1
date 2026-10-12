import { createFileRoute } from '@tanstack/react-router';
import { ArrowDown, ArrowUpRight, BookOpen, Check, ChevronDown, FileCheck, GraduationCap, Menu, MessageCircle, PenLine, Quote, Sprout, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EditingDemo } from '@/components/studio/editing-demo';
import { QuotePreview } from '@/components/studio/quote-preview';
import { EnquiryForm } from '@/components/studio/enquiry-form';
import student from '@/assets/studio-student.jpg';
import team from '@/assets/studio-team.jpg';
import notes from '@/assets/studio-notes.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Your Studio | Your words, a little clearer.' },
    { name: 'description', content: 'A friendly academic writing studio. Explore thoughtful editing in action, proofreading, coaching and a personalised quote preview.' },
    { property: 'og:title', content: 'Your Studio | Your words, a little clearer.' },
    { property: 'og:description', content: 'Human support for essays, dissertations and university applications. Your ideas. Your voice. A little more confidence.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Index,
});
const services = [
  { icon: MessageCircle, title: 'A little conversation', subtitle: 'FREE 15-MINUTE CONSULTATION', text: 'A deadline, a tricky paragraph, or just not knowing where to start. Let’s figure it out together.', id: 'consultation', href: '#contact' },
  { icon: Sprout, title: 'Find your writing confidence', subtitle: 'ACADEMIC WRITING COACHING', text: 'One-to-one developmental and ESL coaching to find your flow, build your skills, and keep growing.', id: 'coaching', href: '#contact' },
  { icon: GraduationCap, title: 'Tell your own story', subtitle: 'UNIVERSITY APPLICATION AID', text: 'Thoughtful UCAS and Common App support. An application that sounds like you, on your best day.', id: 'applications', href: '#contact' },
  { icon: PenLine, title: 'The finishing touches', subtitle: 'ACADEMIC PROOFREADING', text: 'Careful eyes on grammar, spelling and the little details. Your hard work, beautifully polished.', id: 'proofreading', href: '#quote' },
  { icon: FileCheck, title: 'References, minus the worry', subtitle: 'CITATION & REFERENCE CHECKS', text: 'Consistent citations and tidy reference lists. APA, Harvard, MLA — we’ll help you get the details right.', id: 'citations', href: '#quote' },
  { icon: BookOpen, title: 'Make the bigger picture click', subtitle: 'DEVELOPMENTAL EDITING', text: 'A fresh perspective on structure, arguments and flow. More clarity, without losing your voice.', id: 'developmental', href: '#contact' },
];
const navGroups = [
  { label: 'Proofreading', links: [['Academic proofreading', '#proofreading'], ['Developmental editing', '#developmental'], ['See an edit in action', '#editing']] },
  { label: 'Essay Coaching', links: [['Developmental & ESL coaching', '#coaching'], ['University applications', '#applications'], ['Free 15-minute consultation', '#contact']] },
  { label: 'Citations', links: [['Citation & reference checks', '#citations'], ['Get an estimate', '#quote']] },
];
function Botanical({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 150 190" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.2"><path d="M72 183C75 136 67 93 92 17M75 146L37 116M75 118L111 88M78 87L48 61M84 57L111 36" /><path d="M37 116C12 117 9 93 11 83C30 85 43 99 37 116ZM75 145C100 140 111 149 116 164C97 170 80 161 75 145ZM111 88C108 62 130 56 143 60C143 79 127 94 111 88ZM48 61C22 56 22 34 29 21C48 28 56 45 48 61ZM111 36C109 17 120 8 135 7C138 23 128 39 111 36" /></g></svg>;
}
function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState<number | null>(null);
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    if (window.location.hash) window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: 'instant' });
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => { setLoading(false); document.body.style.overflow = previous; window.scrollTo({ top: 0, behavior: 'instant' }); }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 200 : 1500);
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', escape);
    return () => { window.clearTimeout(timer); document.body.style.overflow = previous; window.removeEventListener('keydown', escape); };
  }, []);
  return <div className="studio-page">
    {loading && <div className="studio-loader" role="status" aria-label="Loading Your Studio"><div className="loader-composition"><div className="loader-book" aria-hidden="true"><span className="book-page page-left" /><span className="book-page page-right" /><Botanical className="loader-botanical" /><PenLine className="loader-pen" /></div><div className="loader-wordmark">Your Studio<span>.</span></div><p className="loader-caption">Good words are worth a little care.</p><div className="loader-line"><span /></div></div></div>}
    <div className="floating-header" inert={loading}><header className="site-header"><a href="#" className="wordmark"><Sprout strokeWidth={1.4} />Your Studio<span>.</span></a><nav className="desktop-nav" aria-label="Main navigation">{navGroups.map(group => <DropdownMenu key={group.label}><DropdownMenuTrigger asChild><Button variant="ghost" className="nav-trigger">{group.label}<ChevronDown size={13} /></Button></DropdownMenuTrigger><DropdownMenuContent sideOffset={18}>{group.links.map(([label, href]) => <DropdownMenuItem asChild key={label}><a href={href}>{label}</a></DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>)}<Button asChild variant="ghost" className="nav-trigger"><a href="#journal">Blog</a></Button></nav><div className="header-actions"><Button asChild className="quote-button"><a href="#quote">Upload / Quote <ArrowUpRight /></a></Button><Button variant="ghost" size="icon" className="mobile-menu" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div></header>{menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navGroups.map(group => <details key={group.label}><summary>{group.label}<ChevronDown size={14} /></summary>{group.links.map(([label, href]) => <a href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</a>)}</details>)}<a href="#journal" onClick={() => setMenuOpen(false)}>Blog</a></nav>}</div>
    <main inert={loading}>
      <section className="hero"><img src={student} alt="A student writing in a sunlit university library" className="hero-photo" width={1536} height={1024} fetchPriority="high" /><div className="hero-shade" /><div className="wrap hero-inner"><p className="eyebrow hero-eyebrow"><span /> YOUR IDEAS. YOUR VOICE. YOUR NEXT CHAPTER.</p><h1>Your Studio<span>.</span></h1><h2>Your words,<br /><em>a little clearer.</em></h2><p className="hero-copy">For the essays, applications and big ideas that matter. Thoughtful editing and coaching from real people in your corner.</p><div className="hero-buttons"><Button asChild size="lg" className="hero-primary"><a href="#quote">Find your quote <ArrowUpRight /></a></Button><Button asChild variant="outline" size="lg" className="hero-secondary"><a href="#contact">Let’s talk, for free <MessageCircle /></a></Button></div><a className="hero-footnote" href="#editing"><span className="scroll-circle"><ArrowDown size={16} /></span> A little care makes a big difference. See for yourself.</a></div><div className="photo-note"><Sprout size={24} strokeWidth={1.2} /><span>Not a new voice.<br /><em>Just a more confident you.</em></span></div></section>
      <div className="reassurance"><div className="wrap reassurance-inner"><span><Check /> Real humans, not auto-correct</span><span><Check /> Your voice stays yours</span><span><Check /> From first essay to final thesis</span></div></div>
      <EditingDemo />
      <section className="services-section wrap section" id="services"><div className="section-heading"><div><p className="eyebrow">WHEREVER YOU ARE IN YOUR JOURNEY</p><h2>A little support.<br /><em>A world of possibility.</em></h2></div><p>There’s no one-size-fits-all here.<br />Just the right help, at the right moment.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, subtitle, text, id, href }, i) => <article className="service-entry" key={id} id={id}><div className="service-top"><Icon size={28} strokeWidth={1.3} /><span>0{i + 1}</span></div><p className="service-subtitle">{subtitle}</p><h3>{title}</h3><p>{text}</p><Button asChild variant="link" className="service-link"><a href={href}>{i === 0 ? 'Let’s have a chat' : 'Find your support'}<ArrowUpRight /></a></Button></article>)}</div></section>
      <QuotePreview />
      <section className="about-band" id="about"><div className="wrap about-inner"><div className="about-image"><img src={team} alt="Two supportive editors discussing writing together" width={1536} height={1024} loading="lazy" /><span className="image-caption">Good people. Good words.</span></div><div className="about-copy"><p className="eyebrow">A STUDIO, NOT A CONTENT FACTORY</p><h2>People who love words.<br /><em>And get what it’s like.</em></h2><p>The blank-page feeling. The too-many-tabs feeling. The “is this even making sense?” feeling. We know them well.</p><p>We’re a small, supportive writing studio built around one simple belief: the best editing helps you sound more like yourself, not less.</p><div className="editor-values"><span><Check />Thoughtful, one-to-one feedback</span><span><Check />Support for multilingual writers</span><span><Check />No judgement. No jargon.</span></div><Button asChild variant="link" className="text-link"><a href="#contact">Meet your next pair of fresh eyes <ArrowUpRight /></a></Button></div></div></section>
      <section className="testimonials-band"><div className="wrap section"><div className="section-heading"><div><p className="eyebrow">A LITTLE LESS WORRY. A LOT MORE CONFIDENCE.</p><h2>On the other side<br /><em>of the deadline.</em></h2></div><p className="sample-label">Illustrative student stories<br />Names and testimonials are samples.</p></div><div className="testimonial-grid">{[
        ['I still sounded like me. Just a version of me who wasn’t writing at 2am with three cups of coffee.', 'Maya', 'Postgraduate · Proofreading', 'M'],
        ['For the first time, I understood why something wasn’t working — and how to fix it myself next time.', 'Jamie', 'Undergraduate · Writing coaching', 'J'],
        ['They helped me see that my own story was enough. My personal statement finally felt like mine.', 'Amelia', 'University applicant · Application aid', 'A'],
      ].map(([quote, name, service, initial]) => <article className="testimonial" key={name}><Quote size={25} strokeWidth={1.2} /><blockquote>“{quote}”</blockquote><div className="testimonial-person"><span className="avatar">{initial}</span><div><strong>{name}</strong><span>{service}</span></div></div></article>)}</div></div></section>
      <section className="wrap section journal" id="journal"><div className="section-heading"><div><p className="eyebrow">NOTES FROM THE STUDIO</p><h2>A few words for the way.</h2></div><span className="journal-aside">A little encouragement for your next chapter.</span></div><div className="blog-grid">{[
        { image: student, category: 'WRITING CONFIDENCE', title: 'Academic doesn’t have to mean complicated.', text: 'A clear argument starts with a clear thought. Try writing what you mean in everyday language first, then add the terms your subject needs.' },
        { image: notes, category: 'THE LITTLE DETAILS', title: 'References, without the overwhelm.', text: 'Keep a source list as you go. Record the author, year and page number when you take a note, then check your university’s style guide before submitting.' },
        { image: team, category: 'YOUR NEXT CHAPTER', title: 'Your story is worth telling.', text: 'Choose one experience that changed how you think. Specific details and honest reflection are more memorable than a list of accomplishments.' },
      ].map((entry, i) => <article className="blog-entry" key={entry.title}><img src={entry.image} alt={entry.title} width={1536} height={1024} loading="lazy" /><p className="blog-meta">{entry.category}<span>STUDIO NOTE 0{i + 1}</span></p><h3>{entry.title}</h3><Button variant="link" className="service-link" aria-expanded={story === i} onClick={() => setStory(story === i ? null : i)}>{story === i ? 'Close the note' : 'Read the note'}<ArrowUpRight /></Button>{story === i && <p className="journal-note">{entry.text}</p>}</article>)}</div></section>
      <EnquiryForm />
      <section className="wrap policy-section" id="faq"><div><p className="eyebrow">A FEW GOOD QUESTIONS</p><h2>Before you begin.</h2></div><div className="faq-list"><details><summary>Will my writing still sound like me?</summary><p>Absolutely. Edits focus on clarity and consistency, while keeping your ideas and individual voice at the heart.</p></details><details><summary>Can I get help if English isn’t my first language?</summary><p>Yes. Developmental and ESL coaching offers supportive feedback on expression, structure and writing confidence.</p></details><details id="integrity"><summary>What’s your academic integrity policy?</summary><p>Your ideas and arguments must remain your own. We don’t write assignments for you or invent sources. Always check your university’s rules on editing support before booking.</p></details><details id="careers"><summary>Can I join the studio?</summary><p>Interested in supporting student writers? Introduce yourself through the enquiry preview. Careers enquiries are not sent from this mockup.</p></details></div></section>
    </main>
    <footer className="site-footer"><div className="wrap footer-main"><div className="footer-brand"><a href="#" className="wordmark">Your Studio.</a><p>Your words.<br /><em>A world of possibility.</em></p></div><div className="footer-links"><h4>COME ON IN</h4><a href="#services">Our services</a><a href="#about">About the editors</a><a href="#journal">Studio journal</a><a href="#contact">Say hello</a></div><div className="footer-links"><h4>GOOD TO KNOW</h4><a href="#faq">FAQ</a><a href="#integrity">Academic Integrity Policy</a><a href="#careers">Careers</a><a href="#quote">Your quote</a></div><div className="footer-signoff"><Botanical /><span>A little care.<br />A brighter next chapter.</span></div></div><div className="wrap footer-bottom"><span>© 2026 Your Studio.</span><span>Independent in spirit. Thoughtful by nature.</span><span>Frontend design preview · UK</span></div></footer>
  </div>;
}
