import React from 'react';
import Hero from '../components/Hero';
import AcademyPulse from '../components/AcademyPulse';
import Resonance from '../components/Resonance';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import DigitalManifesto from '../components/DigitalManifesto';
import GlobalCareer from '../components/GlobalCareer';
import Stats from '../components/Stats';
import ForWhom from '../components/ForWhom';
import Testimonials from '../components/Testimonials';
import Program from '../components/Program';
import Scarcity from '../components/Scarcity';
import Guarantee from '../components/Guarantee';
import CallToAction from '../components/CallToAction';
import Warning from '../components/Warning';
import PublicLayout from '../components/PublicLayout';
import SEO from '../components/SEO';

const Landing: React.FC = () => {
  // Rich Snippet for Course
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Профессия Онлайн Гипнотерапевт",
    "description": "Фундаментальная программа обучения онлайн гипнотерапии и коучингу. Помогайте людям дистанционно и создайте глобальный бизнес.",
    "provider": {
      "@type": "Organization",
      "name": "Eurasian Academy of Hypnosis",
      "sameAs": "https://gipnozio.ru"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "P6M"
    },
    "offers": {
      "@type": "Offer",
      "category": "Paid",
      "priceCurrency": "RUB",
      "price": "120000",
      "availability": "https://schema.org/InStock"
    }
  };

  const breadcrumbItems = [
    { label: 'Главная', path: '/' }
  ];

  return (
    <PublicLayout>
      <SEO 
        title="Eurasian Academy of Hypnosis - Обучение ОНЛАЙН гипнотерапии" 
        description="Станьте онлайн гипнотерапевтом. Профессиональное обучение работе с подсознанием через интернет. Свобода перемещения, высокий доход, мировое признание."
        image="https://api.gipnozio.ru/storage/v1/object/public/public-images/1766569860658_logo-gipnozio.webp"
        url="/"
        jsonLd={courseSchema}
        breadcrumbs={breadcrumbItems}
      />
      <Hero />
      <AcademyPulse />
      <Resonance />
      <Problem />
      <Solution />
      <DigitalManifesto />
      <GlobalCareer />
      <Stats />
      <ForWhom />
      <Testimonials />
      <Program />
      <Scarcity />
      <Guarantee />
      <CallToAction />
      <Warning />
    </PublicLayout>
  );
};

export default Landing;