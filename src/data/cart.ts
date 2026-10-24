export interface CartItem {
  id: string;
  name: string;
  subtitle?: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

const CART_STORAGE_KEY = 'epure_cart_items';

const initialCart: CartItem[] = [
  { 
    id: '3', 
    name: 'Manteau Ceinturé', 
    subtitle: 'Pur Cachemire Double-Face', 
    color: 'SABLE', 
    size: 'S', 
    price: 460, 
    quantity: 1, 
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=600&fit=crop' 
  },
  { 
    id: '6', 
    name: 'Pull Maille Côtelée', 
    subtitle: 'Laine Mérinos Superfine', 
    color: 'ÉCRU', 
    size: 'M', 
    price: 210, 
    quantity: 1, 
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a7a?w=400&h=600&fit=crop' 
  }
];

export const getStoredCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(initialCart));
      return initialCart;
    }
    return JSON.parse(raw);
  } catch {
    return initialCart;
  }
};

export const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('epure_cart_updated'));
  } catch (err) {
    console.error('Failed to save cart', err);
  }
};

export const addItemToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1): CartItem[] => {
  const current = getStoredCart();
  const existingIndex = current.findIndex(
    i => i.id === item.id && i.color === item.color && i.size === item.size
  );

  let updated: CartItem[];
  if (existingIndex > -1) {
    updated = current.map((i, index) => 
      index === existingIndex ? { ...i, quantity: i.quantity + quantity } : i
    );
  } else {
    updated = [{ ...item, quantity }, ...current];
  }

  saveCart(updated);
  return updated;
};
