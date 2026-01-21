import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Activities from '@/components/Activities';
import About from '@/components/About';
import HighlightStrip from '@/components/HighlightStrip';
import Features from '@/components/Features';
import Application from '@/components/Application';
import Reviews from '@/components/Reviews';
import Pricing from '@/components/Pricing';
import Certificates from '@/components/Certificates';
import Promo from '@/components/Promo';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ModalTraining from '@/components/ModalTraining';
import ModalCertificate from '@/components/ModalCertificate';
import DesktopOnly from '@/components/DesktopOnly';

export default function Home() {
  return (
    <>
      <Header />
      <main className="main">
        <Hero />
        <Activities />
        <About />
        <HighlightStrip />
        <Features />
        <Application />
        <Reviews />
        <Pricing />
        <Certificates />
        <Promo />
        <FAQ />
      </main>
      <Footer />
      <ModalTraining />
      <ModalCertificate />
      <DesktopOnly />
    </>
  );
}




