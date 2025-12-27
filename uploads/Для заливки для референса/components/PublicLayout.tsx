
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactWidget from './ContactWidget';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-gold/30">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ContactWidget />
    </div>
  );
};

export default PublicLayout;
