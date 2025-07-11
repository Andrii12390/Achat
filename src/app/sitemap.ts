import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: BASE_URL,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/register`,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];
}

export default sitemap;
