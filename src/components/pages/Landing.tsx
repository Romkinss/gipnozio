import React from 'react';
import Hero from '../../Hero';
import AcademyPulse from '../../AcademyPulse';
import Resonance from '../../Resonance';
import Problem from '../../Problem';
import Solution from '../../Solution';
import DigitalManifesto from '../../DigitalManifesto';
import GlobalCareer from '../../GlobalCareer';
import Stats from '../../Stats';
import ForWhom from '../../ForWhom';
import Testimonials from '../../Testimonials';
import Program from '../../Program';
import Scarcity from '../../Scarcity';
import Guarantee from '../../Guarantee';
import CallToAction from '../../CallToAction';
import Warning from '../../Warning';
import PublicLayout from '../../PublicLayout';
import SEO from '../../SEO';

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