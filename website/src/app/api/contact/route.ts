import { NextResponse } from 'next/server';

/**
 * Stub contact handler. Accepts a JSON POST from the /get-in-touch form,
 * logs it to the server console, and returns { ok: true } so the form can
 * redirect to /get-in-touch/thanks.
 *
 * MANUAL-WORK: replace this with a real handler before launch. Options:
 *   - Resend (transactional email to hello@lastagency.com)
 *   - Loops or Customer.io (if you want to drop them into a CRM sequence)
 *   - A Slack incoming webhook for instant founder notification
 *   - Some combination of the above
 *
 * Whatever you pick: keep the response contract `{ ok: boolean }` so the
 * client form keeps working without changes.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    // Honeypot: ignore silently. Returning ok: true keeps spam bots quiet.
    if (typeof body.hp === 'string' && body.hp.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // Minimal server-side guard so the route doesn't 200 on totally empty
    // payloads. The client validates more strictly.
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const context = typeof body.context === 'string' ? body.context.trim() : '';

    if (!name || !email || context.length < 10) {
      return NextResponse.json(
        { ok: false, error: 'missing required fields' },
        { status: 400 },
      );
    }

    // eslint-disable-next-line no-console
    console.info('[contact-stub] received note', {
      name,
      email,
      company: body.company,
      budget: body.budget,
      contextLength: context.length,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'bad payload' }, { status: 400 });
  }
}
