import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../data/orders';
import { useLanguage } from '../i18n';
import { getActiveUser } from '../data/auth';
import { getStoredCart, saveCart, type CartItem } from '../data/cart';

type DeliveryMethod = 'in_house' | 'fedex';

const Cart = ({ cart, setCart, isLoggedIn }: { cart: CartItem[], setCart: any, isLoggedIn: boolean }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Delivery options state
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('in_house');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [shippingNotes, setShippingNotes] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [pendingPaymentMethod, setPendingPaymentMethod] = useState('Standard Checkout');

  // Trigger checkout flow
  const initiateCheckout = (paymentMethodName: string) => {
    const active = getActiveUser();
    if (!isLoggedIn && !active) {
      alert("Please sign in or create an account to proceed with your order.");
      navigate('/account');
      return;
    }

    if (cart.length === 0) {
      alert(t('cart_empty'));
      return;
    }

    setPendingPaymentMethod(paymentMethodName);
    setShowAddressModal(true);
  };

  const finalizeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const active = getActiveUser();
    const clientName = active ? `${active.firstName} ${active.lastName}` : 'VIP Client';
    const clientEmail = active ? active.email : 'client.vip@epure-paris.com';

    const fullAddress = `${shippingAddress.trim() || '740 Park Ave'}, ${shippingCity.trim() || 'New York'}, NY ${shippingZip.trim() || '10021'}, USA`;
    const carrierName = deliveryMethod === 'in_house' 
      ? 'ÉPURE Private White-Glove Courier (In-House)' 
      : 'FedEx Express Air (fedex.com Tracked)';

    // 1. Create order
    const newOrder = createOrder({
      customerName: clientName,
      customerEmail: clientEmail,
      address: fullAddress,
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

    // 2. Clear cart
    saveCart([]);
    setCart([]);
    setShowAddressModal(false);

    // 3. Detailed Confirmation
    alert(
      `✓ ORDER CONFIRMED [${newOrder.id}]\n\n` +
      `Delivery Type: ${carrierName}\n` +
      `Destination: ${fullAddress}\n` +
      `Payment: ${pendingPaymentMethod}\n` +
      `Total Charged: $${subtotal.toFixed(2)}\n\n` +
      `A receipt with your tracking link has been dispatched to ${clientEmail}.`
    );
  };

  const updateQuantity = (id: string, color: string, size: string, delta: number) => {
    const current = getStoredCart();
    const updated = current.map(item => {
      if (item.id === id && item.color === color && item.size === size) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    });
    saveCart(updated);
    setCart(updated);
  };

  const removeItem = (id: string, color: string, size: string) => {
    const current = getStoredCart();
    const updated = current.filter(item => !(item.id === id && item.color === color && item.size === size));
    saveCart(updated);
    setCart(updated);
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-baseline mb-6">
        <h1 className="font-['Cormorant_Garamond'] text-3xl">{t('cart_title')}</h1>
        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
          [ {cart.length < 10 ? `0${cart.length}` : cart.length} {t('cart_items')} ]
        </span>
      </div>

      {/* Cart Items */}
      <div className="space-y-6 mb-8">
        {cart.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-sm border border-[#ede5db]">
            <p className="text-gray-500 text-sm italic mb-4">{t('cart_empty')}</p>
            <button 
              onClick={() => navigate('/')} 
              className="bg-[#1a1a1a] text-white px-6 py-3 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-black"
            >
              Browse The Wardrobe
            </button>
          </div>
        ) : cart.map(item => (
          <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 bg-white p-4 rounded-sm border border-[#ede5db]">
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
                  {item.color} • {t('cart_size')} {item.size}
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center bg-[#f5f0eb] px-3 py-1 rounded-sm gap-4">
                  <button onClick={() => updateQuantity(item.id, item.color, item.size, -1)} className="text-gray-500 text-lg hover:text-black">&minus;</button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.color, item.size, 1)} className="text-gray-500 text-lg hover:text-black">+</button>
                </div>
                <div className="font-medium">${item.price * item.quantity}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DELIVERY METHOD SELECTION (In-House vs FedEx) */}
      {cart.length > 0 && (
        <div className="bg-white p-6 rounded-sm mb-6 border border-[#ede5db]">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#8b7355] block mb-1">
            Shipping Preference
          </span>
          <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#1a1a1a] mb-2">
            How would you like to receive your pieces?
          </h3>
          <p className="text-xs text-gray-500 mb-5">
            Select between our private Maison courier service or our official shipping partner FedEx.com.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option 1: In-House Delivery */}
            <div 
              onClick={() => setDeliveryMethod('in_house')}
              className={`p-4 rounded-sm border cursor-pointer transition-all ${
                deliveryMethod === 'in_house' 
                  ? 'border-[#1a1a1a] bg-[#faf8f5] ring-1 ring-[#1a1a1a]' 
                  : 'border-[#ede5db] hover:border-gray-400 bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🏛️</span>
                  <span className="font-semibold text-xs tracking-wider uppercase text-[#1a1a1a]">
                    ÉPURE Private In-House Delivery
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-[#1a1a1a] text-white px-2 py-0.5 rounded-xs">
                  White Glove
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-light mb-2">
                Hand-delivered directly by our Maison atelier team in our signature garment cover and wooden hanger.
              </p>
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-700">
                Complimentary &bull; Same-Day / Scheduled
              </span>
            </div>

            {/* Option 2: FedEx Delivery */}
            <div 
              onClick={() => setDeliveryMethod('fedex')}
              className={`p-4 rounded-sm border cursor-pointer transition-all ${
                deliveryMethod === 'fedex' 
                  ? 'border-[#4D148C] bg-[#faf8f5] ring-1 ring-[#4D148C]' 
                  : 'border-[#ede5db] hover:border-gray-400 bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {/* FedEx Logo */}
                  <div className="flex font-black text-sm tracking-tighter">
                    <span className="text-[#4D148C]">Fed</span>
                    <span className="text-[#FF6200]">Ex</span>
                  </div>
                  <span className="font-semibold text-xs tracking-wider uppercase text-[#1a1a1a]">
                    Official Partner (fedex.com)
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-[#FF6200] text-white px-2 py-0.5 rounded-xs">
                  FedEx Air
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-light mb-2">
                Dispatched via FedEx Priority Express with real-time live tracking directly on <span className="font-semibold text-[#4D148C]">fedex.com</span>.
              </p>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4D148C]">
                Complimentary 2-Day FedEx Express
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {cart.length > 0 && (
        <div className="bg-white p-5 rounded-sm mb-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-[#ede5db]">
          <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-4">{t('cart_summary')}</h3>
          
          <div className="space-y-3 mb-6 border-b border-[#f5f0eb] pb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t('cart_subtotal')}</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center gap-1.5">
                {deliveryMethod === 'in_house' ? 'Maison In-House Courier' : 'FedEx Express (fedex.com)'}
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-green-700">Free</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600 max-w-[220px]">Signature Packaging & Hanger</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">[ Included ] $0.00</span>
            </div>
          </div>

          <div className="flex justify-between items-end mb-1">
            <span className="font-medium text-lg">{t('cart_total')}</span>
            <span className="font-['Cormorant_Garamond'] text-3xl font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="text-[10px] text-gray-400 mb-6">{t('cart_taxes')}</div>

          {/* Checkout Button */}
          <button 
            onClick={() => initiateCheckout('Credit Card / Standard Checkout')} 
            className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 mb-4 hover:bg-black transition-colors shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            {t('cart_checkout_btn')}
          </button>

          {/* Separator */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-[#ede5db]"></div>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400">Or Express Pay With</span>
            <div className="flex-1 h-px bg-[#ede5db]"></div>
          </div>

          {/* US Express Payment Methods: Apple Pay, Cash App, Venmo, Zelle */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
            {/* 1. Apple Pay */}
            <button 
              onClick={() => initiateCheckout('Apple Pay')} 
              className="bg-black hover:bg-gray-900 text-white py-3 px-2 rounded-sm flex items-center justify-center gap-1.5 transition-all shadow-xs"
              title="Pay with Apple Pay"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.67-.99 1.74-.88 2.76 1 .08 1.98-.51 2.6-1.26z"/>
              </svg>
              <span className="text-xs font-semibold tracking-wider">Pay</span>
            </button>

            {/* 2. Cash App */}
            <button 
              onClick={() => initiateCheckout('Cash App Pay')} 
              className="bg-[#00D632] hover:bg-[#00be2c] text-white py-3 px-2 rounded-sm flex items-center justify-center gap-1.5 transition-all shadow-xs"
              title="Pay with Cash App"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.2 14.5v1.5h-2.4v-1.5c-1.8-.3-2.8-1.5-2.8-3h2c0 .8.5 1.4 1.8 1.4.9 0 1.6-.4 1.6-1.1 0-.8-.7-1.1-2-1.4-2.1-.5-3.4-1.2-3.4-2.9 0-1.6 1.2-2.7 2.8-3V5h2.4v1.5c1.5.3 2.5 1.4 2.6 2.7h-2c-.1-.7-.5-1.2-1.5-1.2-.9 0-1.4.5-1.4 1 0 .6.5.9 1.8 1.2 2.3.5 3.6 1.3 3.6 3.1 0 1.7-1.3 2.9-2.7 3.2z"/>
              </svg>
              <span className="text-xs font-bold tracking-tight">Cash App</span>
            </button>

            {/* 3. Venmo */}
            <button 
              onClick={() => initiateCheckout('Venmo')} 
              className="bg-[#008CFF] hover:bg-[#007be0] text-white py-3 px-2 rounded-sm flex items-center justify-center gap-1.5 transition-all shadow-xs"
              title="Pay with Venmo"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 2.5c.8 1.4 1.1 2.9 1.1 4.7 0 5.8-5 13.3-9.1 18.8H5.2L2.5 4.3l6.3-.6 1.7 13.6c1.8-3 4-7.7 4-10.7 0-1.7-.3-2.9-.8-3.8l5.9-.3z"/>
              </svg>
              <span className="text-xs font-bold tracking-tight italic">venmo</span>
            </button>

            {/* 4. Zelle */}
            <button 
              onClick={() => initiateCheckout('Zelle')} 
              className="bg-[#7414CA] hover:bg-[#6510b0] text-white py-3 px-2 rounded-sm flex items-center justify-center gap-1.5 transition-all shadow-xs"
              title="Pay with Zelle"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.8 2.5h-3.6L6 17.5h3.6l1.2-4.5h4.8l-1.2 4.5h3.6L22 2.5h-3.6l-1.2 4.5h-4.8l1.4-4.5zM2 17.5h3.6v4H2v-4z"/>
              </svg>
              <span className="text-xs font-extrabold tracking-tight">zelle</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL: SHIPPING ADDRESS & CONFIRMATION */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#faf8f5] max-w-lg w-full p-6 md:p-8 rounded-sm shadow-2xl border border-[#ede5db] relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowAddressModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
            >
              &times;
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#8b7355] block mb-1">
                Step 2 of 2 &bull; Shipping Destination
              </span>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1a1a1a]">
                Enter Your Delivery Details
              </h2>
              <div className="mt-2 text-xs text-gray-600 flex items-center gap-2">
                <span>Selected Method:</span>
                {deliveryMethod === 'in_house' ? (
                  <span className="font-bold text-[#1a1a1a] bg-[#ede5db] px-2 py-0.5 rounded-xs">
                    🏛️ ÉPURE In-House Courier
                  </span>
                ) : (
                  <span className="font-bold text-[#4D148C] bg-purple-50 px-2 py-0.5 rounded-xs border border-purple-200">
                    FedEx Express (fedex.com)
                  </span>
                )}
              </div>
            </div>

            <form onSubmit={finalizeOrder} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                  Street Address *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 740 Park Avenue, Apt 14B"
                  value={shippingAddress}
                  onChange={e => setShippingAddress(e.target.value)}
                  className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-3 text-xs outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                    City *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="New York"
                    value={shippingCity}
                    onChange={e => setShippingCity(e.target.value)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-3 text-xs outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                    ZIP Code *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="10021"
                    value={shippingZip}
                    onChange={e => setShippingZip(e.target.value)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-3 text-xs outline-none focus:border-[#1a1a1a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                  Special Delivery Instructions (Optional)
                </label>
                <textarea 
                  rows={2}
                  placeholder="e.g. Leave with doorman, ring bell 4B..."
                  value={shippingNotes}
                  onChange={e => setShippingNotes(e.target.value)}
                  className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-xs outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div className="p-3 bg-white border border-[#ede5db] rounded-sm text-xs">
                <div className="flex justify-between font-medium mb-1">
                  <span>Total Due :</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="text-[10px] text-gray-400">
                  Payment Method: <span className="font-semibold text-gray-700">{pendingPaymentMethod}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-[#1a1a1a] text-white py-3.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-black transition-colors"
                >
                  Confirm & Place Order
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="bg-[#ede5db] text-black px-5 py-3.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#d5cdc3]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
