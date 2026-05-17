'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { ArrowRight } from '@/components/svg/ArrowRight';
import { arrowNudge } from '@/lib/motion';

type FormState = {
  name: string;
  company: string;
  email: string;
  context: string;
  budget: string;
  /** Honeypot — must remain empty. Real users never see this field. */
  hp: string;
};

type FieldErrors = Partial<Record<keyof FormState | 'form', string>>;

const INITIAL_STATE: FormState = {
  name: '',
  company: '',
  email: '',
  context: '',
  budget: '',
  hp: '',
};

const BUDGET_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'pick one' },
  { value: 'scaling-fast', label: "we're scaling fast" },
  { value: 'tight-runway', label: 'tight runway' },
  { value: 'exploring', label: 'exploring' },
  { value: 'ready-to-hire', label: 'ready to hire' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm(): JSX.Element {
  const router = useRouter();
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]): void {
    setState((s) => ({ ...s, [key]: value }));
    if (errors[key]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  }

  function validate(s: FormState): FieldErrors {
    const next: FieldErrors = {};
    if (!s.name.trim()) next.name = "name's required.";
    if (!s.email.trim()) next.email = "email's required.";
    else if (!EMAIL_RE.test(s.email.trim())) {
      next.email = "that doesn't look like an email.";
    }
    if (s.context.trim().length < 10) {
      next.context = 'tell us more — at least a sentence.';
    }
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    // Honeypot — silently no-op if a bot filled it.
    if (state.hp.trim().length > 0) return;

    const found = validate(state);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setPending(true);
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });

      if (!res.ok) {
        setErrors({ form: "something didn't take. try again, or email us directly." });
        setPending(false);
        return;
      }

      router.push('/get-in-touch/thanks');
    } catch {
      setErrors({ form: "something didn't take. try again, or email us directly." });
      setPending(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-8">
      <h2 className="sr-only">Send us a note</h2>

      {/* Honeypot — visually hidden, autocomplete off, tab-skipped */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          do not fill
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={state.hp}
            onChange={(e) => update('hp', e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          id="name"
          label="your name"
          error={errors.name}
        >
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Priya — Head of Growth"
            value={state.name}
            onChange={(e) => update('name', e.target.value)}
            className={inputClasses(!!errors.name)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-err' : undefined}
          />
        </Field>

        <Field id="company" label="company" error={errors.company}>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="series-A consumer brand"
            value={state.company}
            onChange={(e) => update('company', e.target.value)}
            className={inputClasses(false)}
          />
        </Field>
      </div>

      <Field id="email" label="email" error={errors.email}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@yourbrand.com"
          value={state.email}
          onChange={(e) => update('email', e.target.value)}
          className={inputClasses(!!errors.email)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-err' : undefined}
        />
      </Field>

      <Field
        id="context"
        label="where you're at right now"
        error={errors.context}
      >
        <textarea
          id="context"
          rows={5}
          placeholder="monthly ad spend, what's working, what's broken, what your in-house plan looks like."
          value={state.context}
          onChange={(e) => update('context', e.target.value)}
          className={cn(inputClasses(!!errors.context), 'resize-y min-h-[140px]')}
          aria-invalid={!!errors.context}
          aria-describedby={errors.context ? 'context-err' : undefined}
        />
      </Field>

      <Field id="budget" label="budget posture" error={errors.budget}>
        <div className="relative">
          <select
            id="budget"
            value={state.budget}
            onChange={(e) => update('budget', e.target.value)}
            className={cn(inputClasses(false), 'appearance-none pr-12')}
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-bg text-fg">
                {opt.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          >
            ↓
          </span>
        </div>
      </Field>

      {errors.form ? (
        <p role="alert" className="font-body text-sm text-error">
          {errors.form}
        </p>
      ) : null}

      <div className="pt-2">
        <motion.button
          type="submit"
          disabled={pending}
          initial="rest"
          whileHover="hover"
          animate="rest"
          className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-body text-base font-medium text-bg transition-colors duration-200 ease-out-expo hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{pending ? 'sending...' : 'Send. We reply Monday.'}</span>
          <motion.span variants={arrowNudge} className="inline-flex" aria-hidden="true">
            <ArrowRight size={18} />
          </motion.span>
        </motion.button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      {children}
      {error ? (
        <span
          id={`${id}-err`}
          className="mt-2 block font-body text-sm text-error"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

function inputClasses(hasError: boolean): string {
  return cn(
    'block w-full rounded-sm border bg-transparent px-4 py-3 font-body text-base text-fg placeholder:text-muted/70 transition-colors duration-200 ease-out-expo focus:outline-none',
    hasError
      ? 'border-error focus:border-error'
      : 'border-border focus:border-accent',
  );
}
