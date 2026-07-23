import type { Tier } from '@/lib/site';

export function TierCard({ t, cta }: { t: Tier; cta: string }): JSX.Element {
  return (
    <div className={`tier${t.featured ? ' pop' : ''}`}>
      <span className={`badge${t.badgeClass ? ` ${t.badgeClass}` : ''}`}>{t.badge}</span>
      <h3>{t.name}</h3>
      <p className="tagline">{t.tagline}</p>
      <div className="price">
        <span className="amt num">{t.price}</span>
        <span className="per">/ month</span>
      </div>
      {t.bracket ? <div className="bracket">{t.bracket}</div> : null}
      <div className="lbl">What you get</div>
      <ul className="get">
        {t.get.map((g, i) => (
          <li key={i}>{g}</li>
        ))}
      </ul>
      <div className="lbl">How we do it</div>
      <ul className="how">
        {t.how.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
      <div className="tier-cta">
        <a className="btn btn-red" href="#book">
          {cta}
        </a>
      </div>
    </div>
  );
}
