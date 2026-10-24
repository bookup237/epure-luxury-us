import React from 'react';

const Atelier = () => {
  return (
    <div className="px-4 py-6 pb-24 md:py-10 md:max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-500">Boutique en direct</span>
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl">Atelier ÉPURE</h1>
          <p className="text-sm text-gray-500">Registre d'activité & pilotage des pièces</p>
        </div>
        <div className="flex bg-[#ede5db] rounded-sm p-1">
          <button className="bg-white px-3 py-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-sm shadow-sm">Aujourd'hui</button>
          <button className="px-3 py-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-500">7 Jours</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-[#ede5db] p-4 rounded-sm relative overflow-hidden">
          <svg className="absolute -right-4 -bottom-4 text-[#c4b5a4] opacity-20 w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-600">Recettes</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
          </div>
          <div className="font-['Cormorant_Garamond'] text-3xl mb-1">4 820 €</div>
          <div className="text-xs text-green-600 font-medium flex items-center gap-1">
            ↗ +18% vs S-1
          </div>
        </div>

        <div className="bg-[#ede5db] p-4 rounded-sm relative overflow-hidden">
          <svg className="absolute -right-4 -bottom-4 text-[#c4b5a4] opacity-20 w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-600">Commandes</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3m18 0v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.5 4-8.5-4"/><path d="M12 12v9"/></svg>
          </div>
          <div className="font-['Cormorant_Garamond'] text-3xl mb-1">14</div>
          <div className="text-xs text-red-600 font-medium">3 urgentes</div>
        </div>

        <div className="bg-[#ede5db] p-4 rounded-sm relative overflow-hidden">
          <svg className="absolute -right-4 -bottom-4 text-[#c4b5a4] opacity-20 w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-600">Panier Moyen</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <div className="font-['Cormorant_Garamond'] text-3xl mb-1">344 €</div>
          <div className="text-xs text-gray-500">2.4 articles / cmd</div>
        </div>

        <div className="bg-[#ede5db] p-4 rounded-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-600 leading-tight">Audience<br/>Active</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M12 20v-8m0 0V4m0 8h8m-8 0H4"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-['Cormorant_Garamond'] text-3xl">182</span>
            <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500">En direct</span>
          </div>
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full inline-block"></span> 6 en caisse
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-5 rounded-sm shadow-sm border border-[#f5f0eb] mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Fréquentation & Ventes</div>
            <h2 className="text-xl font-medium text-gray-800">Rythme horaire</h2>
          </div>
          <div className="bg-[#ede5db] px-2 py-1 text-[9px] font-bold tracking-widest uppercase rounded-sm text-gray-700">Pic: 14h - 17h</div>
        </div>
        
        <div className="h-24 relative mb-4">
          <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <path d="M0,80 Q100,60 200,40 T400,20" fill="none" stroke="#1a1a1a" strokeWidth="2" />
            <path d="M0,80 Q100,60 200,40 T400,20 L400,100 L0,100 Z" fill="url(#gradient)" />
            <circle cx="200" cy="40" r="4" fill="#1a1a1a" />
            <circle cx="400" cy="20" r="4" fill="#1a1a1a" />
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-medium">
          <span>09:00</span>
          <span>12:00</span>
          <span>15:00</span>
          <span>18:00</span>
          <span>21:00</span>
        </div>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-8">
        {/* Orders */}
        <div className="mb-10 md:mb-0">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-medium text-gray-800">Expéditions prioritaires</h2>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Toutes (14)</span>
          </div>

          <div className="space-y-3">
            {/* Order 1 */}
            <div className="bg-[#f5f0eb] p-4 rounded-sm flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase">#EP-4091</span>
                    <span className="bg-[#d5cdc3] text-gray-700 px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase rounded-sm">Prêt transporteur</span>
                  </div>
                  <div className="font-medium">Éléonore de Montalembert</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Manteau Sable (T.36) • Paris, FR</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-lg">890 €</div>
                  <div className="text-[9px] font-bold tracking-widest uppercase text-gray-500 mt-1">DHL Express</div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#ede5db]">
                <div className="text-[11px] text-gray-500 flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Commandé il y a 42 min
                </div>
                <button className="bg-[#1a1a1a] text-white px-4 py-1.5 text-[9px] font-bold tracking-widest uppercase rounded-sm">Bordereau</button>
              </div>
            </div>

            {/* Order 2 */}
            <div className="bg-[#f5f0eb] p-4 rounded-sm flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase">#EP-4090</span>
                    <span className="bg-[#1a1a1a] text-white px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase rounded-sm">Payé • À expédier</span>
                  </div>
                  <div className="font-medium">Julien Vaneau</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Pantalon Plissé Lin (T.40), Chemise Soie (T.M)</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-lg">620 €</div>
                  <div className="text-[9px] font-bold tracking-widest uppercase text-gray-500 mt-1">Standard</div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#ede5db]">
                <div className="text-[11px] text-gray-500 flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Commandé il y a 2h
                </div>
                <button className="bg-white border border-[#1a1a1a] text-[#1a1a1a] px-4 py-1.5 text-[9px] font-bold tracking-widest uppercase rounded-sm">Préparer</button>
              </div>
            </div>

            {/* Order 3 */}
            <div className="bg-[#f5f0eb] p-4 rounded-sm flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase">#EP-4089</span>
                    <span className="bg-white border border-[#c4b5a4] text-gray-600 px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase rounded-sm">En vérification</span>
                  </div>
                  <div className="font-medium">Clara Rossi</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Écharpe Laine Vierge Brut • Genève, CH</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-lg">240 €</div>
                  <div className="text-[9px] font-bold tracking-widest uppercase text-gray-500 mt-1">Colissimo Int.</div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#ede5db]">
                <div className="text-[11px] text-gray-500 flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Commandé il y a 4h
                </div>
                <button className="bg-white text-[#1a1a1a] px-4 py-1.5 text-[9px] font-bold tracking-widest uppercase rounded-sm shadow-sm">Détails</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {/* Vigilance Stocks */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d9534f" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Vigilance Stocks & Tailles
              </h2>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#d9534f] text-right">2 Alertes<br/>Atelier</span>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-gray-200 rounded-sm flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=100&h=100&fit=crop" className="w-full h-full object-cover rounded-sm" alt="Manteau Sable" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">Manteau Sable Double-Face</h3>
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[#d9534f]">2 Ex. Restants</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 mb-2">Taille S • Tissage Biella Italie</p>
                  <div className="w-full bg-[#ede5db] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#d9534f] h-full w-[15%]"></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-gray-200 rounded-sm flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=100&h=100&fit=crop" className="w-full h-full object-cover rounded-sm" alt="Pull Côtelé" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">Pull Côtelé Écru Mérinos</h3>
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[#f0ad4e]">1 Ex. (T.M)</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 mb-2">Toutes tailles • Réassort filature en cours</p>
                  <div className="w-full bg-[#ede5db] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#f0ad4e] h-full w-[8%]"></div>
                  </div>
                </div>
              </div>

              <button className="w-full border border-[#ede5db] bg-white text-[#1a1a1a] py-3 text-[9px] font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 hover:bg-[#faf8f5] transition-colors mt-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                Commander un réassort auprès du façonnier
              </button>
            </div>
          </div>

          {/* Actions Rapides */}
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Gestion & Actions Rapides</h2>
            
            <button className="w-full bg-black text-white p-4 rounded-sm flex items-center gap-4 mb-3 text-left hover:bg-gray-900 transition-colors">
              <div className="bg-white/10 p-2 rounded-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">Nouveau vêtement ou capsule</div>
                <div className="text-[11px] text-gray-400 mt-0.5">Fiche produit, photos lookbook & composition</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="bg-[#f5f0eb] p-4 rounded-sm text-left hover:bg-[#ede5db] transition-colors">
                <svg className="mb-3 text-gray-600" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                <div className="font-medium text-sm text-gray-800">Codes privilège</div>
                <div className="text-[11px] text-gray-500 mt-1">3 remises actives</div>
              </button>
              
              <button className="bg-[#f5f0eb] p-4 rounded-sm text-left hover:bg-[#ede5db] transition-colors">
                <svg className="mb-3 text-gray-600" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <div className="font-medium text-sm text-gray-800">Export comptable</div>
                <div className="text-[11px] text-gray-500 mt-1">Factures PDF / CSV</div>
              </button>
            </div>

            <div className="bg-[#f5f0eb] p-4 rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
                <div className="text-[11px] text-gray-500">
                  Dernière synchronisation inventaire<br />
                  <span className="text-gray-800 font-medium">16:48</span>
                </div>
              </div>
              <button className="text-[9px] font-bold tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors">
                Rafraîchir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Atelier;
