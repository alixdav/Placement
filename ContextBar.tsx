import type { UserProfile } from '@/lib/types';

// The context bar sits below the nav and shows the user exactly what is
// driving their results: city, workplace, move date, budget. The spec calls
// for one tap to edit any of them. The edit handlers are stubbed for now and
// become real once the preferences screen exists.

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function Pill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <button
      type="button"
      className="group flex items-center gap-2 rounded-full border border-cream-border bg-white px-3.5 py-1.5 text-left transition hover:border-ink-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <span className="text-[11px] uppercase tracking-label text-ink-light">
        {label}
      </span>
      <span className={`text-sm font-medium ${accent}`}>{value}</span>
      <span className="text-ink-light opacity-0 transition group-hover:opacity-100">
        edit
      </span>
    </button>
  );
}

export function ContextBar({ profile }: { profile: UserProfile }) {
  const accent = profile.user_type === 'graduate' ? 'text-grad' : 'text-green';
  const budget = `£${profile.budget_min} to £${profile.budget_max}`;

  return (
    <div className="border-b border-cream-border bg-cream">
      <div className="mx-auto flex max-w-shell flex-wrap items-center gap-2.5 px-6 py-3">
        <span className="mr-1 text-[11px] uppercase tracking-label text-cream-body">
          Showing
        </span>
        <Pill label="City" value={profile.next_city} accent={accent} />
        <Pill label="Near" value={profile.workplace_name} accent={accent} />
        <Pill label="From" value={formatDate(profile.move_date)} accent={accent} />
        <Pill label="Budget" value={budget} accent={accent} />
      </div>
    </div>
  );
}
