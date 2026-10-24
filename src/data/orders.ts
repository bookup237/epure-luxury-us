export interface OrderItem {
  id: string;
  name: string;
  subtitle?: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: 'Payé • À expédier' | 'En préparation' | 'Prêt transporteur' | 'Expédié';
  carrier: string;
  createdAt: string;
}

const STORAGE_KEY = 'epure_orders';

export const initialOrders: Order[] = [
  {
    id: '#EP-4091',
    customerName: 'Éléonore de Montalembert',
    customerEmail: 'eleonore@montalembert.fr',
    address: 'Paris, FR',
    items: [
      {
        id: '1',
        name: 'Manteau Sable Double-Face',
        color: 'SABLE',
        size: '36',
        price: 890,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=100&h=100&fit=crop'
      }
    ],
    total: 890,
    status: 'Prêt transporteur',
    carrier: 'DHL Express',
    createdAt: 'Il y a 42 min'
  },
  {
    id: '#EP-4090',
    customerName: 'Julien Vaneau',
    customerEmail: 'j.vaneau@luxury.com',
    address: 'Lyon, FR',
    items: [
      {
        id: '4',
        name: 'Pantalon Plissé Lin',
        color: 'ÉCRU',
        size: '40',
        price: 290,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop'
      },
      {
        id: '5',
        name: 'Chemise Soie Sauvage',
        color: 'BLANC',
        size: 'M',
        price: 330,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=100&fit=crop'
      }
    ],
    total: 620,
    status: 'Payé • À expédier',
    carrier: 'Standard Express',
    createdAt: 'Il y a 2h'
  },
  {
    id: '#EP-4089',
    customerName: 'Clara Rossi',
    customerEmail: 'clara.rossi@bluewin.ch',
    address: 'Genève, CH',
    items: [
      {
        id: '7',
        name: 'Écharpe Laine Vierge Brut',
        color: 'CHAMEAU',
        size: 'Unique',
        price: 240,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=100&h=100&fit=crop'
      }
    ],
    total: 240,
    status: 'En préparation',
    carrier: 'Colissimo Int.',
    createdAt: 'Il y a 4h'
  }
];

export const getStoredOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialOrders));
      return initialOrders;
    }
    return JSON.parse(raw);
  } catch {
    return initialOrders;
  }
};

export const saveOrders = (orders: Order[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders', err);
  }
};

export const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'carrier'>): Order => {
  const existing = getStoredOrders();
  const nextNumber = 4092 + existing.length - initialOrders.length;
  const newOrder: Order = {
    ...orderData,
    id: `#EP-${nextNumber}`,
    status: 'Payé • À expédier',
    carrier: 'DHL Express',
    createdAt: 'À l’instant'
  };
  const updated = [newOrder, ...existing];
  saveOrders(updated);
  return newOrder;
};
