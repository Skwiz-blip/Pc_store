import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useApp();

  const updateQuantity = (id: string, newQuantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity: newQuantity } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleWhatsAppOrder = () => {
    const orderDetails = state.cart.map(item => 
      `${item.name} x${item.quantity} - ${item.price * item.quantity}fcfa`
    ).join('\n');
    
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const message = `Bonjour ! Je souhaite passer commande :\n\n${orderDetails}\n\nTotal : ${total}fcfa\n\nPouvez-vous confirmer la disponibilité et me donner les détails pour finaliser ma commande ?`;
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  if (state.cart.length === 0) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto animate-fade-in-up">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
            <p className="text-gray-400 mb-8">
              Découvrez nos produits et ajoutez-les à votre panier pour commencer vos achats.
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Découvrir nos Produits</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold">Mon Panier</h1>
            <p className="text-gray-400">{itemCount} article{itemCount !== 1 ? 's' : ''}</p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continuer les achats</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item, index) => (
              <div
                key={item.id}
                className="glass rounded-xl p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full sm:w-24 sm:h-24 object-cover rounded-lg hover:scale-105 transition-transform"
                    />
                  </Link>

                  <div className="flex-1 space-y-3">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-lg font-semibold text-white hover:text-electric-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-400">Quantité:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="bg-dark-700 hover:bg-dark-600 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="bg-dark-700 px-3 py-1 rounded-lg min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-dark-700 hover:bg-dark-600 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex items-center justify-between sm:justify-end space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-electric-400">
                            {(item.price * item.quantity).toLocaleString()}fcfa
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-gray-400">
                              {item.price}fcfa x {item.quantity}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                          title="Supprimer du panier"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end pt-4">
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 text-sm flex items-center space-x-2 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Vider le panier</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="glass rounded-xl p-6 sticky top-24 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-xl font-bold mb-6">Récapitulatif</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sous-total</span>
                  <span className="font-medium">{total.toLocaleString()}fcfa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Livraison</span>
                  <span className="font-medium text-neon-400">Gratuite</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-electric-400">{total.toLocaleString()}fcfa</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Commander par WhatsApp</span>
                </button>

                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <span>Procéder au Paiement</span>
                </button>
              </div>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-gray-700 space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <div className="w-2 h-2 bg-neon-400 rounded-full"></div>
                  <span>Livraison gratuite</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <div className="w-2 h-2 bg-neon-400 rounded-full"></div>
                  <span>Garantie 3 ans incluse</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <div className="w-2 h-2 bg-neon-400 rounded-full"></div>
                  <span>Support technique 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;