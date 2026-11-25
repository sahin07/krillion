import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MedicalDiveGame from '@/components/medical/MedicalDiveGame';
import MedicalSeoArticle, { MEDICAL_FAQ_ITEMS } from '@/components/medical/MedicalSeoArticle';
import { getMedicalPack, toMedicalPublicPack } from '@/lib/dive/medical';
import { SITE_CONFIG } from '@/lib/site-data';

const PAGE_PATH = '/medical-krillion';
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Medical Krillion – Play the Medical Trivia Game Online',
  description:
    'Play Medical Krillion, a medical-themed rare-answer challenge. Test your knowledge of anatomy, biology, diseases and medical terminology across seven exciting rounds.',
  keywords: [
    'Medical Krillion',
    'Medical Krillion game',
    'medical trivia game',
    'anatomy quiz',
    'medical knowledge game',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    title: 'Medical Krillion – Play the Medical Trivia Game Online',
    description:
      'Play Medical Krillion, a medical-themed rare-answer challenge across anatomy, biology, and clinical terminology.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Krillion – Play the Medical Trivia Game Online',
    description: 'Think beyond the textbook. Discover rare medical answers on KrillionPro.',
  },
};

export default function MedicalKrillionPage() {
  const initialPack = toMedicalPublicPack(getMedicalPack());
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: MEDICAL_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <MedicalDiveGame initialPack={initialPack} />
        <MedicalSeoArticle />
      </main>
      <Footer />
    </div>
  );
}
