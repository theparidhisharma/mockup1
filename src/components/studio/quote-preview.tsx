import { useRef, useState } from 'react';
import { ArrowUpRight, Check, FileText, LockKeyhole, UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { availableExpressSlots, calculatePreviewQuote, turnaroundOptions, validatePreviewFile, type QuoteInput } from '@/lib/studio-preview';
export function QuotePreview() {
  const [type, setType] = useState<QuoteInput['type']>('essay');
  const [words, setWords] = useState('3000');
  const [hours, setHours] = useState<QuoteInput['hours']>(72);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const price = calculatePreviewQuote({ type, words: Number(words), hours });
  const slots = availableExpressSlots(2);
  const selectFile = (selected?: File) => {
    if (!selected) return;
    const message = validatePreviewFile(selected);
    setError(message ?? '');
    if (!message) { setFile(selected); setReady(false); }
  };
  return <section className="quote-band" id="quote"><div className="wrap quote-layout">
    <div className="quote-intro"><p className="eyebrow">LESS GUESSWORK. MORE PEACE OF MIND.</p><h2>Your next chapter,<br /><em>with a clear quote.</em></h2><p>An essay, a dissertation, or a statement that means everything. Let’s find the right support for your words.</p><div className="availability"><span className="status-dot" /><strong>Editors available</strong><span>Illustrative availability</span></div><div className="capacity"><span>24-hour turnaround</span><div className="capacity-slots">{[0, 1, 2].map(i => <span key={i} className={i < 2 ? 'booked' : ''} />)}</div><strong>{slots} of 3 slots open</strong></div><p className="small-print">We keep express work to three bookings at a time, so every document gets the attention it deserves.</p><div className="quote-reassurance"><LockKeyhole size={19} /><span>Your work stays yours.<br /><strong>Private. Personal. Carefully handled.</strong></span></div></div>
    <div className="quote-tool"><div className="quote-tool-title"><h3>A little clarity, instantly.</h3><span>QUOTE PREVIEW</span></div><div className="quote-fields"><label>Document type<Select value={type} onValueChange={value => { if (value === 'essay' || value === 'dissertation' || value === 'application') { setType(value); setReady(false); } }}><SelectTrigger aria-label="Document type"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="essay">Essay / coursework</SelectItem><SelectItem value="dissertation">Dissertation / thesis</SelectItem><SelectItem value="application">Personal statement</SelectItem></SelectContent></Select></label><label>Word count<Input aria-label="Word count" type="number" min={1} max={100000} step={1} value={words} onChange={event => { setWords(event.target.value); setReady(false); }} /></label></div>
      <Input type="range" aria-label="Adjust word count" className="word-slider" min={100} max={20000} step={100} value={Math.min(20000, Math.max(100, Number(words) || 100))} onChange={event => { setWords(event.target.value); setReady(false); }} />
      <fieldset><legend>When do you need it?</legend><div className="turnaround">{turnaroundOptions.map(speed => <Button key={speed} variant={hours === speed ? 'default' : 'outline'} aria-pressed={hours === speed} onClick={() => { setHours(speed); setReady(false); }}>{speed}h <span>{speed === 24 ? 'Express' : speed === 48 ? 'A little sooner' : 'Room to breathe'}</span></Button>)}</div></fieldset>
      <div className="quote-total" aria-live="polite"><div><span>Your estimated total</span><strong>{price === null ? '—' : `£${price.toFixed(2)}`}</strong></div><span>Academic proofreading<br />Illustrative pricing only</span></div>{price === null && <p className="field-error">Enter a whole word count between 1 and 100,000.</p>}
      <div className={`upload-zone ${dragging ? 'dragging' : ''}`} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); selectFile(event.dataTransfer.files[0]); }}><input ref={input} type="file" className="sr-only" tabIndex={-1} accept=".pdf,.doc,.docx,.txt" onChange={event => selectFile(event.target.files?.[0])} />{file ? <div className="selected-file"><FileText /><div><strong>{file.name}</strong><span>{(file.size / 1024).toFixed(1)} KB · Selected on your device</span></div><Button aria-label="Remove document" title="Remove document" variant="ghost" size="icon" onClick={() => { setFile(null); setReady(false); if (input.current) input.current.value = ''; }}><X /></Button></div> : <><UploadCloud size={28} /><Button variant="link" onClick={() => input.current?.click()}>Choose a document <span>or drop it here</span></Button><p>Word, PDF or TXT · up to 20 MB</p></>}</div>
      {error && <p className="field-error" role="alert">{error}</p>}<p className="upload-privacy"><LockKeyhole size={12} />Local preview only — nothing is uploaded or stored.</p><Button className="quote-submit" disabled={price === null} onClick={() => setReady(true)}>{ready ? <><Check />Preview ready</> : <>Preview my quote <ArrowUpRight /></>}</Button>{ready && <p className="preview-confirmation" role="status">Your {hours}-hour estimate is £{price?.toFixed(2)}. No booking or payment has been made.</p>}<p className="small-print">Live uploads and encryption will need to be connected before documents can be sent.</p>
    </div>
  </div></section>;
}
