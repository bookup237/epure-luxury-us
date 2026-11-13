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
  const [newProductCategory, setNewProductCategory] = useState('WOOL OVERCOATS');
  const [newProductPrice, setNewProductPrice] = useState(280);
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductBadge, setNewProductBadge] = useState<Product['badge']>('NEW IN');
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
  const [editBadge, setEditBadge] = useState<Product['badge']>('NEW IN');
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
      alert(`Image processing error: ${err.message || err}`);
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
      subtitle: newProductSubtitle.trim() || 'Épure Atelier Creation',
      description: newProductDesc.trim() || 'Handcrafted in heritage European mills from pure noble fibers.',
      category: newProductCategory,
      price: Number(newProductPrice) || 150,
      image: newProductImage,
      badge: newProductBadge,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Flaxen Sand', hex: '#c4b5a4' },
        { name: 'Cream', hex: '#f0ebe3' }
      ]
    });

    setProducts(getStoredProducts());
    setShowAddProductModal(false);
    // Reset fields
    setNewProductName('');
    setNewProductSubtitle('');
    setNewProductDesc('');
    alert(`The piece "${created.name}" has been published and is immediately available online!`);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setEditName(p.name);
    setEditSubtitle(p.subtitle);
    setEditCategory(p.category);
    setEditPrice(p.price);
    setEditImage(p.image);
    setEditDesc(p.description || '');
    setEditBadge(p.badge || 'NEW IN');
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
    alert(`Piece "${editName}" updated successfully!`);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the boutique?`)) {
      deleteProduct(id);
      setProducts(getStoredProducts());
    }
  };

  return (
    <div className="px-4 py-6 pb-24 md:py-10 md:max-w-6xl mx-auto">
      {/* Atelier Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#ede5db] mb-8">
        <div>
          <div className="text-[10px] font-bold tracking-[0.25em] text-[#8b7355] uppercase">
            Maison ÉPURE &bull; US Flagship Admin Console
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#1a1a1a] mt-1">
            The Atelier Dashboard
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your boutique catalog, orders, and upload photos with automatic 3:4 luxury standardization.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex gap-2 bg-[#ede5db]/60 p-1 rounded-sm self-start md:self-auto">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xs transition-colors ${
              activeTab === 'products' 
                ? 'bg-[#1a1a1a] text-white shadow-xs' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            🏷️ Product Catalog ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xs transition-colors ${
              activeTab === 'orders' 
                ? 'bg-[#1a1a1a] text-white shadow-xs' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            📦 Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* SECTION 1 : PRODUCT CATALOG MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-sm border border-[#ede5db]">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Active Boutique Pieces</h2>
              <p className="text-xs text-gray-500">
                All photos are automatically cropped and optimized to luxury 3:4 portrait standards to preserve a flawless grid.
              </p>
            </div>
            <button 
              onClick={() => setShowAddProductModal(true)}
              className="bg-[#1a1a1a] text-white px-5 py-3 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors shadow-xs flex items-center gap-2"
            >
              <span>+</span>
              <span>Add New Piece</span>
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
                    ✏️ Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(p.id, p.name)}
                    className="border border-red-200 text-red-600 hover:bg-red-50 px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xs transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2 : CUSTOMER ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-sm border border-[#ede5db]">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Total Revenue (USD)</div>
              <div className="font-['Cormorant_Garamond'] text-3xl font-bold">${totalRevenue}.00</div>
            </div>
            <div className="bg-white p-5 rounded-sm border border-[#ede5db]">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Total Orders</div>
              <div className="font-['Cormorant_Garamond'] text-3xl font-bold">{orders.length}</div>
            </div>
            <div className="bg-white p-5 rounded-sm border border-[#ede5db]">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Orders to Ship</div>
              <div className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#8b7355]">{pendingOrders.length}</div>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xs ${
                filter === 'all' ? 'bg-[#1a1a1a] text-white' : 'bg-white border border-[#ede5db] text-gray-600'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xs ${
                filter === 'pending' ? 'bg-[#1a1a1a] text-white' : 'bg-white border border-[#ede5db] text-gray-600'
              }`}
            >
              Pending Dispatch ({pendingOrders.length})
            </button>
          </div>

          {/* Orders Table */}
          <div className="bg-white border border-[#ede5db] rounded-sm overflow-hidden">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No orders recorded at the moment.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf8f5] border-b border-[#ede5db] text-[9px] uppercase tracking-widest text-gray-500">
                    <tr>
                      <th className="p-3">Ref</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
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
                            <option value="En attente de paiement">Payment Pending</option>
                            <option value="Payé • À expédier">Paid • Ready to Ship</option>
                            <option value="En préparation">In Preparation</option>
                            <option value="Prêt transporteur">Ready for Courier</option>
                            <option value="Expédié">Shipped</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => setSelectedOrder(o)}
                            className="text-[#8b7355] hover:text-black font-semibold text-[10px] uppercase tracking-wider"
                          >
                            Packing Slip &rarr;
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

      {/* MODAL 1 : ADD A PRODUCT */}
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
                Maison ÉPURE &bull; New Garment
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold mt-1">
                Add a Piece to the Boutique
              </h2>
              <p className="text-xs text-gray-500">
                Upload a photo directly from your phone or computer: it will be automatically standardized to luxury 3:4 portrait ratio.
              </p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              {/* PHOTO SELECTOR */}
              <div className="bg-white p-4 rounded-sm border border-[#ede5db]">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-700 mb-2">
                  Garment Photo * (Phone Camera / Computer File)
                </label>

                <div className="flex gap-4 items-center">
                  <div className="w-24 h-32 bg-gray-100 rounded-sm border border-[#ede5db] overflow-hidden flex-shrink-0 relative group">
                    <img 
                      src={newProductImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                    {isProcessingImage && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-[9px] text-center p-1">
                        <div className="animate-spin mb-1">⏳</div>
                        3:4 Framing...
                      </div>
                    )}
                  </div>

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
                      <span>Select Photo (Phone / PC)</span>
                    </button>

                    <div className="flex items-center justify-between text-[9px] text-gray-500 pt-1">
                      <span>Framing mode:</span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => setCropMode('cover')}
                          className={`px-2 py-0.5 rounded-xs font-semibold ${
                            cropMode === 'cover' ? 'bg-[#8b7355] text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          Cover (Full)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCropMode('contain')}
                          className={`px-2 py-0.5 rounded-xs font-semibold ${
                            cropMode === 'contain' ? 'bg-[#8b7355] text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          Contain (Fit)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                  Garment Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Belted Cashmere Trench Coat"
                  value={newProductName}
                  onChange={e => setNewProductName(e.target.value)}
                  className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                    Subtitle / Fabric
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. 100% Combed Virgin Wool"
                    value={newProductSubtitle}
                    onChange={e => setNewProductSubtitle(e.target.value)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-sm outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                    Price ($ USD) *
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
                    Category
                  </label>
                  <select 
                    value={newProductCategory}
                    onChange={e => setNewProductCategory(e.target.value)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-xs outline-none focus:border-[#1a1a1a]"
                  >
                    <option value="WOOL OVERCOATS">WOOL OVERCOATS</option>
                    <option value="CASHMERE">CASHMERE</option>
                    <option value="TROUSERS">TROUSERS</option>
                    <option value="ACCESSORIES">ACCESSORIES</option>
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
                    <option value="NEW IN">NEW IN</option>
                    <option value="LIMITED EDITION">LIMITED EDITION</option>
                    <option value="SIGNATURE PIECE">SIGNATURE PIECE</option>
                    <option value="RESTOCK">RESTOCK</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                  Atelier Description
                </label>
                <textarea 
                  rows={2}
                  value={newProductDesc}
                  onChange={e => setNewProductDesc(e.target.value)}
                  placeholder="Tailoring notes, fabric provenance, fit advice..."
                  className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-xs outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button 
                  type="submit"
                  disabled={isProcessingImage}
                  className="flex-1 bg-[#1a1a1a] text-white py-3.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors shadow-xs"
                >
                  Publish to Boutique
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="bg-[#ede5db] text-black px-5 py-3.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#d5cdc3]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2 : EDIT PRODUCT & REPLACE PHOTO */}
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
                Maison ÉPURE &bull; Edit Garment
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold mt-1">
                Edit Piece
              </h2>
              <p className="text-xs text-gray-500">
                Update prices, descriptions, or replace the photo with automatic 3:4 optimization.
              </p>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              {/* REPLACE PHOTO */}
              <div className="bg-white p-4 rounded-sm border border-[#ede5db]">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-700 mb-2">
                  Current Photo (Click to replace)
                </label>

                <div className="flex gap-4 items-center">
                  <div className="w-24 h-32 bg-gray-100 rounded-sm border border-[#ede5db] overflow-hidden flex-shrink-0 relative">
                    <img 
                      src={editImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                    {isProcessingEditImage && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-[9px] text-center p-1">
                        <div className="animate-spin mb-1">⏳</div>
                        3:4 Framing...
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
                      <span>Replace Photo (Phone / PC)</span>
                    </button>

                    <div className="flex items-center justify-between text-[9px] text-gray-500 pt-1">
                      <span>Framing mode:</span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => setEditCropMode('cover')}
                          className={`px-2 py-0.5 rounded-xs font-semibold ${
                            editCropMode === 'cover' ? 'bg-[#8b7355] text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          Cover (Full)
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditCropMode('contain')}
                          className={`px-2 py-0.5 rounded-xs font-semibold ${
                            editCropMode === 'contain' ? 'bg-[#8b7355] text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          Contain (Fit)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                  Garment Name *
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
                    Subtitle / Fabric
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
                    Price ($ USD) *
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
                    Category
                  </label>
                  <select 
                    value={editCategory}
                    onChange={e => setEditCategory(e.target.value)}
                    className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-xs outline-none focus:border-[#1a1a1a]"
                  >
                    <option value="WOOL OVERCOATS">WOOL OVERCOATS</option>
                    <option value="CASHMERE">CASHMERE</option>
                    <option value="TROUSERS">TROUSERS</option>
                    <option value="ACCESSORIES">ACCESSORIES</option>
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
                    <option value="NEW IN">NEW IN</option>
                    <option value="LIMITED EDITION">LIMITED EDITION</option>
                    <option value="SIGNATURE PIECE">SIGNATURE PIECE</option>
                    <option value="RESTOCK">RESTOCK</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">
                  Atelier Description
                </label>
                <textarea 
                  rows={2}
                  value={editDesc}
                  onChange={e => setEditDesc(e.target.value)}
                  className="w-full bg-white border border-[#ede5db] rounded-sm px-3.5 py-2.5 text-xs outline-none focus:border-[#1a1a1a]"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button 
                  type="submit"
                  disabled={isProcessingEditImage}
                  className="flex-1 bg-[#1a1a1a] text-white py-3.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors shadow-xs"
                >
                  Save Changes
                </button>
                <button 
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-[#ede5db] text-black px-5 py-3.5 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#d5cdc3]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PACKING SLIP MODAL */}
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
                Maison ÉPURE &bull; FedEx Packing Slip
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold mt-1">
                Packing Slip {selectedOrder.id}
              </h2>
              <p className="text-xs text-gray-500">
                Carrier: {selectedOrder.carrier || 'FedEx Express'} &bull; Status: {selectedOrder.status}
              </p>
            </div>

            <div className="space-y-4 mb-6 text-sm">
              <div className="bg-white p-3 rounded-sm border border-[#ede5db]">
                <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Ship To:</div>
                <div className="font-semibold">{selectedOrder.customerName}</div>
                <div className="text-gray-600">{selectedOrder.customerEmail}</div>
                <div className="text-gray-600">{selectedOrder.address}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Package Contents:</div>
                {selectedOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-gray-200 text-xs">
                    <span>{it.quantity} &times; {it.name} ({it.color} / {it.size})</span>
                    <span className="font-medium">${it.price * it.quantity}.00</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 text-sm font-bold">
                  <span>Total (USD):</span>
                  <span>${selectedOrder.total}.00</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => window.print()}
                className="flex-1 bg-[#1a1a1a] text-white py-3 text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800"
              >
                Print Packing Slip
              </button>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="bg-[#ede5db] text-black px-5 py-3 text-[10px] font-bold tracking-widest uppercase rounded-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Atelier;
