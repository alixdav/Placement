import Image from 'next/image';
import type { RankedListing, UserProfile } from '@/lib/types';
import { formatMiles } from '@/lib/distance';
import { ReviewTags } from './ReviewTags';
import { HandoverPanel } from './HandoverPanel';

const ROOM_LABEL: Record<string, string> = {
  single: 'Single room',
  double: 'Double room',
  whole_flat: 'Whole flat',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function ListingCard({
  listing,
  profile,
  rank,
}: {
  listing: RankedListing;
  profile: UserProfile;
  rank: number;
}) {
  const accent = profile.user_type === 'graduate' ? 'text-grad' : 'text-green';
  const accentBg = profile.user_type === 'graduate' ? 'bg-grad' : 'bg-green';

  return (
    <article className="group overflow-hidden rounded-xl border border-cream-border bg-white transition hover:shadow-[0_8px_30px_rgba(4,52,44,0.08)]">
      <div className="relative aspect-[4/3] w-full bg-cream">
        <Image
          src={listing.photo_url}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        {/* Distance to the user's workplace is the hero. It sits on the photo,
            because it is the single most important fact on the card. */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
          <span className={`text-sm font-semibold ${accent}`}>
            {formatMiles(listing.distance_miles)}
          </span>
          <span className="text-xs text-ink-mid">
            to {profile.workplace_name}
          </span>
        </div>
        {listing.handover?.available && (
          <div
            className={`absolute right-3 top-3 rounded-full ${accentBg} px-2.5 py-1 text-[11px] font-medium uppercase tracking-label text-white`}
          >
            Handover
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl leading-snug text-green-dark">
            {listing.address}
          </h3>
          <span className="shrink-0 text-sm text-ink-mid">#{rank}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-mid">
          <span className="font-semibold text-ink">
            £{listing.price_pcm}
            <span className="font-normal text-ink-mid"> / month</span>
          </span>
          <span aria-hidden>&middot;</span>
          <span>{ROOM_LABEL[listing.room_type]}</span>
          <span aria-hidden>&middot;</span>
          <span>Available {formatDate(listing.available_from)}</span>
        </div>

        <p className="text-sm leading-relaxed text-ink-mid">
          {listing.description}
        </p>

        <ReviewTags reviews={listing.reviews} userType={profile.user_type} />

        {listing.handover?.available && (
          <HandoverPanel
            handover={listing.handover}
            userType={profile.user_type}
          />
        )}
      </div>
    </article>
  );
}
