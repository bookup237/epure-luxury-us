import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredProducts, type Product } from '../data/products';

const Home = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('Tous');
  
  useEffect(() => {
    setProductList(getStoredProducts());
    const onUpdate = () => setProductList(getStoredProducts());
    window.addEventListener('epure_products_updated', onUpdate);
    return () => window.removeEventListener('epure_products_updated', onUpdate);
  }, []);

  const tabs = ['Tous', 'Manteaux en laine', 'Cachemire', 'Pantalons'];
  
  const filteredProducts = activeTab === 'Tous' 
    ? productList 
    : productList.filter(p => {
        if (activeTab === 'Manteaux en laine') return p.category.includes('MANTEAU') || p.category === 'Manteau';
        if (activeTab === 'Cachemire') return p.category.includes('CACHEMIRE') || p.name.includes('Cachemire') || p.subtitle.includes('Cachemire');
        if (activeTab === 'Pantalons') return p.category.includes('PANTALON');
        return true;
      });

  return (
    <div className="pb-8 md:py-8">
      {/* Hero Section */}
      <div className="px-4 md:px-0 mb-8 md:mb-16">
        <div className="relative rounded-2xl overflow-hidden h-[500px] md:h-[700px]">
          <img 
            src="https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=1600&h=1000&fit=crop" 
            alt="Collection Automne Hiver" 
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white md:max-w-2xl">
            <div className="text-[10px] md:text-xs uppercase tracking-widest font-semibold mb-2 opacity-90">Collection Automne / Hiver 2025</div>
            <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-7xl leading-tight mb-3 md:mb-6">
              Lignes pures &<br />matières nobles
            </h1>
            <p className="text-sm md:text-lg font-light opacity-90 mb-6 md:mb-8 max-w-xs md:max-w-md leading-relaxed">
              Une garde-robe sculptée dans le silence de l'atelier. Tissus d'exception et coupes irréprochables.
            </p>
            <button onClick={() => { document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-white text-[#1a1a1a] px-5 py-3 md:py-4 md:px-8 text-xs md:text-sm font-semibold tracking-widest uppercase flex items-center gap-2 rounded-sm w-full md:w-max justify-center hover:bg-[#ede5db] transition-colors">
              Explorer le vestiaire <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 md:px-0 mb-6 md:mb-10 overflow-x-auto hide-scrollbar" id="collection">
        <div className="flex gap-2 md:gap-4 md:justify-center border-b border-[#ede5db] md:pb-4">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${activeTab === tab ? 'bg-[#1a1a1a] md:bg-transparent md:border-b-2 border-[#1a1a1a] text-white md:text-[#1a1a1a]' : 'bg-[#ede5db] md:bg-transparent text-[#1a1a1a] md:text-gray-400 hover:text-[#1a1a1a]'} px-5 py-2 md:py-1 text-[10px] md:text-xs font-semibold tracking-widest uppercase rounded-sm md:rounded-none whitespace-nowrap transition-colors`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 md:px-0 mb-12 md:mb-24">
        <div className="flex justify-between items-end mb-6 md:mb-8">
          <h2 className="text-xs md:text-sm font-semibold tracking-widest uppercase text-gray-600">Sélection Récente &mdash; Nouveautés</h2>
          <span className="text-xs md:text-sm text-gray-500">{filteredProducts.length} Pièces</span>
        </div>
        
        {/* On mobile: 2 columns, On desktop: 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
          {filteredProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="block group">
              <div className="relative mb-3 aspect-[3/4] bg-[#ede5db] rounded-sm overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 text-[8px] md:text-[9px] font-bold tracking-wider uppercase text-[#1a1a1a]">
                    {product.badge}
                  </div>
                )}
                <button onClick={(e) => { e.preventDefault(); alert('Ajouté à la Wishlist !'); }} className="absolute top-2 right-2 w-7 h-7 md:w-8 md:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
              <h3 className="font-medium text-sm md:text-base text-[#1a1a1a]">{product.name}</h3>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5">{product.subtitle}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold text-sm md:text-base">{product.price} €</span>
                {product.badge === 'RESTOCK' ? (
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-gray-400">Restock</span>
                ) : (
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-gray-400">Atelier 01</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
