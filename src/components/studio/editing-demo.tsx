import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, FileText, PenLine, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const comments = [
  { title: 'A little more precise', text: '“Demonstrates” makes your argument stronger without changing what you mean.', label: 'Sharper language' },
  { title: 'Give your ideas room to flow', text: 'This transition connects your evidence to your argument. A small change, a clearer journey.', label: 'Better flow' },
  { title: 'Let’s credit the source', text: 'Add the year and page number here. Always check them against your original source.', label: 'Consistent citations' },
  { title: 'Your voice, still yours', text: 'The thinking is all yours. We’ve simply helped it come through with more clarity and confidence.', label: 'Thoughtful feedback' },
];
export function EditingDemo() {
  const section = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [clean, setClean] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const node = section.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const sticky = node.querySelector<HTMLElement>('.editing-sticky');
        const stickyTop = window.innerWidth <= 600 ? 90 : 113;
        const travel = Math.max(1, rect.height - (sticky?.offsetHeight ?? 650) - 86);
        const progress = (stickyTop - rect.top) / travel;
        setStep(Math.max(0, Math.min(3, Math.floor(progress * 4))));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  const edit = (at: number, before: string, after: string) => <span className={`tracked-edit ${step >= at ? 'edited' : ''} ${step === at ? 'current-edit' : ''}`}>
    {step >= at ? <>{!clean && <del>{before}</del>}<ins>{after}</ins></> : before}
  </span>;
  return <section className="editing-section" id="editing" ref={section}>
    <div className="editing-sticky wrap">
      <div className="section-heading"><div><p className="eyebrow">A LITTLE POLISH. A BIG DIFFERENCE.</p><h2>Good thinking.<br /><em>Even clearer on paper.</em></h2></div><p>Not a different voice. A more confident you.<br />See the care behind every change.</p></div>
      <div className="editing-workspace">
        <div className="document-sheet">
          <div className="document-toolbar"><span><FileText size={15} /> your-essay.docx</span><Button size="sm" variant={clean ? 'secondary' : 'ghost'} onClick={() => setClean(!clean)}><Check size={14} />{clean ? 'Final version' : 'Tracked changes'}</Button></div>
          <div className="document-content"><p className="document-subtitle">SOCIOLOGY · SAMPLE EXTRACT</p><h3>The spaces where we belong</h3><p>Public libraries {edit(0, 'show us that', 'demonstrate how')} shared spaces can foster a sense of belonging. They offer more than access to books: they create opportunities for connection.</p><p>{edit(1, 'Also,', 'Building on this,')} community-led programmes can strengthen these relationships, particularly for people who may feel isolated {edit(2, '(Smith)', '(Smith, 2023, p. 42)')}.</p><p className={step === 3 ? 'feedback-highlight' : ''}>The value of a library therefore lies not only in its collection, but in the community it helps to nurture.</p><div className="document-bottom"><span>YOUR IDEAS. ALWAYS.</span><span>01</span></div></div>
        </div>
        <aside className="editor-margin"><div className="editor-identity"><span className="editor-avatar"><PenLine size={20} /></span><div><strong>Your academic editor</strong><span>A fresh pair of eyes</span></div><span className="status-dot" /></div>
          <div className="margin-notes">{comments.map((comment, i) => <Button variant="ghost" key={comment.title} className={`margin-comment ${step === i ? 'active' : ''} ${step > i ? 'complete' : ''}`} onClick={() => setStep(i)} aria-pressed={step === i}><span className="comment-number">{step > i ? <Check size={13} /> : `0${i + 1}`}</span><span><strong>{comment.title}</strong><span>{comment.text}</span></span></Button>)}</div>
          <div className="editing-progress" aria-live="polite"><span>0{step + 1} / 04</span><span>{comments[step]?.label}</span><ArrowRight size={16} /></div>
          <Button variant="link" size="sm" className="replay-edit" onClick={() => { setClean(false); setStep(0); }}><RotateCcw size={13} />Start again</Button>
        </aside>
      </div>
    </div>
  </section>;
}
