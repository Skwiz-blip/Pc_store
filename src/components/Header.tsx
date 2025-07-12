import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Monitor, Search, User, ShoppingCart, Menu, X, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoogleAuth = () => {
    if (state.user) {
      dispatch({ type: 'SET_USER', payload: null });
    } else {
      // Simulate Google ID login
      const mockUser = {
        id: 'google_123456789',
        name: 'Admin User',
        email: 'admin@pctech.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        isAdmin: true,
        provider: 'google_id'
      };
      dispatch({ type: 'SET_USER', payload: mockUser });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(state.searchQuery)}`);
      dispatch({ type: 'TOGGLE_SEARCH' });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 animate-slide-down ${
      isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Monitor className="h-8 w-8 text-electric-500 group-hover:text-electric-600 transition-colors" />
              <Zap className="absolute -top-1 -right-1 h-4 w-4 text-neon-500 animate-pulse" />
            </div>
            <span className="text-xl font-display font-bold bg-gradient-to-r from-electric-500 to-neon-500 bg-clip-text text-transparent">
              PC-Tech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/products/portable" className="nav-link">PC Portables</Link>
            <Link to="/products/bureau" className="nav-link">PC de Bureau</Link>
            <Link to="/products/gaming" className="nav-link">Gaming</Link>
            <Link to="/products" className="nav-link">Tous les Produits</Link>
            {state.user?.isAdmin && (
              <Link to="/admin" className="nav-link text-neon-500">Admin</Link>
            )}
          </nav>

          {/* Desktop Utilities */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            
            <button
              onClick={handleGoogleAuth}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {state.user ? (
                <>
                  <img 
                    src={state.user.avatar} 
                    alt={state.user.name}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="text-sm text-gray-700">{state.user.name}</span>
                </>
              ) : (
                <>
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Google ID</span>
                </>
              )}
            </button>

            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-electric-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
          </button>
        </div>

        {/* Search Overlay */}
        {state.isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 p-4 animate-slide-down">
            <form onSubmit={handleSearch} className="max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={state.searchQuery}
                  onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 animate-slide-down">
            <nav className="p-4 space-y-4">
              <Link to="/" className="block py-2 text-gray-700 hover:text-electric-500 transition-colors">Accueil</Link>
              <Link to="/products/portable" className="block py-2 text-gray-700 hover:text-electric-500 transition-colors">PC Portables</Link>
              <Link to="/products/bureau" className="block py-2 text-gray-700 hover:text-electric-500 transition-colors">PC de Bureau</Link>
              <Link to="/products/gaming" className="block py-2 text-gray-700 hover:text-electric-500 transition-colors">Gaming</Link>
              <Link to="/products" className="block py-2 text-gray-700 hover:text-electric-500 transition-colors">Tous les Produits</Link>
              {state.user?.isAdmin && (
                <Link to="/admin" className="block py-2 text-neon-500">Admin</Link>
              )}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={handleGoogleAuth}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {state.user ? (
                    <>
                      <img 
                        src={state.user.avatar} 
                        alt={state.user.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="text-sm text-gray-700">{state.user.name}</span>
                    </>
                  ) : (
                    <>
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Google ID</span>
                    </>
                  )}
                </button>
                <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-electric-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>

      <style jsx>{`
        .nav-link {
          @apply text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #06b6d4, #22c55e);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </header>
  );
};

export default Header;