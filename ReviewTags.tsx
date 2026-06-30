import type { Review, UserType } from '@/lib/types';

// Reviews are tagged by who they are relevant to. A doctor sees doctor tags
// first, a graduate sees graduate tags first, shared tags show to both.
// This component flattens the tags from a listing's reviews and orders them
// for the current user.

export function ReviewTags({
  reviews,
  userType,
}: {
  reviews: Review[];
  userType: UserType;
}) {
  const seen = new Set<string>();
  const tags = reviews
    .flatMap((r) => r.tags)
    .filter((tag) => {
      if (seen.has(tag.label)) return false;
      seen.add(tag.label);
      return true;
    });

  if (tags.length === 0) return null;

  // Sort: the user's own audience first, then shared, then the other audience.
  const weight = (audience: string): number => {
    if (audience === userType) return 0;
    if (audience === 'shared') return 1;
    return 2;
  };
  tags.sort((a, b) => weight(a.audience) - weight(b.audience));

  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const mine = tag.audience === userType;
        const accent =
          userType === 'graduate'
            ? 'bg-grad/10 text-grad'
            : 'bg-green/10 text-green-dark';
        const neutral = 'bg-ink/5 text-ink-mid';
        return (
          <li
            key={tag.label}
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              mine ? accent : neutral
            }`}
          >
            {tag.label}
          </li>
        );
      })}
    </ul>
  );
}
