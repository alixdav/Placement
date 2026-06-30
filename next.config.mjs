/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // picsum.photos serves the obviously-placeholder seed images.
    // Add your real image host (for example a Supabase Storage domain) here
    // when you start uploading real listing photos.
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
    ],
  },
};

export default nextConfig;
