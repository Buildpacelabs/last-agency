import { CAL_LINK, WA_FINAL } from '@/lib/site';

type Props = {
  eyebrow?: string;
  title?: React.ReactNode;
  body?: string;
  micro?: string;
};

export function FinalCta({
  eyebrow = "Last slot's open",
  title = (
    <>
      Make this the <span className="u">last</span> growth call you book.
    </>
  ),
  body = "Grab the free strategy call and walk away with a 90-day growth plan — hired or not. Or just text us. Either way, you'll know exactly how we'd win.",
  micro = "Guaranteed or it's free · No lock-in · Free strategy call",
}: Props): JSX.Element {
  return (
    <section className="band-red pad" id="book" aria-labelledby="book-h">
      <div className="wrap">
        <p className="eyebrow eyebrow-ink">{eyebrow}</p>
        <h2 className="sec-h" id="book-h">
          {title}
        </h2>
        <p className="lede">{body}</p>
        <div className="cta-row">
          <a className="btn btn-lg btn-cream" href={CAL_LINK} target="_blank" rel="noopener noreferrer">
            📅 Book on Cal.com
          </a>
          <a className="btn btn-lg btn-wa" href={WA_FINAL} target="_blank" rel="noopener noreferrer">
            💬 WhatsApp us now
          </a>
        </div>
        <p className="micro">{micro}</p>
      </div>
    </section>
  );
}
