import type { Metadata } from 'next';
import { Mulish, PT_Sans } from 'next/font/google';
import '../styles/main.scss';

const mulish = Mulish({
  variable: '--font-mulish',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const ptSans = PT_Sans({
  variable: '--font-pt-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'NAKORT - Теннисный клуб | Профессиональные корты, тренировки и турниры',
  description: 'NAKORT — теннисный клуб с профессиональными кортами, тренировками и турнирами. Запишитесь на тренировку по теннису или паделу.',
  keywords: ['теннис', 'падел', 'корты', 'тренировки', 'турниры', 'спорт', 'теннисный клуб', 'NAKORT'],
  authors: [{ name: 'NAKORT' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: 'https://nakort.ru/',
    title: 'NAKORT - Теннисный клуб | Профессиональные корты',
    description: 'NAKORT — комьюнити людей, увлеченных большим теннисом и яркой жизнью. Профессиональные корты, тренировки и турниры.',
    images: [
      {
        url: 'https://nakort.ru/img/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'NAKORT - Теннисный клуб',
      },
    ],
    locale: 'ru_RU',
    siteName: 'NAKORT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NAKORT - Теннисный клуб',
    description: 'NAKORT — комьюнити людей, увлеченных большим теннисом и яркой жизнью.',
    images: ['https://nakort.ru/img/og-image.webp'],
  },
  alternates: {
    canonical: 'https://nakort.ru/',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'NAKORT',
    description: 'Теннисный клуб с профессиональными кортами, тренировками и турнирами',
    url: 'https://nakort.ru',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU',
    },
    sport: ['Tennis', 'Padel'],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
    },
  };

  return (
    <html lang="ru" className={`${mulish.variable} ${ptSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}

