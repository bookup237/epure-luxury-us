import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#ede5db] text-[#1a1a1a] border-t border-[#d8cdbf] mt-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 items-start mb-16">
          
          {/* Column 1: Brand & Heritage */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-['Cormorant_Garamond'] text-3xl tracking-[0.3em] font-semibold text-[#1a1a1a] uppercase">
                É P U R E
              </span>
              <span className="block text-[9px] font-sans tracking-[0.35em] uppercase text-gray-500 font-medium">
                NEW YORK &bull; PARIS
              </span>
            </Link>
            
            <p className="text-xs text-[#5c5449] font-light leading-relaxed max-w-sm">
              Maison de haute confection dedicated to quiet luxury. Sculpted silhouettes and pure noble fibers sourced from European heritage mills.
            </p>

            <div className="pt-2 text-xs text-[#4a4339] space-y-1.5">
              <p className="font-semibold text-[#1a1a1a]">Manhattan Flagship Residence:</p>
              <p>740 Madison Avenue, New York, NY 10065</p>
              <p>
                <a href="tel:+17822020702" className="text-[#1a1a1a] font-semibold hover:text-[#8b7355] transition-colors">
                  Concierge: +1 (782) 202-0702
                </a>
              </p>
              <p>
                <a href="mailto:concierge@epureluxury.com" className="text-[#8b7355] hover:underline">
                  concierge@epureluxury.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b7355] mb-5">
              Collections
            </h4>
            <ul className="space-y-3 text-xs text-[#4a4339]">
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">Virgin Wool Overcoats</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">Pure 4-Ply Cashmere</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">Pleated Trousers</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">Tailored Blazers</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-black hover:underline transition-colors">Shopping Bag</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Services (US Standard) */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b7355] mb-5">
              Client Care (US)
            </h4>
            <ul className="space-y-3 text-xs text-[#4a4339]">
              <li className="flex items-center gap-2">
                <span className="text-[#8b7355] font-bold">&#10003;</span>
                <span>Complimentary 2-Day FedEx</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#8b7355] font-bold">&#10003;</span>
                <span>30-Day Free US Returns</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#8b7355] font-bold">&#10003;</span>
                <span>Signature Archival Packaging</span>
              </li>
              <li>
                <a href="mailto:concierge@epureluxury.com?subject=FedEx%20Tracking%20Assistance" className="hover:text-black hover:underline transition-colors">
                  FedEx Shipment Tracking
                </a>
              </li>
              <li>
                <Link to="/account" className="hover:text-black hover:underline transition-colors">
                  VIP Client Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: The Maison */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b7355] mb-5">
              The Maison
            </h4>
            <ul className="space-y-3 text-xs text-[#4a4339]">
              <li>
                <Link to="/discover" className="hover:text-black hover:underline transition-colors">
                  Our Heritage & Mills
                </Link>
              </li>
              <li>
                <Link to="/discover" className="hover:text-black hover:underline transition-colors">
                  Biella & Scottish Wool
                </Link>
              </li>
              <li>
                <a href="mailto:concierge@epureluxury.com?subject=Madison%20Avenue%20Private%20Appointment" className="hover:text-black hover:underline transition-colors">
                  Book Madison Ave Salon
                </a>
              </li>
              <li>
                <Link to="/atelier" className="text-gray-400 hover:text-black transition-colors">
                  Atelier Administration
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & US Payment Badges */}
        <div className="pt-8 border-t border-[#d8cdbf] flex flex-col lg:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-[#6e6456] gap-4">
          <div>
            &copy; {new Date().getFullYear()} ÉPURE NEW YORK LLC &bull; All Rights Reserved. Member of the American Luxury Guild.
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold mr-1">
              Accepted US Payment Methods:
            </span>

            {/* Apple Pay */}
            <span className="bg-black text-white px-2.5 py-1 rounded text-[9px] font-bold flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.67-.99 1.74-.88 2.76 1 .08 1.98-.51 2.6-1.26z"/>
              </svg>
              Pay
            </span>

            {/* American Express */}
            <span className="bg-[#007AC1] text-white px-2 py-1 rounded text-[9px] font-bold">
              AMEX
            </span>

            {/* Visa */}
            <span className="bg-[#1A1F71] text-white px-2.5 py-1 rounded text-[9px] font-bold tracking-wider">
              VISA
            </span>

            {/* Mastercard */}
            <span className="bg-[#EB001B] text-white px-2 py-1 rounded text-[9px] font-bold">
              MC
            </span>

            {/* Cash App */}
            <span className="bg-[#00D632] text-white px-2.5 py-1 rounded text-[9px] font-bold flex items-center gap-0.5">
              $ Cash App
            </span>

            {/* Venmo */}
            <span className="bg-[#008CFF] text-white px-2.5 py-1 rounded text-[9px] font-bold italic">
              venmo
            </span>

            {/* Zelle */}
            <span className="bg-[#7414CA] text-white px-2.5 py-1 rounded text-[9px] font-extrabold tracking-tight">
              zelle
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
