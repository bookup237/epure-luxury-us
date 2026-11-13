import React, { useState, useEffect, useRef } from 'react';
import { getStoredOrders, saveOrders, type Order } from '../data/orders';
import { getStoredProducts, addProduct, updateProduct, deleteProduct, type Product } from '../data/products';
import { processAndStandardizeImage } from '../utils/imageOptimizer';

const Atelier = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'ready'>('all');
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('products');

  // Modal d'ajout de produit
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductSubtitle, setNewProductSubtitle] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('MANTEAUX EN LAINE');
  const [newProductPrice, setNewProductPrice] = useState(280);
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductBadge, setNewProductBadge] = useState<Product['badge']>('NOUVEAUTÉ');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [cropMode, setCropMode] = useState<'cover' | 'contain'>('cover');

  // Modal de modification de produit
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPrice, setEditPrice] = useState(0);
  const [editImage, setEditImage] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editBadge, setEditBadge] = useState<Product['badge']>('NOUVEAUTÉ');
  const [isProcessingEditImage, setIsProcessingEditImage] = useState(false);
  const [editCropMode, setEditCropMode] = useState<'cover' | 'contain'>('cover');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOrders(getStoredOrders());
    setProducts(getStoredProducts());

    const onProductsChange = () => setProducts(getStoredProducts());
    window.addEventListener('epure_products_updated', onProductsChange);
    return () => window.removeEventListener('epure_products_updated', onProductsChange);
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

  // Traitement automatique d'une photo sélectionnée sur téléphone ou ordinateur
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isEdit) {
      setIsProcessingEditImage(true);
    } else {
      setIsProcessingImage(true);
    }

    try {
      const mode = isEdit ? editCropMode : cropMode;
      const standardizedDataUrl = await processAndStandardizeImage(file, {
        width: 600,
        height: 800,
        quality: 0.85,
        fit: mode
      });

      if (isEdit) {
        setEditImage(standardizedDataUrl);
      } else {
        setNewProductImage(standardizedDataUrl);
      }
    } catch (err: any) {
      alert(`Erreur lors du traitement de l'image : ${err.message || err}`);
    } finally {
      if (isEdit) {
        setIsProcessingEditImage(false);
      } else {
        setIsProcessingImage(false);
      }
      e.target.value = '';
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const created = addProduct({
      name: newProductName.trim(),
      subtitle: newProductSubtitle.trim() || 'Création Atelier Épure',
      description: newProductDesc.trim() || 'Confection artisanale dans les meilleurs ateliers européens.',
      category: newProductCategory,
      price: Number(newProductPrice) || 150,
      image: newProductImage,
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
    alert(`La pièce "${created.name}" a été ajoutée et est immédiatement visible par vos clients sur la boutique !`);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setEditName(p.name);
    setEditSubtitle(p.subtitle);
    setEditCategory(p.category);
    setEditPrice(p.price);
    setEditImage(p.image);
    setEditDesc(p.description || '');
    setEditBadge(p.badge || 'NOUVEAUTÉ');
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      name: editName.trim(),
      subtitle: editSubtitle.trim(),
      category: editCategory,
      price: Number(editPrice),
      image: editImage,
      description: editDesc.trim(),
      badge: editBadge
    });

    setProducts(getStoredProducts());
    setEditingProduct(null);
    alert(`La pièce "${editName}" a été mise à jour avec succès !`);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Confirmer le retrait définitif de "${name}" de la boutique ?`)) {
      deleteProduct(id);
      setProducts(getStoredProducts());
    }
  };

  return (
    <div className="px-4 py-6 pb-24 md:py-10 md:max-w-6xl mx-auto">
      {/* En-tête de l'Atelier */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#ede5db] mb-8">
        <div>
          <div className="text-[10px] font-bold tracking-[0.25em] text-[#8b7355] uppercase">
            Maison ÉPURE &bull; Console Administrateur
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#1a1a1a] mt-1">
            L'Atelier de Gestion
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Gérez vos produits, commandes clients et photos au format luxe uniforme.
          </p>
        </div>

        {/* Onglets Commandes / Produits */}
        <div className="flex gap-2 bg-[#ede5db]/60 p-1 rounded-sm self-start md:self-auto">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xs transition-colors ${
              activeTab === 'products' 
                ? 'bg-[#1a1a1a] text-white shadow-xs' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            🏷️ Catalogue Produits ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xs transition-colors ${
              activeTab === 'orders' 
                ? 'bg-[#1a1a1a] text-white shadow-xs' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            📦 Commandes ({orders.length})
          </button>
        </div>
      </div>

      {/* SECTION 1 : GESTION DU CATALOGUE PRODUITS */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-sm border border-[#ede5db]">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Catalogue des Pièces en Vente</h2>
              <p className="text-xs text-gray-500">
                Toutes les photos sont automatiquement uniformisées au ratio luxe standard (3:4 portrait) pour garder un design irréprochable.
              </p>
            </div>
            <button 
              onClick={() => setShowAddProductModal(true)}
              className="bg-[#1a1a1a] text-white px-5 py-3 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors shadow-xs flex items-center gap-2"
            >
              <span>+</span>
              <span>Ajouter une Pièce</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white border border-[#ede5db] rounded-sm overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#8b7355] transition-all">
                <div>
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                    {p.badge && (
                      <span className="absolute top-2.5 left-2.5 text-[8px] font-bold tracking-widest uppercase bg-white/90 backdrop-blur-xs text-[#1a1a1a] px-2 py-1 rounded-xs shadow-xs">
                        {p.badge}
                      </span>
                    )}
                    <span className="absolute bottom-2.5 right-2.5 text-[8px] font-mono tracking-widest uppercase bg-black/60 text-white px-2 py-0.5 rounded-xs">
                      {p.ref || `REF-${p.id}`}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="text-[10px] font-bold text-[#8b7355] tracking-widest uppercase mb-1">
                      {p.category}
                    </div>
                    <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#1a1a1a] leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{p.subtitle}</p>
                    <div className="text-lg font-bold text-[#1a1a1a] mt-2">${p.price}.00</div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-[#f5f0eb] mt-2 flex gap-2">
                  <button 
                    onClick={() => openEditModal(p)}
                    className="flex-1 bg-[#ede5db] text-[#1a1a1a] hover:bg-[#d8cdbf] py-2 text-[10px] font-bold uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    ✏️ Modifier
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(p.id, p.name)}
                    className="border border-red-200 text-red-600 hover:bg-red-50 px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xs transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2 : GESTION DES COMMANDES */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-sm border border-[#ede5db]">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Chiffre d'Affaires</div>
              <div className="font-['Cormorant_Garamond'] text-3xl font-bold">${totalRevenue}.00</div>
            </div>
            <div className="bg-white p-5 rounded-sm border border-[#ede5db]">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Commandes Récentes</div>
              <div className="font-['Cormorant_Garamond'] text-3xl font-bold">{orders.length}</div>
            </div>
            <div className="bg-white p-5 rounded-sm border border-[#ede5db]">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Colis à Préparer</div>
              <div className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#8b7355]">{pendingOrders.length}</div>
            </div>
          </div>

          {/* Filtres de statut */}
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xs ${
                filter === 'all' ? 'bg-[#1a1a1a] text-white' : 'bg-white border border-[#ede5db] text-gray-600'
              }`}
            >
              Toutes ({orders.length})
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xs ${
                filter === 'pending' ? 'bg-[#1a1a1a] text-white' : 'bg-white border border-[#ede5db] text-gray-600'
              }`}
            >
              À traiter ({pendingOrders.length})
            </button>
          </div>

          {/* Tableau des commandes */}
          <div className="bg-white border border-[#ede5db] rounded-sm overflow-hidden">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                Aucune commande enregistrée pour le moment.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf8f5] border-b border-[#ede5db] text-[9px] uppercase tracking-widest text-gray-500">
                    <tr>
                      <th className="p-3">Réf</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Montant</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ede5db]">
                    {filteredOrders.map(o => (
                      <tr key={o.id} className="hover:bg-gray-50/50">
                        <td className="p-3 font-mono font-semibold">{o.id}</td>
                        <td className="p-3">
                          <div className="font-medium text-gray-900">{o.customerName}</div>
                          <div className="text-[10px] text-gray-500">{o.customerEmail}</div>
                        </td>
                        <td className="p-3 text-gray-500">{o.createdAt}</td>
                        <td className="p-3 font-semibold">${o.total}.00</td>
                        <td className="p-3">
                          <select 
                            value={o.status}
                            onChange={(e) => handleUpdateStatus(o.id, e.target.value as any)}
                            className="bg-transparent border border-[#ede5db] rounded-xs px-2 py-1 text-[10px] font-medium uppercase outline-none focus:border-black"
                          >
                            <option value="En attente de paiement">En attente de paiement</option>
                            <option value="Payé • À expédier">Payé • À expédier</option>
                            <option value="En préparation">En préparation</option>
                            <option value="Prêt transporteur">Prêt transporteur</option>
                            <option value="Expédié">Expédié</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => setSelectedOrder(o)}
                            className="text-[#8b7355] hover:text-black font-semibold text-[10px] uppercase tracking-wider"
                          >
                            Bordereau &rarr;
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 1 : AJOUTER UN PRODUIT */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#faf8f5] max-w-lg w-full p-6 md:p-8 rounded-sm shadow-2xl border border-[#ede5db] relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowAddProductModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
            >
              &times;
            </button>

            <div className="mb-6">
              <div className="text-[9px] font-bold tracking-widest uppercase text-[#8b7355]">
                Maison ÉPURE &bull; Nouveau Modèle
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold mt-1">
                Ajouter une Pièce à la Boutique
              </h2>
              <p className="text-xs text-gray-500">
                Téléversez une photo depuis votre téléphone ou ordinateur : elle sera automatiquement adaptée au ratio 3:4 uniforme.
              </p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              {/* SÉLECTEUR DE PHOTO TÉLÉPHONE / ORDINATEUR AVEC UNIFORMISATION 3:4 */}
              <div className="bg-white p-4 rounded-sm border border-[#ede5db]">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-700 mb-2">
                  Photo du Vêtement * (Téléphone ou Ordinateur)
                </label>

                <div className="flex gap-4 items-center">
                  {/* Aperçu cadré 3:4 */}
                  <div className="w-24 h-32 bg-gray-100 rounded-sm border border-[#ede5db] overflow-hidden flex-shrink-0 relative group">
                    <img 
                      src={newProductImage} 
                      alt="Aperçu" 
                      className="w-full h-full object-cover" 
                    />
                    {isProcessingImage && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-[9px] text-center p-1">
                        <div className="animate-spin mb-1">⏳</div>
                        Ajustement 3:4...
                      </div>
                    )}
                  </div>

                  {/* Boutons d'importation */}
                  <div className="flex-1 space-y-2">
                    <input 
                      type="file" 
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => handleFileChange(e, false)}
                      className="hidden" 
                    />
                    
                    <button 
                      type="button"
                      disabled={isProcessingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-[#1a1a1a] text-white hover:bg-gray-800 py-2.5 px-3 rounded-xs text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>📷</span>
                      <span>Choisir une photo (Galerie / Fichier)</span>
                    </button>

                    <div className="flex items-center justify-between text-[9px] text-gray-500 pt-1">
                      <span>Cadrage automatique :</span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => setCropMode('cover')}
                          className={`px-2 py-0.5 rounded-xs font-semibold ${
                            cropMode === 'cover' ? 'bg-[#8b7355] text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          Plein format
                        </button>
                        <button
                          type="button"
                          onClick={() => setCropMode('contain')}
                          className={`px-2 py-0.5 rounded-xs font-semibold ${
                            cropMode === 'contain' ? 'bg-[#8b7355] text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          Fond doux
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                  Nom de la pièce *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Manteau Long Ceinturé en Laine"
                  value={newProductName}
                  onChange={e => setNewProductName(e.target.value)}
                  className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                    Sous-titre / Matière
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ex: 100% Laine Vierge Peignée"
                    value={newProductSubtitle}
                    onChange={e => setNewProductSubtitle(e.target.value)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                    Prix ($ USD) *
                  </label>
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
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                    Catégorie
                  </label>
                  <select 
                    value={newProductCategory}
                    onChange={e => setNewProductCategory(e.target.value)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-xs outline-none focus:border-[#1a1a1a]"
                  >
                    <option value="MANTEAUX EN LAINE">MANTEAUX EN LAINE</option>
                    <option value="CACHEMIRE">CACHEMIRE</option>
                    <option value="PANTALONS">PANTALONS</option>
                    <option value="ACCESSOIRES">ACCESSOIRES</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                    Badge
                  </label>
                  <select 
                    value={newProductBadge}
                    onChange={e => setNewProductBadge(e.target.value as any)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-xs outline-none focus:border-[#1a1a1a]"
                  >
                    <option value="NOUVEAUTÉ">NOUVEAUTÉ</option>
                    <option value="ÉDITION LIMITÉE">ÉDITION LIMITÉE</option>
                    <option value="PIÈCE SIGNATURE">PIÈCE SIGNATURE</option>
                    <option value="RESTOCK">RESTOCK</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                  Description atelier
                </label>
                <textarea 
                  rows={2}
                  value={newProductDesc}
                  onChange={e => setNewProductDesc(e.target.value)}
                  placeholder="Détails de la coupe, origines des matières, conseils de style..."
                  className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-xs outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button 
                  type="submit"
                  disabled={isProcessingImage}
                  className="flex-1 bg-[#1a1a1a] text-white py-3.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors shadow-xs"
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

      {/* MODAL 2 : MODIFIER UN PRODUIT & REMPLACER SA PHOTO */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#faf8f5] max-w-lg w-full p-6 md:p-8 rounded-sm shadow-2xl border border-[#ede5db] relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
            >
              &times;
            </button>

            <div className="mb-6">
              <div className="text-[9px] font-bold tracking-widest uppercase text-[#8b7355]">
                Maison ÉPURE &bull; Modification Produit
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold mt-1">
                Modifier la Pièce
              </h2>
              <p className="text-xs text-gray-500">
                Vous pouvez changer la photo ou corriger les prix et descriptions.
              </p>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              {/* REMPLACER LA PHOTO */}
              <div className="bg-white p-4 rounded-sm border border-[#ede5db]">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-700 mb-2">
                  Photo Actuelle (Cliquer pour remplacer)
                </label>

                <div className="flex gap-4 items-center">
                  <div className="w-24 h-32 bg-gray-100 rounded-sm border border-[#ede5db] overflow-hidden flex-shrink-0 relative">
                    <img 
                      src={editImage} 
                      alt="Aperçu" 
                      className="w-full h-full object-cover" 
                    />
                    {isProcessingEditImage && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-[9px] text-center p-1">
                        <div className="animate-spin mb-1">⏳</div>
                        Ajustement 3:4...
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input 
                      type="file" 
                      accept="image/*"
                      ref={editFileInputRef}
                      onChange={(e) => handleFileChange(e, true)}
                      className="hidden" 
                    />
                    
                    <button 
                      type="button"
                      disabled={isProcessingEditImage}
                      onClick={() => editFileInputRef.current?.click()}
                      className="w-full bg-[#1a1a1a] text-white hover:bg-gray-800 py-2.5 px-3 rounded-xs text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>🔄</span>
                      <span>Changer la photo (Téléphone/PC)</span>
                    </button>

                    <div className="flex items-center justify-between text-[9px] text-gray-500 pt-1">
                      <span>Cadrage automatique :</span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => setEditCropMode('cover')}
                          className={`px-2 py-0.5 rounded-xs font-semibold ${
                            editCropMode === 'cover' ? 'bg-[#8b7355] text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          Plein format
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditCropMode('contain')}
                          className={`px-2 py-0.5 rounded-xs font-semibold ${
                            editCropMode === 'contain' ? 'bg-[#8b7355] text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          Fond doux
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                  Nom de la pièce *
                </label>
                <input 
                  type="text" 
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                    Sous-titre / Matière
                  </label>
                  <input 
                    type="text" 
                    value={editSubtitle}
                    onChange={e => setEditSubtitle(e.target.value)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                    Prix ($ USD) *
                  </label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={editPrice}
                    onChange={e => setEditPrice(Number(e.target.value))}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                    Catégorie
                  </label>
                  <select 
                    value={editCategory}
                    onChange={e => setEditCategory(e.target.value)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-xs outline-none focus:border-[#1a1a1a]"
                  >
                    <option value="MANTEAUX EN LAINE">MANTEAUX EN LAINE</option>
                    <option value="CACHEMIRE">CACHEMIRE</option>
                    <option value="PANTALONS">PANTALONS</option>
                    <option value="ACCESSOIRES">ACCESSOIRES</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                    Badge
                  </label>
                  <select 
                    value={editBadge}
                    onChange={e => setEditBadge(e.target.value as any)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-xs outline-none focus:border-[#1a1a1a]"
                  >
                    <option value="NOUVEAUTÉ">NOUVEAUTÉ</option>
                    <option value="ÉDITION LIMITÉE">ÉDITION LIMITÉE</option>
                    <option value="PIÈCE SIGNATURE">PIÈCE SIGNATURE</option>
                    <option value="RESTOCK">RESTOCK</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                  Description atelier
                </label>
                <textarea 
                  rows={2}
                  value={editDesc}
                  onChange={e => setNewProductDesc(e.target.value)}
                  className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-xs outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button 
                  type="submit"
                  disabled={isProcessingEditImage}
                  className="flex-1 bg-[#1a1a1a] text-white py-3.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors shadow-xs"
                >
                  Enregistrer les modifications
                </button>
                <button 
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-[#ede5db] text-black px-5 py-3.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#d5cdc3]"
                >
                  Annuler
                </button>
              </div>
            </form>
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
              <div className="text-[9px] font-bold tracking-widest uppercase text-gray-500">
                Maison ÉPURE &bull; Bordereau d'Expédition FedEx
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold mt-1">
                Bordereau {selectedOrder.id}
              </h2>
              <p className="text-xs text-gray-500">
                Transporteur : {selectedOrder.carrier || 'FedEx Express'} &bull; Statut : {selectedOrder.status}
              </p>
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
                    <span className="font-medium">${it.price * it.quantity}.00</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 text-sm font-bold">
                  <span>Total :</span>
                  <span>${selectedOrder.total}.00</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => window.print()}
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
