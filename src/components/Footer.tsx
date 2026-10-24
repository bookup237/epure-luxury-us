import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-white border-t border-[#ede5db] text-[#1a1a1a]">
      {/* 1. Services / Reassurance Bar (E-commerce standard haut de gamme) */}
      <div className="border-b border-[#ede5db] bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-[#ede5db] flex items-center justify-center flex-shrink-0 text-[#1a1a1a]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1a]">Livraison Offerte</h4>
                <p className="text-xs text-gray-500 mt-0.5">En France métropolitaine sous 24-48h</p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-[#ede5db] flex items-center justify-center flex-shrink-0 text-[#1a1a1a]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1a]">Retours Gratuits</h4>
                <p className="text-xs text-gray-500 mt-0.5">Sous 30 jours à compter de la réception</p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-[#ede5db] flex items-center justify-center flex-shrink-0 text-[#1a1a1a]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1a]">Paiement 100% Sécurisé</h4>
                <p className="text-xs text-gray-500 mt-0.5">Cartes bancaires, Apple Pay, Google Pay</p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-[#ede5db] flex items-center justify-center flex-shrink-0 text-[#1a1a1a]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1a]">Conciergerie Dédiée</h4>
                <p className="text-xs text-gray-500 mt-0.5">Conseillers disponibles du lun. au ven.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation & Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Presentation (Col 1-2) */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <Link to="/" className="inline-block mb-4">
              <img src="/logo.jpg" alt="ÉPURE Logo" className="h-10 object-contain mix-blend-multiply" />
            </Link>
            <p className="text-xs text-gray-600 leading-relaxed max-w-sm mb-6">
              Maison de confection haut de gamme basée à Paris. Nous créons des pièces intemporelles alliant matières nobles, coupes précises et finitions d'atelier d'exception.
            </p>

            {/* Newsletter */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-2">
                Newsletter
              </h5>
              <p className="text-xs text-gray-500 mb-3">
                Restez informé de nos lancements et réassorts en avant-première.
              </p>

              {subscribed ? (
                <div className="bg-[#ede5db] text-[#1a1a1a] text-xs px-3.5 py-2.5 rounded-sm font-medium">
                  ✓ Merci pour votre inscription !
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="flex-1 bg-[#faf8f5] border border-[#ede5db] px-3.5 py-2.5 text-xs text-[#1a1a1a] placeholder:text-gray-400 outline-none rounded-sm focus:border-[#1a1a1a] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#1a1a1a] text-white hover:bg-black px-4 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-sm transition-colors whitespace-nowrap"
                  >
                    Valider
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Boutique Navigation (Col 3) */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-4">
              Boutique
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">Tous les produits</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">Manteaux en laine</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">Cachemire</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">Pantalons</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">Nouveautés 2025</Link>
              </li>
            </ul>
          </div>

          {/* Service Client (Col 4) */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-4">
              Service Client
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <span className="hover:text-black hover:underline transition-colors cursor-pointer" onClick={() => alert("Livraison suivie assurée par DHL et Colissimo.")}>
                  Expédition & Livraison
                </span>
              </li>
              <li>
                <span className="hover:text-black hover:underline transition-colors cursor-pointer" onClick={() => alert("Retours gratuits et remboursement sous 7 jours ouvrés.")}>
                  Échanges et Retours
                </span>
              </li>
              <li>
                <Link to="/cart" className="hover:text-black hover:underline transition-colors">
                  Mon Panier
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-black hover:underline transition-colors">
                  Espace Client / Compte
                </Link>
              </li>
              <li>
                <span className="hover:text-black hover:underline transition-colors cursor-pointer" onClick={() => alert("Consultez notre guide d'entretien sur chaque fiche vêtement.")}>
                  Guide d'entretien
                </span>
              </li>
            </ul>
          </div>

          {/* Coordonnées / Contact (Col 5) */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-4">
              Nous Contacter
            </h5>
            <ul className="space-y-3 text-xs text-gray-600">
              <li className="flex items-start gap-2.5">
                <span className="text-gray-400 mt-0.5">📍</span>
                <span>28 Rue du Faubourg Saint-Honoré, 75008 Paris</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-gray-400">📞</span>
                <span>+33 (0)1 42 68 50 00</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-gray-400">✉️</span>
                <span>contact@epure-paris.com</span>
              </li>
              <li className="pt-1 text-[11px] text-gray-400">
                Du lundi au vendredi : 09h00 &ndash; 18h00
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar: Mentions, Moyens de paiement & Copyright */}
      <div className="border-t border-[#ede5db] bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} ÉPURE Paris. Tous droits réservés.
          </div>

          {/* Badges de paiement sécurisé professionnels */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Paiements :</span>
            <span className="bg-white border border-[#ede5db] px-2 py-0.5 rounded text-[10px] font-bold text-gray-700">CB</span>
            <span className="bg-white border border-[#ede5db] px-2 py-0.5 rounded text-[10px] font-bold text-gray-700">VISA</span>
            <span className="bg-white border border-[#ede5db] px-2 py-0.5 rounded text-[10px] font-bold text-gray-700">MASTERCARD</span>
            <span className="bg-white border border-[#ede5db] px-2 py-0.5 rounded text-[10px] font-bold text-gray-700">APPLE PAY</span>
          </div>

          <div className="flex gap-6 text-xs">
            <span className="hover:text-black hover:underline cursor-pointer">Mentions légales</span>
            <span className="hover:text-black hover:underline cursor-pointer">Confidentialité</span>
            <span className="hover:text-black hover:underline cursor-pointer">CGV</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
