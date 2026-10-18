import { useState, useEffect } from 'react';
import IntroVideo from './components/IntroVideo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import GroupOfCompanies from './components/GroupOfCompanies';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import BrandsSection from './components/BrandsSection';
import Calculator from './components/Calculator';
import FAQSection from './components/FAQSection';
import StoreInfo from './components/StoreInfo';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import FloatingActions from './components/FloatingActions';

export default function Index() {
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('murugan_admin_token');
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const handleOpenQuote = (brandName?: string) => {
    setSelectedBrand(brandName || '');
    setIsQuoteOpen(true);
  };
  const handleCloseQuote = () => setIsQuoteOpen(false);
  const handleExplore = () => {
    const el = document.getElementById('group-of-companies');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setIsAdminOpen(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('murugan_admin_token');
    localStorage.removeItem('murugan_admin_user');
    setIsAdmin(false);
    setIsAdminOpen(false);
    window.dispatchEvent(new CustomEvent('murugan_products_updated'));
  };

  return (
    <div className="bg-[#F8EFE2] min-h-screen w-full relative flex flex-col font-sans selection:bg-[#F59E0B] selection:text-white overflow-x-hidden">
      
      {/* Glossymorphic Ambient Light Orbs (Refract through all Frosted Glass Panels) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="ambient-glow-amber w-[650px] h-[650px] -top-32 -left-32 opacity-40 animate-pulse" />
        <div className="ambient-glow-orange w-[600px] h-[600px] top-[18%] -right-40 opacity-35" />
        <div className="ambient-glow-amber w-[550px] h-[550px] top-[42%] -left-32 opacity-30" />
        <div className="ambient-glow-orange w-[700px] h-[700px] top-[68%] -right-48 opacity-35" />
        <div className="ambient-glow-amber w-[600px] h-[600px] top-[88%] -left-40 opacity-25" />
      </div>

      {/* 1. Full-Screen Video Intro Showcase (Fades away upon completion or when skipped) */}
      {!hasWatchedVideo && (
        <IntroVideo onComplete={() => setHasWatchedVideo(true)} />
      )}

      {/* 2. Golden Dawn Frosted Navbar */}
      <Navbar 
        isAdmin={isAdmin}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 3. Hero Section with 4K Storefront Photo */}
      <main className="flex-1">
        <Hero 
          onOpenQuote={handleOpenQuote} 
          onExploreClick={handleExplore}
        />

        {/* 4. Glossy Trust Bar Ribbon */}
        <TrustBar />

        {/* 5. Our Group of Companies (7 Specialized Divisions in Crystal Glass Cards) */}
        <GroupOfCompanies onOpenQuote={handleOpenQuote} />

        {/* 6. About Sree Murugan Sons (25+ Years Legacy & Glossy Stats) */}
        <AboutSection onOpenQuote={handleOpenQuote} />

        {/* 7. Our Services (Glossy Support Cards) */}
        <ServicesSection onOpenQuote={handleOpenQuote} />

        {/* 8. Brands We're Dealing With (Direct Mill Partnerships & Leading Manufacturers) */}
        <BrandsSection onOpenQuote={handleOpenQuote} />

        {/* 9. Construction Material Estimator with Glossy Glass Controls */}
        <Calculator onOpenQuote={handleOpenQuote} />

        {/* 10. Frequently Asked Questions (Glossy Accordion) */}
        <FAQSection />

        {/* 11. Store Info, Working Hours & Google Map */}
        <StoreInfo />
      </main>

      {/* 12. Deep Espresso Glossy Footer */}
      <Footer />

      {/* 13. Interactive Wholesale Quote Modal (Glossy Modal) */}
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={handleCloseQuote} 
        initialBrand={selectedBrand}
      />

      {/* 14. Customer & Admin Sign In Modal (Glossy Modal) */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onAdminLogin={handleAdminLogin}
      />

      {/* 15. Sree Murugan Sons Dedicated Admin Dashboard (Glossy Portal) */}
      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => {
          setIsAdminOpen(false);
          window.dispatchEvent(new CustomEvent('murugan_products_updated'));
        }}
        onLogout={handleAdminLogout}
        onProductsUpdated={() => {
          window.dispatchEvent(new CustomEvent('murugan_products_updated'));
        }}
      />

      {/* 16. Floating WhatsApp & Direct Call Buttons */}
      <FloatingActions />
    </div>
  );
}
