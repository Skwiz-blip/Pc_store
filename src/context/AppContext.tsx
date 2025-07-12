import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  new?: boolean;
  promo?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

export interface AppState {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  isSearchOpen: boolean;
  searchQuery: string;
}

// Initial products data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Gaming Beast Pro X1',
    price: 2499,
    originalPrice: 2799,
    category: 'Gaming',
    description: 'PC gaming ultra-performant avec RTX 4080 et processeur i9',
    specifications: {
      'Processeur': 'Intel Core i9-13900K',
      'Carte graphique': 'NVIDIA RTX 4080 16GB',
      'RAM': '32GB DDR5',
      'Stockage': '1TB NVMe SSD',
      'Refroidissement': 'Liquide AIO 360mm'
    },
    images: [
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg',
      'https://images.pexels.com/photos/18105/pexels-photo.jpg'
    ],
    rating: 4.8,
    reviews: 156,
    inStock: true,
    featured: true,
    promo: true
  },
  {
    id: '2',
    name: 'UltraBook Pro 15"',
    price: 1599,
    category: 'Portable',
    description: 'Laptop professionnel ultra-léger avec écran 4K',
    specifications: {
      'Processeur': 'Intel Core i7-13700H',
      'Écran': '15.6" 4K OLED',
      'RAM': '16GB LPDDR5',
      'Stockage': '512GB NVMe SSD',
      'Autonomie': 'Jusqu\'à 12h'
    },
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg'
    ],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    featured: true,
    new: true
  },
  {
    id: '3',
    name: 'Workstation Pro 32',
    price: 3299,
    category: 'Bureau',
    description: 'Station de travail professionnelle pour création 3D',
    specifications: {
      'Processeur': 'AMD Ryzen 9 7950X',
      'Carte graphique': 'NVIDIA RTX A5000',
      'RAM': '64GB DDR5 ECC',
      'Stockage': '2TB NVMe SSD',
      'Garantie': '3 ans pro'
    },
    images: [
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg'
    ],
    rating: 4.9,
    reviews: 234,
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'Budget Gamer RX',
    price: 899,
    originalPrice: 1099,
    category: 'Gaming',
    description: 'PC gaming abordable pour débuter dans l\'esport',
    specifications: {
      'Processeur': 'AMD Ryzen 5 7600X',
      'Carte graphique': 'RX 7600 XT 16GB',
      'RAM': '16GB DDR5',
      'Stockage': '500GB NVMe SSD',
      'Alimentation': '650W 80+ Gold'
    },
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg'
    ],
    rating: 4.4,
    reviews: 67,
    inStock: true,
    promo: true
  },
  {
    id: '5',
    name: 'Creator Laptop 16"',
    price: 2199,
    category: 'Portable',
    description: 'Laptop haute performance pour créateurs de contenu',
    specifications: {
      'Processeur': 'Intel Core i9-13980HX',
      'Carte graphique': 'RTX 4070 8GB',
      'Écran': '16" 4K 120Hz',
      'RAM': '32GB DDR5',
      'Stockage': '1TB NVMe SSD'
    },
    images: [
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg'
    ],
    rating: 4.7,
    reviews: 145,
    inStock: true,
    new: true
  },
  {
    id: '6',
    name: 'Mini PC Office',
    price: 549,
    category: 'Bureau',
    description: 'Mini PC compact pour usage bureautique',
    specifications: {
      'Processeur': 'Intel Core i5-13400',
      'RAM': '8GB DDR4',
      'Stockage': '256GB SSD',
      'Connectique': 'WiFi 6, Bluetooth 5.2',
      'Dimensions': '15 x 15 x 5 cm'
    },
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg'
    ],
    rating: 4.2,
    reviews: 78,
    inStock: true
  }
];

const initialState: AppState = {
  products: initialProducts,
  cart: [],
  user: null,
  isSearchOpen: false,
  searchQuery: ''
};

// Actions
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_SEARCH' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string };

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'TOGGLE_SEARCH':
      return { ...state, isSearchOpen: !state.isSearchOpen };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}