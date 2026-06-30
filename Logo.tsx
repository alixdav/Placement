import type { UserType } from '@/lib/types';

// The Placement lockup. Two rules from the brand bible that never change:
// the circle is always on the left, the wordmark always on the right, with
// consistent spacing. Doctor colourway is green, graduate colourway is purple.

export function Logo({
  userType = 'doctor',
  onDark = false,
}: {
  userType?: UserType;
  onDark?: boolean;
}) {
  const circle = userType === 'graduate' ? 'bg-grad' : 'bg-green';
  const wordmark = onDark ? 'text-white' : 'text-green-dark';

  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <span
        aria-hidden
        className={`relative inline-block h-6 w-6 rounded-full ${circle}`}
      >
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-dark" />
      </span>
      <span
        className={`font-body text-xl font-light tracking-tight ${wordmark}`}
      >
        placement
      </span>
    </span>
  );
}
