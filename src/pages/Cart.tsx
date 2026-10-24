import { useNavigate } from 'react-router-dom';
import { createOrder } from '../data/orders';

const Cart = ({ cart, setCart, isLoggedIn }: { cart: any[], setCart: any, isLoggedIn: boolean }) => {
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/account');
      return;
    }

    if (cart.length === 0) {
      alert('Votre panier est vide.');
      return;
    }

    // Enregistrer la commande dans le registre de l'Atelier
    const newOrder = createOrder({
      customerName: 'Client ÉPURE Authentifié',
      customerEmail: 'client.vip@epure-paris.com',
      address: 'Paris 8e, Avenue Montaigne, FR',
      items: cart.map(i => ({
        id: i.id,
        name: i.name,
        subtitle: i.subtitle,
        color: i.color,
        size: i.size,
        price: i.price,
        quantity: i.quantity,
        image: i.image
      })),
      total: subtotal
    });

    // Vider le panier après commande
    setCart([]);
    alert(`Commande ${newOrder.id} validée avec succès (${subtotal.toFixed(2)} €) ! Merci pour votre achat.`);
  };

  const updateQuantity = (id: string, color: string, size: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id && item.color === color && item.size === size) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeItem = (id: string, color: string, size: string) => {
    setCart(cart.filter(item => !(item.id === id && item.color === color && item.size === size)));
  };

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-baseline mb-6">
        <h1 className="font-['Cormorant_Garamond'] text-3xl">Mon Panier</h1>
        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">[ {cart.length < 10 ? `0${cart.length}` : cart.length} articles ]</span>
      </div>

      <div className="bg-[#ede5db] px-4 py-3 rounded-sm flex items-center gap-3 mb-6">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M7 17v4h14V7h-4"/><path d="M11 12h4"/><path d="M13 10v4"/></svg>
        <div className="flex-1 text-sm">Livraison express offerte en France métropolitaine</div>
        <div className="text-[10px] font-bold tracking-widest uppercase">Offerte</div>
      </div>

      {/* Cart Items */}
      <div className="space-y-6 mb-8">
        {cart.length === 0 ? (
          <p className="text-gray-500 italic py-8">Votre panier est vide.</p>
        ) : cart.map(item => (
          <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4">
            <div className="w-24 h-32 bg-gray-200 rounded-sm flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-sm" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <button onClick={() => removeItem(item.id, item.color, item.size)} className="text-gray-400 p-1 hover:text-red-500 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                <div className="text-[10px] font-bold tracking-widest uppercase mt-2 text-gray-600">
                  {item.color} • Taille {item.size}
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center bg-[#f5f0eb] px-3 py-1 rounded-sm gap-4">
                  <button onClick={() => updateQuantity(item.id, item.color, item.size, -1)} className="text-gray-500 text-lg hover:text-black">&minus;</button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.color, item.size, 1)} className="text-gray-500 text-lg hover:text-black">+</button>
                </div>
                <div className="font-medium">{item.price} €</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="flex gap-2 mb-8 border border-[#ede5db] p-1 rounded-sm bg-white">
        <div className="flex-1 flex items-center gap-2 px-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          <input type="text" placeholder="Code privilège / carte cadeau" className="w-full text-xs outline-none uppercase placeholder:normal-case" />
        </div>
        <button onClick={() => alert("Ce code privilège n'est pas valide ou a expiré.")} className="bg-[#1a1a1a] text-white px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors">Appliquer</button>
      </div>

      {/* Summary */}
      <div className="bg-white p-5 rounded-sm mb-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-4">Récapitulatif financier</h3>
        
        <div className="space-y-3 mb-6 border-b border-[#f5f0eb] pb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Sous-total</span>
            <span className="font-medium">{subtotal.toFixed(2).replace('.', ',')} €</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 flex items-center gap-1">Livraison Standard Express <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>
            <span className="text-[10px] font-bold tracking-widest uppercase">Offerte</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-sm text-gray-600 max-w-[200px]">Coffret Signature & Housse Atelier</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">[ Inclus ] 0,00 €</span>
          </div>
        </div>

        <div className="flex justify-between items-end mb-1">
          <span className="font-medium text-lg">Total</span>
          <span className="font-['Cormorant_Garamond'] text-3xl">{subtotal.toFixed(2).replace('.', ',')} €</span>
        </div>
        <div className="text-[10px] text-gray-400 mb-6">Taxes locales et douanes incluses</div>

        <button onClick={handleCheckout} className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 mb-3 hover:bg-gray-900 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Passer au paiement sécurisé
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => alert("Ouverture du terminal Apple Pay...")} className="bg-[#ede5db] hover:bg-[#d5cdc3] transition-colors text-[#1a1a1a] py-3 text-[10px] font-bold tracking-widest uppercase rounded-sm flex justify-center items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.87 3.56-.76 1.76.13 2.92.8 3.73 2.05-1.48.9-2.34 2.37-2.26 3.93.07 1.83 1.25 3.32 2.98 4.02-.45 1.16-1 2.26-1.74 3.23l-1.35-1.3zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg> Pay
          </button>
          <button onClick={() => alert("Ouverture du terminal Google Pay...")} className="bg-[#ede5db] hover:bg-[#d5cdc3] transition-colors text-[#1a1a1a] py-3 text-[10px] font-bold tracking-widest uppercase rounded-sm flex justify-center items-center gap-1">
            G Pay
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#f5f0eb] p-3 rounded-sm text-center">
          <svg className="mx-auto mb-2 text-gray-600" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          <div className="text-[9px] font-bold tracking-wider uppercase mb-0.5">Paiement 256-bit</div>
          <div className="text-[9px] text-gray-500">Chiffré & Certifié</div>
        </div>
        <div className="bg-[#f5f0eb] p-3 rounded-sm text-center">
          <svg className="mx-auto mb-2 text-gray-600" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          <div className="text-[9px] font-bold tracking-wider uppercase mb-0.5">Retours Coursier</div>
          <div className="text-[9px] text-gray-500">30 jours sans frais</div>
        </div>
        <div className="bg-[#f5f0eb] p-3 rounded-sm text-center">
          <svg className="mx-auto mb-2 text-gray-600" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/></svg>
          <div className="text-[9px] font-bold tracking-wider uppercase mb-0.5">Conciergerie VIP</div>
          <div className="text-[9px] text-gray-500">Conseillers 7j/7</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
