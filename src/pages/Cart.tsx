import { useNavigate } from 'react-router-dom';
import { createOrder } from '../data/orders';
import { useLanguage } from '../i18n';

const Cart = ({ cart, setCart, isLoggedIn }: { cart: any[], setCart: any, isLoggedIn: boolean }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const handleCheckout = (paymentMethodName = 'Credit Card / Standard') => {
    if (!isLoggedIn) {
      navigate('/account');
      return;
    }

    if (cart.length === 0) {
      alert(t('cart_empty'));
      return;
    }

    // Enregistrer la commande dans le registre
    const newOrder = createOrder({
      customerName: 'VIP American Client',
      customerEmail: 'client.vip@epure-paris.com',
      address: '740 Park Ave, New York, NY 10021, USA',
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

    setCart([]);
    alert(`Order ${newOrder.id} successfully initiated via ${paymentMethodName} ($${subtotal.toFixed(2)})! Confirmation sent to your email.`);
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
        <h1 className="font-['Cormorant_Garamond'] text-3xl">{t('cart_title')}</h1>
        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
          [ {cart.length < 10 ? `0${cart.length}` : cart.length} {t('cart_items')} ]
        </span>
      </div>

      {/* US Shipping Banner */}
      <div className="bg-[#ede5db] px-4 py-3 rounded-sm flex items-center gap-3 mb-6">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M7 17v4h14V7h-4"/><path d="M11 12h4"/><path d="M13 10v4"/></svg>
        <div className="flex-1 text-sm">{t('cart_shipping_banner')}</div>
        <div className="text-[10px] font-bold tracking-widest uppercase">{t('cart_shipping_free')}</div>
      </div>

      {/* Cart Items */}
      <div className="space-y-6 mb-8">
        {cart.length === 0 ? (
          <p className="text-gray-500 italic py-8">{t('cart_empty')}</p>
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
                  {item.color} • {t('cart_size')} {item.size}
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center bg-[#f5f0eb] px-3 py-1 rounded-sm gap-4">
                  <button onClick={() => updateQuantity(item.id, item.color, item.size, -1)} className="text-gray-500 text-lg hover:text-black">&minus;</button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.color, item.size, 1)} className="text-gray-500 text-lg hover:text-black">+</button>
                </div>
                <div className="font-medium">${item.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="flex gap-2 mb-8 border border-[#ede5db] p-1 rounded-sm bg-white">
        <div className="flex-1 flex items-center gap-2 px-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          <input type="text" placeholder={t('cart_promo_placeholder')} className="w-full text-xs outline-none uppercase placeholder:normal-case" />
        </div>
        <button onClick={() => alert("This promotional code has expired or is invalid.")} className="bg-[#1a1a1a] text-white px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors">
          {t('cart_apply')}
        </button>
      </div>

      {/* Summary */}
      <div className="bg-white p-5 rounded-sm mb-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-4">{t('cart_summary')}</h3>
        
        <div className="space-y-3 mb-6 border-b border-[#f5f0eb] pb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('cart_subtotal')}</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 flex items-center gap-1">{t('cart_shipping_label')}</span>
            <span className="text-[10px] font-bold tracking-widest uppercase">{t('cart_shipping_free')}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-sm text-gray-600 max-w-[200px]">{t('cart_packaging')}</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{t('cart_included')}</span>
          </div>
        </div>

        <div className="flex justify-between items-end mb-1">
          <span className="font-medium text-lg">{t('cart_total')}</span>
          <span className="font-['Cormorant_Garamond'] text-3xl">${subtotal.toFixed(2)}</span>
        </div>
        <div className="text-[10px] text-gray-400 mb-6">{t('cart_taxes')}</div>

        <button onClick={() => handleCheckout('Standard Checkout')} className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 mb-4 hover:bg-gray-900 transition-colors">
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
            onClick={() => handleCheckout('Apple Pay')} 
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
            onClick={() => handleCheckout('Cash App Pay')} 
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
            onClick={() => handleCheckout('Venmo')} 
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
            onClick={() => handleCheckout('Zelle')} 
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
    </div>
  );
};

export default Cart;
