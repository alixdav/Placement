import { redirect } from 'next/navigation';

// For now the home route sends you straight to the listings screen, which is
// the core of the product. Later this becomes the signed out marketing entry
// or a router based on auth state.
export default function Home() {
  redirect('/listings');
}
