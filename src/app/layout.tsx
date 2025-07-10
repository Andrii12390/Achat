import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from '@/providers';
import { ThemeProvider } from 'next-themes';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'AChat',
    template: '%s | AChat',
  },
  description: 'AChat — chat app with modern design and cool features. Chat with friends!',
  keywords: ['chat', 'realtime', 'AChat', 'communication'],
  openGraph: {
    title: 'AChat',
    description: 'AChat — chat with modern design and cool features. Chat with friends!',
    url: 'https://a-chat.xyz',
    siteName: 'AChat',
    images: [
      {
        url: 'https://a-chat.xyz/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AChat Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AChat',
    description: 'AChat — chat with modern design and cool features. Chat with friends!',
    images: ['https://a-chat.xyz/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${interSans.variable} antialiased`}>
        <ThemeProvider defaultTheme="system">
          <SessionProvider>{children}</SessionProvider>
          <ToastContainer position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
