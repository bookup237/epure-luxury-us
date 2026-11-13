import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getStoredProducts, type Product } from '../data/products';
import { addItemToCart } from '../data/cart';

const Home = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'low' | 'high'>('featured');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  useEffect(() => {
    setProductList(getStoredProducts());
    const onUpdate = () => setProductList(getStoredProducts());
    window.addEventListener('epure_products_updated', onUpdate);
    return () => window.removeEventListener('epure_products_updated', onUpdate);
  }, []);

  const tabs = [
    { key: 'All', label: 'All Collections' },
    { key: 'Coats', label: 'Wool Overcoats' },
    { key: 'Cashmere', label: 'Pure Cashmere' },
    { key: 'Pants', label: 'Tailored Trousers' }
  ];

  // Quick add to bag
  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    addItemToCart({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      color: product.colors?.[0]?.name || 'Natural',
      size: 'M',
      price: product.price,
      image: product.image
    });

    setAddedNotice(product.name);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  const filteredProducts = productList
    .filter(p => {
      if (activeTab === 'Coats') return p.category.toLowerCase().includes('coat') || p.category.includes('MANTEAU');
      if (activeTab === 'Cashmere') return p.category.toLowerCase().includes('cashmere') || p.category.includes('CACHEMIRE') || p.name.toLowerCase().includes('cashmere');
      if (activeTab === 'Pants') return p.category.toLowerCase().includes('trouser') || p.category.toLowerCase().includes('pant') || p.category.includes('PANTALON');
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      return 0;
    });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <div className="pb-12">
      {/* Quick Add Toast */}
      {addedNotice && (
        <div className="fixed top-24 right-6 z-50 bg-[#1a1a1a] text-white px-5 py-3.5 rounded-sm shadow-2xl text-xs flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <span>✓ Added <strong>{addedNotice}</strong> to Bag</span>
          <button onClick={() => navigate('/cart')} className="underline text-[#c4b5a4] hover:text-white font-medium">
            View Bag
          </button>
        </div>
      )}

      {/* 1. EDITORIAL HERO CAMPAIGN */}
      <section className="relative px-4 md:px-12 pt-2 md:pt-4 mb-14 md:mb-20">
        <div className="relative rounded-sm overflow-hidden h-[540px] md:h-[750px] shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=1800&h=1200&fit=crop" 
            alt="ÉPURE Autumn Winter Collection" 
            className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.92]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 text-white max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-3 text-[#d8cdbf]">
              <span>AUTUMN / WINTER 2025</span>
              <span>&bull;</span>
              <span>NEW YORK FLAGSHIP</span>
            </div>
            
            <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-7xl leading-[1.08] mb-4 font-light tracking-wide">
              Pure Silhouettes &<br />
              <span className="italic font-normal">Architectural Wools</span>
            </h1>
            
            <p className="text-xs sm:text-sm md:text-base font-light text-gray-200 mb-8 max-w-lg leading-relaxed">
              Tailored in the quiet intimacy of European heritage mills. An uncompromising standard of quiet luxury, sculpted for the American wardrobe.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={() => { document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }} 
                className="bg-white text-[#1a1a1a] px-8 py-4 text-xs font-bold tracking-[0.25em] uppercase rounded-sm hover:bg-[#ede5db] transition-all text-center shadow-lg hover:shadow-xl"
              >
                Shop The Collection &rarr;
              </button>
              <button 
                onClick={() => { 
                  setActiveTab('Cashmere');
                  document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); 
                }} 
                className="bg-black/40 backdrop-blur-md border border-white/40 text-white px-8 py-4 text-xs font-bold tracking-[0.25em] uppercase rounded-sm hover:bg-white hover:text-black transition-all text-center"
              >
                Explore Cashmere
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4-PILLAR US LUXURY SERVICE STRIP */}
      <section className="px-5 md:px-12 mb-16 md:mb-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 py-8 px-6 bg-[#ede5db]/40 border border-[#ede5db] rounded-sm">
          {/* Pillar 1 */}
          <div className="flex items-start gap-3.5">
            <span className="text-2xl mt-0.5">📦</span>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                Complimentary 2-Day FedEx
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                Expedited delivery across all 50 states with signature confirmation.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-start gap-3.5">
            <span className="text-2xl mt-0.5">🌿</span>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                100% Certified Noble Fibers
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                Pure Mongolian cashmere & virgin wools woven in Biella, Italy.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-start gap-3.5">
            <span className="text-2xl mt-0.5">✨</span>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                Signature Archival Box
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                Included with every piece, accompanied by an atelier canvas garment bag.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="flex items-start gap-3.5">
            <span className="text-2xl mt-0.5">🏛️</span>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                Madison Ave Flagship Concierge
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                Private appointments & bespoke styling at +1 (782) 202-0702.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURATED EDITORIAL LOOKBOOKS (3-COLUMN SPLIT) */}
      <section className="px-5 md:px-12 mb-16 md:mb-24 max-w-[1440px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#8b7355] block mb-2">
            The Curated Wardrobe
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#1a1a1a]">
            Seasonal Editorial Edits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div 
            onClick={() => { setActiveTab('Coats'); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="group relative h-[480px] rounded-sm overflow-hidden cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&h=1000&fit=crop" 
              alt="Virgin Wool Overcoats" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-300 block mb-1">
                Outerwear
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-2">
                The Virgin Wool Overcoat Edit
              </h3>
              <span className="text-xs font-semibold tracking-widest uppercase border-b border-white pb-0.5 text-white/90 group-hover:text-white transition-colors">
                Discover Pieces &rarr;
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => { setActiveTab('Cashmere'); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="group relative h-[480px] rounded-sm overflow-hidden cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&h=1000&fit=crop" 
              alt="4-Ply Cashmere Knitwear" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-300 block mb-1">
                Knitwear
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-2">
                Pure 4-Ply Mongolian Cashmere
              </h3>
              <span className="text-xs font-semibold tracking-widest uppercase border-b border-white pb-0.5 text-white/90 group-hover:text-white transition-colors">
                Shop Knitwear &rarr;
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => { setActiveTab('Pants'); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="group relative h-[480px] rounded-sm overflow-hidden cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop" 
              alt="Sartorial Tailoring" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-300 block mb-1">
                Tailoring
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-2">
                Architectural Pleated Trousers
              </h3>
              <span className="text-xs font-semibold tracking-widest uppercase border-b border-white pb-0.5 text-white/90 group-hover:text-white transition-colors">
                Explore Trousers &rarr;
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE COLLECTION SHOWCASE WITH FILTERS & SORT */}
      <section className="px-5 md:px-12 mb-20 md:mb-28 max-w-[1440px] mx-auto" id="collection">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#ede5db] mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#8b7355] block mb-1">
              Boutique Catalog
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#1a1a1a]">
              The Ready-to-Wear Collection
            </h2>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 self-end md:self-auto text-xs">
            <span className="text-gray-400 uppercase tracking-widest text-[10px] font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border border-[#ede5db] rounded-xs px-3 py-1.5 text-xs font-medium uppercase outline-none focus:border-black cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 md:gap-3 overflow-x-auto hide-scrollbar mb-8">
          {tabs.map(tab => (
            <button 
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase rounded-xs transition-all whitespace-nowrap ${
                activeTab === tab.key 
                  ? 'bg-[#1a1a1a] text-white shadow-xs' 
                  : 'bg-white border border-[#ede5db] text-gray-600 hover:text-black hover:border-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-7 md:gap-y-14">
          {filteredProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="block group">
              <div className="relative mb-3 aspect-[3/4] bg-[#ede5db] rounded-sm overflow-hidden shadow-xs">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[8px] md:text-[9px] font-bold tracking-widest uppercase text-[#1a1a1a] rounded-xs shadow-xs">
                    {product.badge}
                  </div>
                )}

                {/* Quick Add Overlay on Hover (Desktop) */}
                <div className="absolute inset-x-2 bottom-2 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="w-full bg-[#1a1a1a]/90 backdrop-blur-xs text-white py-2.5 text-[9px] font-bold tracking-[0.2em] uppercase rounded-xs hover:bg-black transition-colors shadow-lg"
                  >
                    + Quick Add to Bag
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-medium text-sm md:text-base text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors leading-snug">
                    {product.name}
                  </h3>
                </div>
                
                <p className="text-xs text-gray-500 line-clamp-1">{product.subtitle}</p>

                {/* Color preview dots */}
                {product.colors && product.colors.length > 0 && (
                  <div className="flex gap-1.5 pt-1">
                    {product.colors.map(c => (
                      <span 
                        key={c.name} 
                        className="w-2.5 h-2.5 rounded-full border border-black/20" 
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      ></span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center pt-1.5">
                  <span className="font-semibold text-sm md:text-base text-[#1a1a1a]">${product.price}.00</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#8b7355] font-semibold">
                    FedEx 2-Day
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. THE MADISON AVENUE FLAGSHIP SALON EXPERIENCE */}
      <section className="px-5 md:px-12 mb-20 md:mb-28 max-w-[1440px] mx-auto">
        <div className="bg-[#ede5db]/50 border border-[#ede5db] rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="p-8 md:p-16 lg:p-20 space-y-6">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#8b7355] block">
              Flagship Residence
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-5xl font-light text-[#1a1a1a] leading-tight">
              The Madison Avenue Salon Experience
            </h2>
            <div className="w-12 h-px bg-[#8b7355]"></div>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
              Located at <strong>740 Madison Avenue, New York, NY 10065</strong>, the salon is an oasis of tactile serenity in the heart of Manhattan. Clients are invited for bespoke wardrobe consultations, private fittings, and personal deliveries.
            </p>
            <div className="space-y-2 pt-2 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-[#8b7355]">📍</span>
                <span>740 Madison Avenue (72nd St), New York, NY</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#8b7355]">📞</span>
                <a href="tel:+17822020702" className="hover:underline font-semibold">+1 (782) 202-0702</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#8b7355]">✉️</span>
                <a href="mailto:concierge@epureluxury.com" className="hover:underline">concierge@epureluxury.com</a>
              </div>
            </div>
            <div className="pt-4">
              <a 
                href="mailto:concierge@epureluxury.com?subject=Private%20Appointment%20Request%20-%20Madison%20Avenue" 
                className="inline-block bg-[#1a1a1a] text-white px-8 py-3.5 text-[10px] font-bold tracking-[0.25em] uppercase rounded-sm hover:bg-black transition-colors"
              >
                Book a Private Consultation &rarr;
              </a>
            </div>
          </div>

          <div className="h-[400px] lg:h-[600px] bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&h=1200&fit=crop" 
              alt="Madison Avenue Salon" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. EDITORIAL PRESS QUOTES TICKER (SOCIAL PROOF) */}
      <section className="bg-white border-y border-[#ede5db] py-12 px-6 mb-20 md:mb-28">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#ede5db]">
          <div className="p-4">
            <div className="text-amber-700 text-sm mb-2">★★★★★</div>
            <blockquote className="font-['Cormorant_Garamond'] text-lg md:text-xl italic text-gray-800 mb-2">
              "The benchmark of modern quiet luxury in Manhattan."
            </blockquote>
            <cite className="text-[10px] uppercase tracking-widest text-gray-400 not-italic font-bold">
              — The Style Journal
            </cite>
          </div>

          <div className="p-4">
            <div className="text-amber-700 text-sm mb-2">★★★★★</div>
            <blockquote className="font-['Cormorant_Garamond'] text-lg md:text-xl italic text-gray-800 mb-2">
              "Unrivaled tactile cashmere that outlasts seasonal trends."
            </blockquote>
            <cite className="text-[10px] uppercase tracking-widest text-gray-400 not-italic font-bold">
              — Luxury Daily NYC
            </cite>
          </div>

          <div className="p-4">
            <div className="text-amber-700 text-sm mb-2">★★★★★</div>
            <blockquote className="font-['Cormorant_Garamond'] text-lg md:text-xl italic text-gray-800 mb-2">
              "Bespoke European craftsmanship delivered with New York velocity."
            </blockquote>
            <cite className="text-[10px] uppercase tracking-widest text-gray-400 not-italic font-bold">
              — Haute Living
            </cite>
          </div>
        </div>
      </section>

      {/* 7. VIP CLIENT PRIVILEGES NEWSLETTER SIGNUP */}
      <section className="px-5 md:px-12 max-w-2xl mx-auto text-center mb-16">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#8b7355] block mb-2">
          Private Client Access
        </span>
        <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold mb-3">
          Join The Maison ÉPURE Circle
        </h2>
        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          Be the first to receive invitations to private trunk shows, seasonal preview releases, and complimentary FedEx expedited dispatch.
        </p>

        {newsletterSubmitted ? (
          <div className="bg-[#ede5db] text-[#1a1a1a] p-4 rounded-sm text-xs font-semibold tracking-wide">
            ✓ Welcome to The Maison ÉPURE Circle. Your invitation has been dispatched.
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-white border border-[#ede5db] px-4 py-3 text-xs outline-none focus:border-black rounded-sm"
            />
            <button 
              type="submit"
              className="bg-[#1a1a1a] text-white px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-black transition-colors"
            >
              Join Privileges
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Home;
