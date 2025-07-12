import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/verification', '/users', '/chats/', '/profile/', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

export default robots;
