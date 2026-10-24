import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#141414] text-[#ede5db] border-t border-[#262422] mt-16">
      {/* Brand & Newsletter Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12 border-b border-[#262422]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-['Cormorant_Garamond'] text-3xl md:text-4xl tracking-widest text-[#f5f0eb] uppercase font-light">
                ÉPURE
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#8b7355] border-l border-[#8b7355] pl-3 py-0.5">
                Maison Fondée à Paris
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed max-w-md">
              Des silhouettes architecturales, taillées dans des matières pures et sans compromis. L'art du vestiaire silencieux et intemporel.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-[#1c1b19] p-6 md:p-8 rounded-sm border border-[#2e2a26]">
            <div className="text-[10px] font-bold tracking-widest uppercase text-[#c4b5a4] mb-1">
              Édition Privée &bull; Le Cercle ÉPURE
            </div>
            <h4 className="font-['Cormorant_Garamond'] text-2xl text-white mb-2">
              Recevez les invitations exclusives et avant-premières
            </h4>
            <p className="text-xs text-gray-400 mb-4">
              Une correspondance confidentielle par mois. Jamais de sollicitation superflue.
            </p>

            {subscribed ? (
              <div className="bg-[#24221f] text-[#c4b5a4] p-3 text-xs tracking-wider border border-[#8b7355]/40 rounded-sm">
                ✓ Bienvenue dans Le Cercle ÉPURE. Votre invitation privée vous a été adressée.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Votre adresse email personnelle"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-[#141414] border border-[#38332d] focus:border-[#c4b5a4] px-4 py-3 text-xs text-white placeholder:text-gray-500 outline-none rounded-sm transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#ede5db] text-[#141414] hover:bg-white px-6 py-3 text-[10px] font-bold tracking-widest uppercase rounded-sm transition-colors whitespace-nowrap"
                >
                  S'inscrire
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Col 1 : Maison */}
          <div>
            <h5 className="text-[10px] font-bold tracking-widest uppercase text-[#8b7355] mb-4">
              La Maison
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Le Manifeste</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Filatures & Artisans</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Engagements Durables</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Le Carnet de Style</Link>
              </li>
            </ul>
          </div>

          {/* Col 2 : Collections */}
          <div>
            <h5 className="text-[10px] font-bold tracking-widest uppercase text-[#8b7355] mb-4">
              Vestiaire
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Manteaux en Laine</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Cachemire Double-Face</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Pantalons & Lignes Pures</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Pièces Signatures</Link>
              </li>
            </ul>
          </div>

          {/* Col 3 : Conciergerie */}
          <div>
            <h5 className="text-[10px] font-bold tracking-widest uppercase text-[#8b7355] mb-4">
              Conciergerie
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => alert("Livraison express offerte avec écrin atelier pour toute commande.")}>
                  Livraisons & Retours Offerts
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => alert("Guide des tailles disponible sur chaque fiche vêtement.")}>
                  Guide des Tailles Atelier
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => alert("Nos pièces bénéficient d'une garantie et d'un service d'entretien dédié.")}>
                  Soin & Entretien des Fibres
                </span>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Suivi de Commande</Link>
              </li>
            </ul>
          </div>

          {/* Col 4 : Salons & Contact */}
          <div>
            <h5 className="text-[10px] font-bold tracking-widest uppercase text-[#8b7355] mb-4">
              Salons Privés
            </h5>
            <div className="space-y-2.5 text-xs text-gray-400 font-light">
              <p className="text-white font-medium">Paris &bull; 8e Arrondissement</p>
              <p>28 Rue du Faubourg Saint-Honoré</p>
              <p className="text-[#c4b5a4] pt-1">Sur rendez-vous uniquement</p>
              <p className="pt-2 text-[11px] text-gray-500">concierge@epure-paris.com</p>
            </div>
          </div>
        </div>

        {/* Value Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10 mt-10 border-t border-b border-[#262422] text-center">
          <div className="p-3">
            <div className="text-[#8b7355] text-lg mb-1">▨</div>
            <div className="text-[9px] font-bold tracking-widest uppercase text-white">Matières 100% Naturelles</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Laine vierge & pur cachemire</div>
          </div>
          <div className="p-3">
            <div className="text-[#8b7355] text-lg mb-1">⚐</div>
            <div className="text-[9px] font-bold tracking-widest uppercase text-white">Façonné en Europe</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Ateliers historiques en Italie</div>
          </div>
          <div className="p-3">
            <div className="text-[#8b7355] text-lg mb-1">◈</div>
            <div className="text-[9px] font-bold tracking-widest uppercase text-white">Écrin Signature Offert</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Housse de protection atelier</div>
          </div>
          <div className="p-3">
            <div className="text-[#8b7355] text-lg mb-1">∞</div>
            <div className="text-[9px] font-bold tracking-widest uppercase text-white">Garantie & Réparation</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Pièces conçues pour durer</div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-medium tracking-widest uppercase text-gray-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} MAISON ÉPURE PARIS &mdash; TOUS DROITS RÉSERVÉS
          </div>
          <div className="flex gap-6">
            <span className="hover:text-gray-300 cursor-pointer">Mentions Légales</span>
            <span className="hover:text-gray-300 cursor-pointer">Confidentialité</span>
            <span className="hover:text-gray-300 cursor-pointer">Conditions Générales</span>
            <span className="hover:text-gray-300 cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
