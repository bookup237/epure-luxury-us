import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Atelier from './pages/Atelier';
import Login from './pages/Login';
import Discover from './pages/Discover';
import { LanguageProvider, useLanguage } from './i18n';
import { SearchModal } from './components/SearchModal';
import Footer from './components/Footer';
import { getStoredCart, type CartItem } from './data/cart';
import { getActiveUser } from './data/auth';

const Layout = ({ children, cartCount }: { children: React.ReactNode, cartCount: number }) => {
  const location = useLocation();
  const isProductPage = location.pathname.includes('/product/');
  const { t } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col font-sans text-[#1a1a1a] pb-20 md:pb-0">
      {/* Search Overlay */}
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}

      {/* Navbar (Responsive) */}
      <header className="flex items-center justify-between px-5 md:px-12 py-4 md:py-6 bg-[#faf8f5] sticky top-0 z-40 border-b border-[#ede5db] md:border-none">
        
        {/* Left side: Back button or Logo */}
        <div className="flex items-center gap-4">
          {isProductPage ? (
            <Link to="/" className="text-xl md:hidden">←</Link>
          ) : (
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="ÉPURE Logo" className="h-10 md:h-12 object-contain mix-blend-multiply" />
            </Link>
          )}
        </div>
        
        {/* Mobile Title */}
        <div className="md:hidden font-['Cormorant_Garamond'] font-semibold tracking-widest text-sm uppercase">
          {isProductPage ? 'Garment Detail' : ''}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-gray-500">
          <Link to="/" className="text-[#1a1a1a] hover:text-[#8b7355] transition-colors">{t('nav_boutique')}</Link>
          <Link to="/discover" className="hover:text-[#8b7355] transition-colors">{t('nav_decouvrir')}</Link>
        </nav>
        
        {/* Right side: Search, Cart, Profile */}
        <div className="flex items-center gap-4 md:gap-6">
          <button onClick={() => setIsSearchOpen(true)} className="text-gray-600 hidden md:block hover:text-[#1a1a1a]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          
          <Link to="/cart" className="hidden md:flex relative items-center text-gray-600 hover:text-[#1a1a1a]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#1a1a1a] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {!isProductPage && (
            <button onClick={() => setIsSearchOpen(true)} className="text-gray-600 md:hidden">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          )}
          <Link to="/account" className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden cursor-pointer hover:ring-2 ring-offset-2 ring-[#8b7355] transition-all">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full object-cover" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto md:px-12">
        {children}
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Bottom Tab Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#faf8f5] border-t border-[#ede5db] flex justify-around items-center py-3 px-2 z-50 safe-area-pb">
        <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span className="text-[10px] font-medium tracking-wider uppercase">{t('nav_boutique')}</span>
        </Link>
        <Link to="/discover" className={`flex flex-col items-center gap-1 ${location.pathname === '/discover' ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span className="text-[10px] font-medium tracking-wider uppercase">{t('nav_decouvrir')}</span>
        </Link>
        <Link to="/cart" className={`flex flex-col items-center gap-1 relative ${location.pathname === '/cart' ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
          <div className="relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#1a1a1a] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-wider uppercase">{t('nav_cart')}</span>
        </Link>
        <Link to="/account" className={`flex flex-col items-center gap-1 ${location.pathname === '/account' ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span className="text-[10px] font-medium tracking-wider uppercase">{t('nav_account')}</span>
        </Link>
      </nav>
    </div>
  );
};

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initialiser le panier depuis le storage
    setCart(getStoredCart());

    // Synchroniser en direct le panier
    const onCartUpdate = () => setCart(getStoredCart());
    window.addEventListener('epure_cart_updated', onCartUpdate);

    // Initialiser le statut de connexion
    const active = getActiveUser();
    if (active) {
      setIsLoggedIn(true);
    }

    return () => window.removeEventListener('epure_cart_updated', onCartUpdate);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <LanguageProvider>
      <Layout cartCount={cartCount}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} />
          <Route path="/account" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/atelier" element={<Atelier />} />
        </Routes>
      </Layout>
    </LanguageProvider>
  );
}

export default App;
