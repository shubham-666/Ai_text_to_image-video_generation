import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ModelsShowcase from './components/ModelsShowcase';
import Implementation from './components/Implementation';
import UseCases from './components/UseCases';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import ImageGeneration from './components/ImageGeneration';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    document.title = 'EMAAR-VISUALAI - Custom AI Visual Generation Models';
  }, []);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigation} currentPage={currentPage} />
      {currentPage === 'home' ? (
        <main>
          <Hero onGetStarted={() => handleNavigation('generate')} onDemo={() => handleNavigation('generate')} />
          <Features />
          <ModelsShowcase />
          <Implementation />
          <UseCases />
          <CallToAction onGetStarted={() => handleNavigation('generate')} />
        </main>
      ) : (
        <ImageGeneration />
      )}
      <Footer />
    </div>
  );
}

export default App;