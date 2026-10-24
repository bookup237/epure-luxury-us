import React, { useState, useEffect } from 'react';
import { getStoredOrders, saveOrders, Order } from '../data/orders';

const Atelier = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'ready'>('all');
  const [activeRange, setActiveRange] = useState<'today' | '7days'>('today');

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Payé • À expédier' || o.status === 'En préparation');

  const filteredOrders = orders.filter(order => {
    if (filter === 'pending') return order.status === 'Payé • À expédier' || order.status === 'En préparation';
    if (filter === 'ready') return order.status === 'Prêt transporteur' || order.status === 'Expédié';
    return true;
  });

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    saveOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleAddSampleOrder = () => {
    const fakeId = `#EP-${Math.floor(4100 + Math.random() * 900)}`;
    const newSample: Order = {
      id: fakeId,
      customerName: 'Victoire de Castellane',
      customerEmail: 'victoire@example.com',
      address: 'Bordeaux, FR',
      items: [
        {
          id: '2',
          name: 'Pull Col Roulé Cachemire',
          color: 'NOIR',
          size: 'M',
          price: 340,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&h=200&fit=crop'
        }
      ],
      total: 340,
      status: 'Payé • À expédier',
      carrier: 'DHL Express',
      createdAt: 'À l’instant'
    };
    const updated = [newSample, ...orders];
    setOrders(updated);
    saveOrders(updated);
  };

  return (
    <div className="px-4 py-6 pb-24 md:py-10 md:max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-500">Boutique en direct • Atelier Admin</span>
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl">Atelier ÉPURE &mdash; Gestion des Commandes</h1>
          <p className="text-sm text-gray-500">Réception en temps réel, bordereaux transporteurs et pilotage de confection</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleAddSampleOrder}
            className="bg-[#1a1a1a] text-white px-3.5 py-2 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          >
            <span>+</span> Simuler une commande
          </button>
          <div className="flex bg-[#ede5db] rounded-sm p-1">
            <button 
              onClick={() => setActiveRange('today')}
              className={`${activeRange === 'today' ? 'bg-white shadow-sm' : 'text-gray-500'} px-3 py-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-sm transition-all`}
            >
              Aujourd'hui
            </button>
            <button 
              onClick={() => setActiveRange('7days')}
              className={`${activeRange === '7days' ? 'bg-white shadow-sm' : 'text-gray-500'} px-3 py-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-sm transition-all`}
            >
              7 Jours
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-[#ede5db] p-4 rounded-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-600">Recettes Reçues</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
          </div>
          <div className="font-['Cormorant_Garamond'] text-3xl mb-1">{totalRevenue.toLocaleString('fr-FR')} €</div>
          <div className="text-xs text-green-700 font-medium flex items-center gap-1">
            ↗ En direct du panier
          </div>
        </div>

        <div className="bg-[#ede5db] p-4 rounded-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-600">Commandes Totales</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3m18 0v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.5 4-8.5-4"/><path d="M12 12v9"/></svg>
          </div>
          <div className="font-['Cormorant_Garamond'] text-3xl mb-1">{orders.length}</div>
          <div className="text-xs text-red-600 font-medium">{pendingOrders.length} à préparer</div>
        </div>

        <div className="bg-[#ede5db] p-4 rounded-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-600">Panier Moyen</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <div className="font-['Cormorant_Garamond'] text-3xl mb-1">
            {orders.length ? Math.round(totalRevenue / orders.length) : 0} €
          </div>
          <div className="text-xs text-gray-500">Clients vérifiés</div>
        </div>

        <div className="bg-[#ede5db] p-4 rounded-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-600 leading-tight">Flux Atelier</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><circle cx="12" cy="12" r="3"/><path d="M12 20v-8m0 0V4m0 8h8m-8 0H4"/></svg>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-['Cormorant_Garamond'] text-3xl">100%</span>
            <span className="text-[9px] font-bold tracking-widest uppercase text-green-700">Synchro</span>
          </div>
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full inline-block"></span> LocalStorage actif
          </div>
        </div>
      </div>

      {/* Main Content: Orders List + Live Detail Modal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Orders Column (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-[#ede5db]">
            <div>
              <h2 className="text-lg font-medium text-gray-800">Commandes Reçues des Clients</h2>
              <p className="text-xs text-gray-500">Toute commande validée au panier s'inscrit immédiatement ici.</p>
            </div>
            <div className="flex gap-1 bg-[#ede5db] p-0.5 rounded-sm text-[10px] font-bold uppercase tracking-widest">
              <button 
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-sm ${filter === 'all' ? 'bg-white shadow-xs text-black' : 'text-gray-500'}`}
              >
                Toutes ({orders.length})
              </button>
              <button 
                onClick={() => setFilter('pending')}
                className={`px-2.5 py-1 rounded-sm ${filter === 'pending' ? 'bg-white shadow-xs text-black' : 'text-gray-500'}`}
              >
                À Traiter ({pendingOrders.length})
              </button>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-sm border border-[#ede5db] text-gray-400 italic">
              Aucune commande dans cette section pour le moment.
            </div>
          ) : (
            filteredOrders.map(order => (
              <div 
                key={order.id}
                className="bg-white border border-[#ede5db] p-5 rounded-sm hover:shadow-md transition-shadow flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold tracking-widest uppercase">{order.id}</span>
                      <span className={`px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase rounded-sm ${
                        order.status === 'Payé • À expédier' 
                          ? 'bg-[#1a1a1a] text-white' 
                          : order.status === 'En préparation' 
                          ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="font-medium text-base text-[#1a1a1a]">{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.customerEmail} • {order.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-['Cormorant_Garamond'] text-2xl font-bold">{order.total} €</div>
                    <div className="text-[9px] font-bold tracking-widest uppercase text-gray-500 mt-1">{order.carrier}</div>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="bg-[#faf8f5] p-3 rounded-sm space-y-2">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Articles commandés :</div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img src={item.image} alt={item.name} className="w-8 h-10 object-cover rounded-xs" />
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 ml-1">({item.color} • T.{item.size})</span>
                        </div>
                      </div>
                      <div className="font-medium">Qté: {item.quantity} &times; {item.price} €</div>
                    </div>
                  ))}
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap justify-between items-center pt-3 border-t border-[#ede5db] gap-2">
                  <div className="text-[11px] text-gray-400 flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {order.createdAt}
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'Payé • À expédier' && (
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'En préparation')}
                        className="bg-white border border-[#1a1a1a] text-[#1a1a1a] px-3.5 py-1.5 text-[9px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#1a1a1a] hover:text-white transition-colors"
                      >
                        Passer en Confection
                      </button>
                    )}
                    {order.status === 'En préparation' && (
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'Prêt transporteur')}
                        className="bg-amber-600 text-white px-3.5 py-1.5 text-[9px] font-bold tracking-widest uppercase rounded-sm hover:bg-amber-700 transition-colors"
                      >
                        Prêt pour expédition
                      </button>
                    )}
                    {order.status === 'Prêt transporteur' && (
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'Expédié')}
                        className="bg-green-700 text-white px-3.5 py-1.5 text-[9px] font-bold tracking-widest uppercase rounded-sm hover:bg-green-800 transition-colors"
                      >
                        Marquer Expédié
                      </button>
                    )}
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="bg-[#1a1a1a] text-white px-3.5 py-1.5 text-[9px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors"
                    >
                      Bordereau / Détails
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar Controls (1/3) */}
        <div className="space-y-6">
          {/* Vigilance Stocks */}
          <div className="bg-white p-5 rounded-sm border border-[#ede5db]">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-base font-medium text-gray-800 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d9534f" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Stocks Critiques
              </h2>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#d9534f]">2 Alertes</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Manteau Sable Double-Face (S)</span>
                  <span className="text-[#d9534f]">2 ex.</span>
                </div>
                <div className="w-full bg-[#ede5db] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#d9534f] h-full w-[15%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Pull Côtelé Écru (M)</span>
                  <span className="text-amber-600">1 ex.</span>
                </div>
                <div className="w-full bg-[#ede5db] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full w-[8%]"></div>
                </div>
              </div>
              <button 
                onClick={() => alert("Demande de réassort envoyée aux ateliers de Biella (Italie).")}
                className="w-full border border-[#1a1a1a] text-[#1a1a1a] py-2.5 text-[9px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                Commander un réassort façonnier
              </button>
            </div>
          </div>

          {/* Export & Outils */}
          <div className="bg-white p-5 rounded-sm border border-[#ede5db] space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-700">Actions d'Atelier</h3>
            <button 
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orders, null, 2));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", `commandes-epure-${new Date().toISOString().slice(0,10)}.json`);
                downloadAnchor.click();
              }}
              className="w-full bg-[#f5f0eb] hover:bg-[#ede5db] p-3 rounded-sm text-left transition-colors flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">Exporter les commandes</div>
                <div className="text-[11px] text-gray-500">Télécharger le registre JSON / Compta</div>
              </div>
              <span>↓</span>
            </button>

            <button 
              onClick={() => {
                if (confirm("Réinitialiser le registre avec les commandes de démonstration ?")) {
                  localStorage.removeItem('epure_orders');
                  setOrders(getStoredOrders());
                }
              }}
              className="w-full border border-red-200 text-red-600 hover:bg-red-50 p-2.5 rounded-sm text-center text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              Réinitialiser la liste
            </button>
          </div>
        </div>
      </div>

      {/* Modal Bordereau de Commande */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#faf8f5] max-w-lg w-full p-6 md:p-8 rounded-sm shadow-xl border border-[#ede5db] relative">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
            >
              &times;
            </button>

            <div className="text-center pb-4 border-b border-[#ede5db] mb-6">
              <div className="text-[9px] font-bold tracking-widest uppercase text-gray-500">Maison ÉPURE &bull; Bordereau d'Expédition</div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold mt-1">Bordereau {selectedOrder.id}</h2>
              <p className="text-xs text-gray-500">Transporteur : {selectedOrder.carrier} &bull; Statut : {selectedOrder.status}</p>
            </div>

            <div className="space-y-4 mb-6 text-sm">
              <div className="bg-white p-3 rounded-sm border border-[#ede5db]">
                <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Destinataire :</div>
                <div className="font-semibold">{selectedOrder.customerName}</div>
                <div className="text-gray-600">{selectedOrder.customerEmail}</div>
                <div className="text-gray-600">{selectedOrder.address}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Contenu du colis :</div>
                {selectedOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-gray-200 text-xs">
                    <span>{it.quantity} &times; {it.name} ({it.color} / {it.size})</span>
                    <span className="font-medium">{it.price * it.quantity} €</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 text-sm font-bold">
                  <span>Total Réglé :</span>
                  <span>{selectedOrder.total} €</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => {
                  window.print();
                }}
                className="flex-1 bg-[#1a1a1a] text-white py-3 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800"
              >
                Imprimer le bordereau
              </button>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="bg-[#ede5db] text-black px-5 py-3 text-[10px] font-bold tracking-widest uppercase rounded-sm"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Atelier;
