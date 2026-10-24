import React, { useState, useEffect } from 'react';
import { getStoredOrders, saveOrders, Order } from '../data/orders';
import { getStoredProducts, addProduct, saveProducts, Product } from '../data/products';

const Atelier = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'ready'>('all');
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [activeRange, setActiveRange] = useState<'today' | '7days'>('today');

  // Modal d'ajout de produit
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductSubtitle, setNewProductSubtitle] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('MANTEAUX EN LAINE');
  const [newProductPrice, setNewProductPrice] = useState(280);
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductBadge, setNewProductBadge] = useState<Product['badge']>('NOUVEAUTÉ');

  useEffect(() => {
    setOrders(getStoredOrders());
    setProducts(getStoredProducts());
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

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const created = addProduct({
      name: newProductName,
      subtitle: newProductSubtitle || 'Création Atelier Épure',
      description: newProductDesc || 'Confection artisanale dans les meilleurs ateliers européens.',
      category: newProductCategory,
      price: Number(newProductPrice) || 150,
      image: newProductImage || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop',
      badge: newProductBadge,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Écru Naturel', hex: '#f0ebe3' },
        { name: 'Sable Lin', hex: '#c4b5a4' }
      ]
    });

    setProducts(getStoredProducts());
    setShowAddProductModal(false);
    // Reset fields
    setNewProductName('');
    setNewProductSubtitle('');
    setNewProductDesc('');
    alert(`La pièce "${created.name}" a été ajoutée et est maintenant immédiatement visible par les clients sur la boutique !`);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Confirmer le retrait de "${name}" de la boutique ?`)) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
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
          <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl">Atelier ÉPURE &mdash; Tableau de Bord</h1>
          <p className="text-sm text-gray-500">Gestion des commandes en direct et publication des pièces de la boutique</p>
        </div>

        {/* Global actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            onClick={() => setShowAddProductModal(true)}
            className="bg-[#1a1a1a] text-white px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>+</span> Ajouter un produit
          </button>
          <button 
            onClick={handleAddSampleOrder}
            className="bg-[#ede5db] text-[#1a1a1a] px-3.5 py-2 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#d5cdc3] transition-colors flex items-center gap-1.5"
          >
            <span>+</span> Simuler commande
          </button>
        </div>
      </div>

      {/* Tabs navigation: Commandes VS Catalogue Produits */}
      <div className="flex gap-4 border-b border-[#ede5db] mb-8 pb-1">
        <button 
          onClick={() => setActiveTab('orders')}
          className={`pb-2 text-xs md:text-sm font-bold tracking-widest uppercase border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'orders' ? 'border-[#1a1a1a] text-[#1a1a1a]' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <span>Commandes Clients</span>
          <span className="bg-[#ede5db] text-gray-700 text-[10px] px-2 py-0.5 rounded-full">{orders.length}</span>
        </button>

        <button 
          onClick={() => setActiveTab('products')}
          className={`pb-2 text-xs md:text-sm font-bold tracking-widest uppercase border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'products' ? 'border-[#1a1a1a] text-[#1a1a1a]' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <span>Catalogue & Pièces en vente</span>
          <span className="bg-[#ede5db] text-gray-700 text-[10px] px-2 py-0.5 rounded-full">{products.length}</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <div className="bg-[#ede5db] p-4 rounded-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-600">Recettes Encaissées</div>
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
            <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-600">Pièces en Ligne</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <div className="font-['Cormorant_Garamond'] text-3xl mb-1">{products.length}</div>
          <div className="text-xs text-gray-600">Prêtes à être commandées</div>
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

      {/* SECTION 1 : GESTION DES COMMANDES */}
      {activeTab === 'orders' && (
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
      )}

      {/* SECTION 2 : GESTION DU CATALOGUE PRODUITS */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-[#ede5db]">
            <div>
              <h2 className="text-lg font-medium text-gray-800">Catalogue des Produits Actifs sur la Boutique</h2>
              <p className="text-xs text-gray-500">Ajoutez, modifiez ou retirez les pièces visibles par vos clients.</p>
            </div>
            <button 
              onClick={() => setShowAddProductModal(true)}
              className="bg-[#1a1a1a] text-white px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors"
            >
              + Nouveau Produit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white border border-[#ede5db] p-4 rounded-sm flex gap-4">
                <img src={p.image} alt={p.name} className="w-24 h-32 object-cover rounded-sm bg-gray-100 flex-shrink-0" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {p.badge && (
                      <span className="text-[8px] font-bold tracking-widest uppercase bg-[#ede5db] px-2 py-0.5 rounded-xs inline-block mb-1">
                        {p.badge}
                      </span>
                    )}
                    <h3 className="font-medium text-base text-[#1a1a1a]">{p.name}</h3>
                    <p className="text-xs text-gray-500">{p.subtitle}</p>
                    <div className="text-[10px] font-semibold text-[#8b7355] mt-1">{p.category}</div>
                  </div>

                  <div className="flex justify-between items-end pt-2 border-t border-[#f5f0eb]">
                    <div className="font-['Cormorant_Garamond'] text-xl font-bold">{p.price} €</div>
                    <button 
                      onClick={() => handleDeleteProduct(p.id, p.name)}
                      className="text-red-600 hover:text-red-800 text-[10px] font-bold uppercase tracking-widest"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* Modal AJOUT D'UN PRODUIT PAR L'ADMIN */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#faf8f5] max-w-lg w-full p-6 md:p-8 rounded-sm shadow-xl border border-[#ede5db] relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowAddProductModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
            >
              &times;
            </button>

            <div className="mb-6">
              <div className="text-[9px] font-bold tracking-widest uppercase text-gray-500">Atelier ÉPURE &bull; Nouveau Modèle</div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold mt-1">Ajouter une Pièce à la Boutique</h2>
              <p className="text-xs text-gray-500">Le produit sera immédiatement en ligne et achetable par les clients.</p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Nom de la pièce *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Manteau Long Cachemire"
                  value={newProductName}
                  onChange={e => setNewProductName(e.target.value)}
                  className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Sous-titre / Matière</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Pur Cachemire Double-Face"
                    value={newProductSubtitle}
                    onChange={e => setNewProductSubtitle(e.target.value)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Prix (€) *</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={newProductPrice}
                    onChange={e => setNewProductPrice(Number(e.target.value))}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Catégorie</label>
                  <select 
                    value={newProductCategory}
                    onChange={e => setNewProductCategory(e.target.value)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                  >
                    <option value="MANTEAUX EN LAINE">MANTEAUX EN LAINE</option>
                    <option value="CACHEMIRE">CACHEMIRE</option>
                    <option value="PANTALONS">PANTALONS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Badge</label>
                  <select 
                    value={newProductBadge}
                    onChange={e => setNewProductBadge(e.target.value as any)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                  >
                    <option value="NOUVEAUTÉ">NOUVEAUTÉ</option>
                    <option value="ÉDITION LIMITÉE">ÉDITION LIMITÉE</option>
                    <option value="PIÈCE SIGNATURE">PIÈCE SIGNATURE</option>
                    <option value="RESTOCK">RESTOCK</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">URL de la photo</label>
                <input 
                  type="url" 
                  value={newProductImage}
                  onChange={e => setNewProductImage(e.target.value)}
                  className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-xs outline-none focus:border-[#1a1a1a]"
                />
                <div className="mt-2 w-16 h-20 rounded-xs overflow-hidden border border-[#ede5db] bg-gray-100">
                  <img src={newProductImage} alt="Aperçu" className="w-full h-full object-cover" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Description atelier</label>
                <textarea 
                  rows={3}
                  value={newProductDesc}
                  onChange={e => setNewProductDesc(e.target.value)}
                  placeholder="Détails du tissage, tombé de la coupe, origines des matières..."
                  className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-[#1a1a1a] text-white py-3.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors"
                >
                  Publier sur la boutique
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="bg-[#ede5db] text-black px-5 py-3.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#d5cdc3]"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Atelier;
