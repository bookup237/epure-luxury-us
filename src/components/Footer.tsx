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
    <footer className="bg-[#111111] text-white border-t-2 border-[#8b7355] mt-16">
      {/* 1. Bandeau de Réassurance distinct (Fond Anthracite foncé) */}
      <div className="bg-[#181818] border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-sm bg-[#222222] border border-[#333333] flex items-center justify-center flex-shrink-0 text-[#c4b5a4]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ede5db]">Livraison Express Offerte</h4>
                <p className="text-xs text-gray-400 mt-0.5">Expédition 24/48h & suivi en direct</p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-sm bg-[#222222] border border-[#333333] flex items-center justify-center flex-shrink-0 text-[#c4b5a4]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ede5db]">Retours Gratuits</h4>
                <p className="text-xs text-gray-400 mt-0.5">30 jours pour changer d’avis</p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-sm bg-[#222222] border border-[#333333] flex items-center justify-center flex-shrink-0 text-[#c4b5a4]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ede5db]">Paiement 100% Sécurisé</h4>
                <p className="text-xs text-gray-400 mt-0.5">Cryptage SSL & 3D Secure garanti</p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-sm bg-[#222222] border border-[#333333] flex items-center justify-center flex-shrink-0 text-[#c4b5a4]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ede5db]">Atelier & Conciergerie</h4>
                <p className="text-xs text-gray-400 mt-0.5">Conseils sur-mesure par nos stylistes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Corps Principal (Contraste sombre, typographie beige et dorée) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo & Newsletter (Col 1-2) */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-['Cormorant_Garamond'] text-3xl md:text-4xl tracking-widest text-[#ede5db] font-semibold">
                ÉPURE
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#8b7355] border-l border-[#8b7355] pl-3 py-0.5">
                Maison de Confection &bull; Paris
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm mb-6">
              Maison de prêt-à-porter haut de gamme. Chaque pièce est pensée dans la pureté des lignes et façonnée dans des filatures d’exception en Europe.
            </p>

            {/* Newsletter form */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#c4b5a4] mb-2">
                Rejoignez le Cercle Privé
              </h5>
              <p className="text-xs text-gray-400 mb-3">
                Recevez les lancements de capsules et nos invitations exclusives.
              </p>

              {subscribed ? (
                <div className="bg-[#222222] text-[#c4b5a4] text-xs px-3.5 py-2.5 rounded-sm border border-[#8b7355]/50 font-medium">
                  ✓ Merci ! Vous êtes désormais inscrit à nos correspondances privées.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse courriel"
                    className="flex-1 bg-[#1a1a1a] border border-[#333333] px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 outline-none rounded-sm focus:border-[#8b7355] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#c4b5a4] hover:bg-[#ede5db] text-[#111111] px-5 py-2.5 text-xs font-bold tracking-wider uppercase rounded-sm transition-colors whitespace-nowrap"
                  >
                    S'inscrire
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Boutique Navigation (Col 3) */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-5">
              Vestiaire
            </h5>
            <ul className="space-y-3 text-xs text-gray-300">
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-colors">Toute la collection</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-colors">Manteaux en laine vierge</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-colors">Pièces en pur cachemire</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-colors">Pantalons & Chemises</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-colors">Éditions limitées atelier</Link>
              </li>
            </ul>
          </div>

          {/* Service Client (Col 4) */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-5">
              Service Client
            </h5>
            <ul className="space-y-3 text-xs text-gray-300">
              <li>
                <span className="hover:text-white hover:underline transition-colors cursor-pointer" onClick={() => alert("Expédition express sécurisée avec remise contre signature.")}>
                  Modalités de livraison
                </span>
              </li>
              <li>
                <span className="hover:text-white hover:underline transition-colors cursor-pointer" onClick={() => alert("Retours gratuits et remboursement sous 7 jours ouvrés.")}>
                  Retours & Remboursements
                </span>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white hover:underline transition-colors">
                  Consulter mon panier
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white hover:underline transition-colors">
                  Mon espace client
                </Link>
              </li>
              <li>
                <span className="hover:text-white hover:underline transition-colors cursor-pointer" onClick={() => alert("Guide des tailles disponible sur chaque pièce.")}>
                  Guide des tailles atelier
                </span>
              </li>
            </ul>
          </div>

          {/* Contact (Col 5) */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-5">
              Maison & Salons
            </h5>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2.5">
                <span className="text-[#8b7355] mt-0.5">📍</span>
                <span>28 Rue du Faubourg Saint-Honoré, 75008 Paris</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#8b7355]">📞</span>
                <span>+33 (0)1 42 68 50 00</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#8b7355]">✉️</span>
                <span>concierge@epure-paris.com</span>
              </li>
              <li className="pt-2 text-[11px] text-gray-500">
                Accueil privé du lundi au vendredi sur rendez-vous.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bandeau Inférieur de Clôture */}
      <div className="border-t border-[#222222] bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} Maison ÉPURE Paris. Tous droits réservés.
          </div>

          {/* Badges de paiement sécurisé */}
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Paiements Sécurisés :</span>
            <span className="bg-[#1f1f1f] border border-[#333333] px-2 py-0.5 rounded text-[10px] font-bold text-gray-200">CB</span>
            <span className="bg-[#1f1f1f] border border-[#333333] px-2 py-0.5 rounded text-[10px] font-bold text-gray-200">VISA</span>
            <span className="bg-[#1f1f1f] border border-[#333333] px-2 py-0.5 rounded text-[10px] font-bold text-gray-200">MASTERCARD</span>
            <span className="bg-[#1f1f1f] border border-[#333333] px-2 py-0.5 rounded text-[10px] font-bold text-gray-200">APPLE PAY</span>
          </div>

          <div className="flex gap-6 text-xs">
            <span className="hover:text-white hover:underline cursor-pointer">Mentions Légales</span>
            <span className="hover:text-white hover:underline cursor-pointer">Confidentialité</span>
            <span className="hover:text-white hover:underline cursor-pointer">Conditions Générales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
