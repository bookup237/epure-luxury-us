export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: 'NEW IN' | 'LIMITED EDITION' | 'SIGNATURE PIECE' | 'RESTOCK';
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  ref?: string;
}

const PRODUCTS_STORAGE_KEY = 'epure_catalog_products';
const CATALOG_VERSION_KEY = 'epure_catalog_v2_en';

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Oversized Wool Overcoat",
    subtitle: "Combed Virgin Wool",
    description: "An oversized overcoat tailored from exceptional combed virgin wool. Features a relaxed unstructured silhouette, dropped shoulders, and full silk lining. A timeless investment piece crafted to transcend seasons.",
    price: 380,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop",
    category: "WOOL OVERCOATS",
    badge: "NEW IN",
    colors: [
      { name: "Flaxen Sand", hex: "#c4b5a4" },
      { name: "Charcoal", hex: "#3d3d3d" },
      { name: "Cream", hex: "#f0ebe3" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    ref: "EP-891"
  },
  {
    id: "2",
    name: "Turtleneck Sweater",
    subtitle: "4-Ply Cream Cashmere",
    description: "Knitted from 4-ply Mongolian cashmere. Dense, pillowy soft ribbed knit with a tailored drape. Crafted in heritage Italian mills with pure European craftsmanship.",
    price: 240,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&h=800&fit=crop",
    category: "CASHMERE",
    badge: "LIMITED EDITION",
    colors: [
      { name: "Ecru", hex: "#f0ebe3" },
      { name: "Caramel", hex: "#a0764a" }
    ],
    sizes: ["XS", "S", "M", "L"],
    ref: "EP-742"
  },
  {
    id: "3",
    name: "Belted Cashmere Coat",
    subtitle: "Double-Faced Pure Cashmere",
    description: "Signature double-faced pure cashmere belted coat. Features a tailored lapel collar, self-tie sash belt, and artisanal hand-finished seams.",
    price: 460,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop",
    category: "CASHMERE",
    badge: "SIGNATURE PIECE",
    colors: [
      { name: "Flaxen Sand", hex: "#c4b5a4" },
      { name: "Midnight Black", hex: "#1a1a1a" },
      { name: "Pearl Gray", hex: "#b0b0b0" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    ref: "EP-892"
  },
  {
    id: "4",
    name: "Pleated Trousers",
    subtitle: "Washed Cotton & Linen Blend",
    description: "High-waisted tailored trousers with sharp front pleats. Straight-leg cut with a graceful drape. Undyed natural tone woven from organic sustainable fibers.",
    price: 195,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    category: "TROUSERS",
    colors: [
      { name: "Ecru", hex: "#f0ebe3" },
      { name: "Taupe", hex: "#8b7d6b" }
    ],
    sizes: ["XS", "S", "M", "L"],
    ref: "EP-560"
  },
  {
    id: "5",
    name: "Tailored Blazer",
    subtitle: "Anthracite Tropical Wool",
    description: "Single-breasted sartorial blazer tailored in lightweight tropical wool. Structured shoulders, jet flap pockets, and breathable cupro lining.",
    price: 320,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
    category: "WOOL OVERCOATS",
    badge: "NEW IN",
    colors: [
      { name: "Charcoal", hex: "#3d3d3d" },
      { name: "Navy Blue", hex: "#1c2841" }
    ],
    sizes: ["S", "M", "L", "XL"],
    ref: "EP-433"
  },
  {
    id: "6",
    name: "Ribbed Knit Crewneck",
    subtitle: "Superfine Merino Wool",
    description: "Classic ribbed knit crewneck spun from ultrafine 19.5-micron Merino wool. Distinctive textural depth, clean ribbing, and resilient shape retention.",
    price: 210,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a7a?w=600&h=800&fit=crop",
    category: "CASHMERE",
    colors: [
      { name: "Ecru", hex: "#f0ebe3" },
      { name: "Sand", hex: "#c4b5a4" },
      { name: "Forest Moss", hex: "#7a8b6f" }
    ],
    sizes: ["XS", "S", "M", "L"],
    ref: "EP-318"
  }
];

export const getStoredProducts = (): Product[] => {
  try {
    const isMigrated = localStorage.getItem(CATALOG_VERSION_KEY);
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    
    // Auto-migrate to English catalog if not done yet
    if (!isMigrated || !raw) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(initialProducts));
      localStorage.setItem(CATALOG_VERSION_KEY, 'true');
      return initialProducts;
    }
    return JSON.parse(raw);
  } catch {
    return initialProducts;
  }
};

export const saveProducts = (prods: Product[]) => {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(prods));
    // Notifier les composants d'un changement dans les produits
    window.dispatchEvent(new Event('epure_products_updated'));
  } catch (err) {
    console.error('Erreur sauvegarde produits', err);
  }
};

export const addProduct = (p: Omit<Product, 'id' | 'ref'>): Product => {
  const existing = getStoredProducts();
  const nextId = String(Date.now());
  const newProduct: Product = {
    ...p,
    id: nextId,
    ref: `EP-${Math.floor(100 + Math.random() * 900)}`
  };
  const updated = [newProduct, ...existing];
  saveProducts(updated);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const existing = getStoredProducts();
  const index = existing.findIndex(p => p.id === id);
  if (index === -1) return null;
  const updated = { ...existing[index], ...updates };
  existing[index] = updated;
  saveProducts(existing);
  return updated;
};

export const deleteProduct = (id: string) => {
  const existing = getStoredProducts();
  const updated = existing.filter(p => p.id !== id);
  saveProducts(updated);
  return updated;
};

export default initialProducts;
