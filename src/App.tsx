import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Atelier from './pages/Atelier';
import Login from './pages/Login';
import Discover from './pages/Discover';
import { LanguageProvider } from './i18n';
import { SearchModal } from './components/SearchModal';
import Footer from './components/Footer';
import { getStoredCart, type CartItem } from './data/cart';
import { getActiveUser } from './data/auth';

const Layout = ({ children, cartCount, isLoggedIn }: { children: React.ReactNode, cartCount: number, isLoggedIn: boolean }) => {
  const location = useLocation();
  const isProductPage = location.pathname.includes('/product/');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const activeUser = getActiveUser();

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col font-sans text-[#1a1a1a] pb-20 md:pb-0">
      {/* Top US Luxury Announcement Bar */}
      <div className="bg-[#1a1a1a] text-[#f0ebe3] py-2 px-4 md:px-12 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium flex justify-between items-center border-b border-black">
        <div className="hidden lg:flex items-center gap-3 text-gray-400">
          <span>🇺🇸 United States Flagship</span>
          <span>•</span>
          <span>Madison Ave, New York</span>
        </div>

        <div className="mx-auto text-center font-medium text-white tracking-widest text-[9px] md:text-[10px]">
          COMPLIMENTARY 2-DAY FEDEX US DELIVERY &bull; 30-DAY COMPLIMENTARY RETURNS
        </div>

        <div className="hidden lg:flex items-center gap-4 text-gray-300">
          <a href="tel:+17822020702" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span>Concierge:</span>
            <span className="font-semibold text-white">+1 (782) 202-0702</span>
          </a>
          <span>•</span>
          <span className="font-semibold text-white">USD ($)</span>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}

      {/* Navbar (American Luxury Flagship Standard) */}
      <header className="px-5 md:px-12 py-4 md:py-6 bg-[#faf8f5]/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#ede5db] transition-all">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Left Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-bold tracking-[0.22em] uppercase text-gray-700">
            <Link to="/" className="text-[#1a1a1a] hover:text-[#8b7355] transition-colors">
              Collections
            </Link>
            <Link to="/" onClick={() => setTimeout(() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }), 50)} className="hover:text-[#8b7355] transition-colors">
              Overcoats
            </Link>
            <Link to="/" onClick={() => setTimeout(() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }), 50)} className="hover:text-[#8b7355] transition-colors">
              Cashmere
            </Link>
            <Link to="/discover" className="hover:text-[#8b7355] transition-colors">
              The Maison
            </Link>
          </nav>

          {/* Center Brand Identity (Prestige Luxury Mark) */}
          <div className="flex items-center">
            {isProductPage ? (
              <Link to="/" className="text-xl md:hidden mr-3">←</Link>
            ) : null}
            <Link to="/" className="flex flex-col items-center group">
              <span className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold tracking-[0.35em] uppercase text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors">
                É P U R E
              </span>
              <span className="text-[8px] md:text-[9px] font-sans tracking-[0.3em] uppercase text-gray-500 font-medium">
                NEW YORK &bull; PARIS
              </span>
            </Link>
          </div>

          {/* Right side: Search, VIP Phone, Cart, Account */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(true)} 
              title="Search Collections"
              className="text-gray-700 hover:text-black flex items-center gap-1.5 text-xs tracking-wider uppercase"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <span className="hidden xl:inline text-[10px] font-semibold">Search</span>
            </button>

            {/* Private Concierge Assistance */}
            <a 
              href="tel:+17822020702" 
              title="Contact VIP Concierge"
              className="hidden md:flex items-center gap-1.5 text-xs text-gray-700 hover:text-black tracking-wider"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="hidden xl:inline text-[10px] font-semibold uppercase">Concierge</span>
            </a>

            {/* Account Icon */}
            <Link 
              to="/account" 
              title={isLoggedIn ? "My ÉPURE Account" : "Sign In / Register"}
              className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all ${
                isLoggedIn 
                  ? 'bg-[#1a1a1a] text-[#f0ebe3] font-semibold text-xs border border-[#8b7355] shadow-xs' 
                  : 'border border-[#ede5db] text-gray-700 hover:text-black hover:border-black bg-white'
              }`}
            >
              {isLoggedIn ? (
                <span>{activeUser?.firstName?.slice(0, 1)?.toUpperCase() || 'VIP'}</span>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              )}
            </Link>

            {/* Shopping Bag Button */}
            <Link 
              to="/cart" 
              title="Shopping Bag"
              className="flex items-center gap-2 bg-[#1a1a1a] text-white px-3.5 py-2 md:px-4 md:py-2.5 rounded-sm hover:bg-black transition-all shadow-xs"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">
                Bag {cartCount > 0 ? `(${cartCount})` : ''}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto">
        {children}
      </main>

      {/* Luxury American Footer */}
      <Footer />

      {/* Bottom Tab Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#faf8f5] border-t border-[#ede5db] flex justify-around items-center py-3 px-2 z-50 safe-area-pb">
        <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span className="text-[10px] font-medium tracking-wider uppercase">Shop</span>
        </Link>
        <Link to="/discover" className={`flex flex-col items-center gap-1 ${location.pathname === '/discover' ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span className="text-[10px] font-medium tracking-wider uppercase">Maison</span>
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
          <span className="text-[10px] font-medium tracking-wider uppercase">Bag</span>
        </Link>
        <Link to="/account" className={`flex flex-col items-center gap-1 ${location.pathname === '/account' ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span className="text-[10px] font-medium tracking-wider uppercase">Account</span>
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
      <Layout cartCount={cartCount} isLoggedIn={isLoggedIn}>
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
