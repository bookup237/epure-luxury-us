import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStoredProducts } from '../data/products';
import { addItemToCart } from '../data/cart';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productList = getStoredProducts();
  const product = productList.find(p => p.id === id);

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || { name: 'Sable Lin', hex: '#c4b5a4' });
  const [selectedSize, setSelectedSize] = useState('S');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return <div className="p-8 text-center">Product not found</div>;

  const handleAddToCart = () => {
    addItemToCart({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      color: selectedColor.name,
      size: selectedSize,
      price: product.price,
      image: product.image
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="pb-28">
      {/* Toast Notification */}
      {addedNotice && (
        <div className="fixed top-20 right-6 z-50 bg-[#1a1a1a] text-white px-5 py-3 rounded-sm shadow-xl text-xs flex items-center gap-3 animate-in fade-in">
          <span>✓ Added to your Shopping Bag</span>
          <button onClick={() => navigate('/cart')} className="underline text-[#c4b5a4] hover:text-white font-medium">
            View Bag
          </button>
        </div>
      )}

      {/* Image Area */}
      <div className="relative h-[65vh] bg-[#ede5db]">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase text-[#1a1a1a] rounded-sm">
          [ {product.badge || 'SIGNATURE PIECE'} ]
        </div>
      </div>

      {/* Details */}
      <div className="px-5 pt-6 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[10px] font-semibold tracking-widest uppercase text-gray-500">
            ÉPURE ATELIER &bull; REF {product.ref || 'EP-891'}
          </div>
          <div className="text-[10px] font-semibold tracking-widest uppercase text-[#8b7355]">
            100% Noble Fibers
          </div>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl leading-tight mb-3">
          {product.name}
        </h1>
        <p className="text-sm text-gray-500 mb-4">{product.subtitle}</p>

        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-2xl font-medium">${product.price}</span>
          <span className="text-xs text-gray-500">Complimentary 2-Day US FedEx Delivery included</span>
        </div>

        {/* Color Selection */}
        <div className="bg-[#f5f0eb] p-4 rounded-sm mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-600">Selected Shade</span>
            <span className="text-xs font-semibold">{selectedColor?.name}</span>
          </div>
          <div className="flex gap-3">
            {product.colors?.map(color => (
              <button 
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedColor?.name === color.name ? 'ring-2 ring-offset-2 ring-[#1a1a1a] ring-offset-[#f5f0eb]' : ''}`}
              >
                <span className="w-full h-full rounded-full border border-black/10" style={{ backgroundColor: color.hex }}></span>
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-600">Select Size</span>
            <span className="text-[10px] text-gray-400 underline cursor-pointer" onClick={() => alert("Size fits true to US sizing standards.")}>
              Size Guide
            </span>
          </div>
          <div className="flex gap-2">
            {['XS', 'S', 'M', 'L', 'XL'].map(sz => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-sm border transition-colors ${
                  selectedSize === sz 
                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' 
                    : 'bg-white border-[#ede5db] text-gray-700 hover:border-black'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm font-light text-gray-600 leading-relaxed mb-8">
          {product.description}
        </p>
      </div>

      {/* Fixed Action Bar for Mobile & Desktop */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#faf8f5]/95 backdrop-blur-md p-4 border-t border-[#ede5db] flex gap-3 z-40 max-w-3xl mx-auto shadow-lg">
        <button 
          onClick={handleBuyNow}
          className="w-1/3 bg-[#ede5db] hover:bg-[#d5cdc3] text-[#1a1a1a] py-4 text-[10px] font-bold tracking-widest uppercase rounded-sm transition-colors"
        >
          Express Buy
        </button>
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-[#1a1a1a] hover:bg-black text-white py-4 text-[10px] font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Add to Bag &mdash; ${product.price}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
