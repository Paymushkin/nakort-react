import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Мероприятия | NAKORT — Теннисный клуб',
  description: 'Мероприятия и турниры в NAKORT.',
};

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className="main">
        <section className="container" style={{ paddingTop: 120, paddingBottom: 120, textAlign: 'center' }}>
          <h1 style={{ marginBottom: 24 }}>Мероприятия</h1>
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
