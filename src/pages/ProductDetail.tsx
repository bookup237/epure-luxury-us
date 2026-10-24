import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStoredProducts } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productList = getStoredProducts();
  const product = productList.find(p => p.id === id);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);

  if (!product) return <div className="p-8 text-center">Produit introuvable</div>;

  return (
    <div className="pb-24">
      {/* Image Area */}
      <div className="relative h-[65vh] bg-[#ede5db]">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase text-[#1a1a1a] rounded-sm">
          [ PIÈCE SIGNATURE ]
        </div>
        
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1a1a1a] shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>

        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-6 h-0.5 bg-[#1a1a1a]"></div>
          <div className="w-6 h-0.5 bg-[#1a1a1a] opacity-30"></div>
          <div className="w-6 h-0.5 bg-[#1a1a1a] opacity-30"></div>
        </div>
      </div>

      {/* Details */}
      <div className="px-5 pt-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[10px] font-semibold tracking-widest uppercase text-gray-500">
            Épure Atelier • Ref {product.ref}
          </div>
          <div className="text-[10px] font-semibold tracking-widest uppercase text-[#1a1a1a]">
            {product.badge || 'Édition Limitée'}
          </div>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-3xl leading-tight mb-4">
          {product.name} en {product.subtitle.split(' ').slice(1).join(' ')}
        </h1>

        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-xl font-medium">{product.price} €</span>
          <span className="text-xs text-gray-500">TVA incluse • Livraison atelier offerte</span>
        </div>

        {/* Color Selection */}
        <div className="bg-[#f5f0eb] p-4 rounded-sm mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold tracking-widest uppercase">Nuance sélectionnée</span>
            <span className="text-sm font-medium">{selectedColor?.name}</span>
          </div>
          <div className="flex gap-3">
            {product.colors?.map(color => (
              <button 
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedColor?.name === color.name ? 'ring-1 ring-offset-2 ring-[#1a1a1a] ring-offset-[#f5f0eb]' : ''}`}
              >
                <span className="w-full h-full rounded-full border border-black/10" style={{ backgroundColor: color.hex }}></span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm font-light text-gray-600 leading-relaxed mb-6">
          {product.description}
        </p>

      </div>

      {/* Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#faf8f5] p-4 border-t border-[#ede5db] flex gap-3 z-50 safe-area-pb">
        <button className="w-1/3 bg-[#ede5db] text-[#1a1a1a] py-4 text-[10px] font-bold tracking-widest uppercase rounded-sm flex items-center justify-center">
          1-Clic
        </button>
        <button className="flex-1 bg-[#1a1a1a] text-white py-4 text-[10px] font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Ajouter au panier &mdash; {product.price} €
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
