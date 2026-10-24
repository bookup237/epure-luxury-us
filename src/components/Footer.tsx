import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white border-t border-[#262626] mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          
          {/* 1. Identité de la Marque */}
          <div className="md:col-span-1">
            <h3 className="font-['Cormorant_Garamond'] text-2xl tracking-[0.2em] font-light text-[#ede5db] uppercase mb-2">
              ÉPURE
            </h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Maison de confection haut de gamme à Paris. Lignes épurées et matières nobles façonnées en Europe.
            </p>
          </div>

          {/* 2. Navigation Essentielle */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8b7355] mb-4">
              Boutique
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Tous les vêtements</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Manteaux & Vestes</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Pur Cachemire</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Mon Panier</Link>
              </li>
            </ul>
          </div>

          {/* 3. Engagements Majeurs */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8b7355] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li className="flex items-center gap-2">
                <span className="text-[#8b7355]">&#10003;</span>
                <span>Livraison express offerte</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#8b7355]">&#10003;</span>
                <span>Retours gratuits sous 30 jours</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#8b7355]">&#10003;</span>
                <span>Paiement 100% sécurisé (SSL)</span>
              </li>
            </ul>
          </div>

          {/* 4. Contact Direct */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8b7355] mb-4">
              Contact
            </h4>
            <div className="space-y-2 text-xs text-gray-300 font-light">
              <p>28 Rue du Faubourg Saint-Honoré, 75008 Paris</p>
              <p className="text-white font-medium">+33 (0)1 42 68 50 00</p>
              <p className="text-[#c4b5a4]">contact@epure-paris.com</p>
            </div>
          </div>

        </div>

        {/* Ligne inférieure : Copyright & Paiements */}
        <div className="pt-10 mt-10 border-t border-[#222222] flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} ÉPURE Paris. Tous droits réservés.
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#1c1c1c] border border-[#2d2d2d] px-2 py-0.5 rounded text-[9px] font-bold text-gray-300">CB</span>
            <span className="bg-[#1c1c1c] border border-[#2d2d2d] px-2 py-0.5 rounded text-[9px] font-bold text-gray-300">VISA</span>
            <span className="bg-[#1c1c1c] border border-[#2d2d2d] px-2 py-0.5 rounded text-[9px] font-bold text-gray-300">MASTERCARD</span>
            <span className="bg-[#1c1c1c] border border-[#2d2d2d] px-2 py-0.5 rounded text-[9px] font-bold text-gray-300">APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
