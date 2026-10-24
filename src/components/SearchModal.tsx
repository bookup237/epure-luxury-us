import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

// On simule l'import des produits (idéalement ça vient d'une API)
const searchProducts = [
  { id: '1', name: 'Manteau Oversize en Laine', price: 890, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop' },
  { id: '2', name: 'Pull Col Roulé Cachemire', price: 340, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&h=200&fit=crop' },
  { id: '3', name: 'Manteau Ceinturé', price: 460, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=200&h=200&fit=crop' },
  { id: '4', name: 'Pantalon Large Laine', price: 290, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop' },
  { id: '6', name: 'Pull Maille Côtelée', price: 210, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a7a?w=200&h=200&fit=crop' }
];

export const SearchModal = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const { t } = useLanguage();

  // Bloquer le défilement de la page quand la recherche est ouverte
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const results = searchProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-[#faf8f5]/95 backdrop-blur-md z-50 flex flex-col px-6 md:px-12 pt-12 md:pt-24 animate-in fade-in duration-300">
      <button onClick={onClose} className="absolute top-6 right-6 md:top-8 md:right-12 p-2 text-gray-400 hover:text-[#1a1a1a] transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
        <div className="relative mb-8 md:mb-16">
          <input 
            type="text" 
            autoFocus
            placeholder={t('search_placeholder')} 
            className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1a1a1a] text-3xl md:text-5xl py-4 outline-none font-['Cormorant_Garamond'] placeholder:text-gray-300 transition-colors"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query.length > 0 && (
            <button onClick={() => setQuery('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a1a1a]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pb-20">
          {query.length > 0 && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {results.map(product => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-20 h-28 bg-gray-200 overflow-hidden rounded-sm flex-shrink-0">
                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg md:text-xl font-['Cormorant_Garamond'] group-hover:text-[#8b7355] transition-colors">{product.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{product.price} €</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {query.length > 0 && results.length === 0 && (
            <div className="text-center mt-20">
              <p className="text-gray-500 text-lg">{t('search_no_results')} "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
