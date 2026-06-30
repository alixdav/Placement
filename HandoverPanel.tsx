import type { Handover, UserType } from '@/lib/types';

// The handover panel is where Placement shows its defining feature: a real
// person rotating out, passing the room directly to the person rotating in,
// with a personal recommendation. This is what no other listings site has.

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

export function HandoverPanel({
  handover,
  userType,
}: {
  handover: Handover;
  userType: UserType;
}) {
  const accentBorder =
    userType === 'graduate' ? 'border-grad/30' : 'border-green/30';
  const accentText = userType === 'graduate' ? 'text-grad' : 'text-green-dark';

  return (
    <div className={`rounded-lg border ${accentBorder} bg-green-mint/15 p-4`}>
      <div className="mb-2 flex items-center gap-2">
        <span
          className={`text-[11px] uppercase tracking-label ${accentText}`}
        >
          Handover available
        </span>
        <span className="text-xs text-ink-mid">
          from {formatDate(handover.available_from)}
        </span>
      </div>
      <p className="mb-2 text-sm text-ink">
        <span className="font-semibold">{handover.outgoing_tenant_name}</span>{' '}
        <span className="text-ink-mid">({handover.rotation_detail})</span> is
        rotating out and can pass this room to you directly.
      </p>
      <blockquote className="border-l-2 border-cream-border pl-3 text-sm italic text-ink-mid">
        {handover.recommendation}
      </blockquote>
    </div>
  );
}
