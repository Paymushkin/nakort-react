import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Сотрудничество | NAKORT — Теннисный клуб',
  description: 'Корпоративный теннис и сотрудничество с NAKORT.',
};

export default function CorporatePage() {
  return (
    <>
      <Header />
      <main className="main">
        <section className="container" style={{ paddingTop: 120, paddingBottom: 120, textAlign: 'center' }}>
          <h1 style={{ marginBottom: 24 }}>Сотрудничество</h1>
          <p style={{ marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            Страница в разработке.
          </p>
          <Link href="/" style={{ color: 'var(--color-primary, #ebff00)' }}>
            ← На главную
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
