import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
      setTimeout(() => {
        setEmail('');
        setSent(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#faf8f5] border-t border-[#ede5db] text-[#1a1a1a] pt-20 pb-16">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        {/* Top: Newsletter / Correspondence - Very understated & elegant */}
        <div className="max-w-xl mx-auto text-center mb-24">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8b7355] block mb-3 font-semibold">
            Correspondance
          </span>
          <h3 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-light mb-4 text-[#1a1a1a]">
            Inscrivez-vous à la lettre ÉPURE
          </h3>
          <p className="text-xs text-gray-500 font-light leading-relaxed mb-8 max-w-md mx-auto">
            Nouvelles collections, tirages limités et correspondances de l’atelier.
          </p>

          {sent ? (
            <p className="text-xs text-[#8b7355] font-light tracking-wider py-3 border-b border-[#8b7355]">
              Merci. Votre adresse a été transmise à l'atelier.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse courriel"
                className="w-full bg-transparent border-b border-[#1a1a1a] py-3.5 pr-28 text-xs font-light text-[#1a1a1a] placeholder:text-gray-400 outline-none transition-colors focus:border-[#8b7355]"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-3 text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a1a1a] hover:text-[#8b7355] transition-colors"
              >
                S’inscrire <span>→</span>
              </button>
            </form>
          )}
        </div>

        {/* Middle: 4 Refined Editorial Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 pb-20 border-b border-[#ede5db] text-xs font-light">
          {/* Column 1: Boutique */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-gray-400 mb-6">
              Collections
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link to="/" className="text-gray-700 hover:text-black transition-colors">
                  Nouveautés Hiver
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-700 hover:text-black transition-colors">
                  Manteaux en laine
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-700 hover:text-black transition-colors">
                  Pur Cachemire
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-700 hover:text-black transition-colors">
                  Pantalons & Chemises
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-700 hover:text-black transition-colors">
                  Éditions limitées
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: La Maison */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-gray-400 mb-6">
              La Maison
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link to="/" className="text-gray-700 hover:text-black transition-colors">
                  Notre philosophie
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-700 hover:text-black transition-colors">
                  L'atelier & savoir-faire
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-700 hover:text-black transition-colors">
                  Matières certifiées
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-700 hover:text-black transition-colors">
                  Carnet de style
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Client */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-gray-400 mb-6">
              Conciergerie
            </h4>
            <ul className="space-y-3.5">
              <li>
                <span className="text-gray-700 hover:text-black transition-colors cursor-pointer" onClick={() => alert("Livraison express offerte et retours sous 30 jours.")}>
                  Livraisons & retours
                </span>
              </li>
              <li>
                <span className="text-gray-700 hover:text-black transition-colors cursor-pointer" onClick={() => alert("Guide des tailles disponible sur chaque pièce.")}>
                  Guide des tailles
                </span>
              </li>
              <li>
                <span className="text-gray-700 hover:text-black transition-colors cursor-pointer" onClick={() => alert("Nos recommandations d'entretien pour le cachemire et la laine vierge.")}>
                  Guide d'entretien
                </span>
              </li>
              <li>
                <Link to="/cart" className="text-gray-700 hover:text-black transition-colors">
                  Suivi de commande
                </Link>
              </li>
              <li>
                <span className="text-gray-700 hover:text-black transition-colors cursor-pointer" onClick={() => alert("Service joignable du lundi au vendredi de 10h à 18h.")}>
                  Contact conciergerie
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Salons & Adresses */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-gray-400 mb-6">
              Atelier Privé
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              28 Rue du Faubourg Saint-Honoré<br />
              75008 Paris, France
            </p>
            <p className="text-[11px] text-gray-500 mb-1">
              Sur rendez-vous exclusif
            </p>
            <p className="text-[11px] text-[#8b7355]">
              atelier@epure-paris.com
            </p>
          </div>
        </div>

        {/* Big Signature Brand Wordmark */}
        <div className="py-16 text-center">
          <span className="font-['Cormorant_Garamond'] text-6xl md:text-9xl tracking-[0.25em] text-[#ede5db] select-none block font-light leading-none">
            É P U R E
          </span>
        </div>

        {/* Bottom Legal & Country */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] uppercase text-gray-400 gap-4">
          <div className="flex items-center gap-6">
            <span>France / EUR (€)</span>
            <span>&copy; {new Date().getFullYear()} ÉPURE</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-black transition-colors cursor-pointer">Mentions Légales</span>
            <span className="hover:text-black transition-colors cursor-pointer">Confidentialité</span>
            <span className="hover:text-black transition-colors cursor-pointer">Conditions Générales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
