import type { Metadata } from 'next';
import { ReactNode } from 'react';

// Fonts

// Favicon
import Favicon from '@/public/assets/favicon/favicon.ico';

// Vercel Analytics
import { Analytics } from '@vercel/analytics/react';

// Next Intl
import { NextIntlClientProvider } from 'next-intl';

// ShadCn
import { Toaster } from '@/components/ui/toaster';

// Components
import PageLoader from '@/app/components/reusables/PageLoader/PageLoader';
import Spinner from '@/app/components/reusables/Spinner/Spinner';

// Contexts
import { AuthProvider } from '@/contexts/AuthContext';
import Providers from '@/contexts/Providers';

// SEO
import { ROOTKEYWORDS } from '@/lib/seo';

// Variables
import { BASE_URL, GOOGLE_SC_VERIFICATION, LOCALES } from '@/lib/variables';

export const metadata: Metadata = {
  title: 'Invoify | Free Invoice Generator',
  description:
    'Create invoices effortlessly with Invoify, the free invoice generator. Try it now!',
  icons: [{ rel: 'icon', url: Favicon.src }],
  keywords: ROOTKEYWORDS,
  viewport: 'width=device-width, initial-scale=1',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
  authors: {
    name: 'Ali Abbasov',
    url: 'https://aliabb.vercel.app',
  },
  verification: {
    google: GOOGLE_SC_VERIFICATION,
  },
};

export function generateStaticParams() {
  const locales = LOCALES.map((locale) => locale.code);
  return locales;
}

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  let messages;
  try {
    messages = (await import(`@/i18n/locales/${locale}.json`)).default;
  } catch (error) {
    // notFound();
  }

  return (
    <>
      {/* <html lang={locale}> */}
      {/* <head>
          <script
            type="application/ld+json"
            id="json-ld"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
          />
        </head> */}
      {/* <body> */}
      <Spinner />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Providers>
          <AuthProvider>
            <PageLoader>
              <main className="bg-white">
                {/* <BaseNavbar /> */}
                <div className="flex flex-col">{children}</div>
                {/* <BaseFooter /> */}
              </main>
              {/* Toast component */}
              <Toaster />
              {/* Vercel analytics */}
              <Analytics />
            </PageLoader>
          </AuthProvider>
        </Providers>
      </NextIntlClientProvider>
      {/* </body> */}
      {/* </html> */}
    </>
  );
}
