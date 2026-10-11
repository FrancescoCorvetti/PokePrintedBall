import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/claim/*'],
    },
    sitemap: 'https://poke3d.it/sitemap.xml',
  };
}
