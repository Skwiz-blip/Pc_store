import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, MessageCircle, Zap, Tag } from 'lucide-react';
import { Product } from '../context/AppContext';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = `Bonjour ! Je suis intéressé(e) par le produit ${product.name} au prix de ${product.price}fcfa. Pouvez-vous me donner plus d'informations ?`;
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden card-hover animate-fade-in-up shadow-lg">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product.new && (
            <span className="bg-neon-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <Zap className="h-3 w-3 mr-1" />
              Nouveau
            </span>
          )}
          {product.promo && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              Promo
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
          <button
            onClick={handleWhatsAppOrder}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
            title="Commander par WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-900 group-hover:text-electric-500 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews})
          </span>
        </div>

        {/* Specifications Preview */}
        <div className="text-xs text-gray-500 space-y-1">
          {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span>{key}:</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-electric-500">
                {product.price}fcfa
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice}fcfa
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="text-xs text-neon-500 font-medium">
                Économisez {product.originalPrice - product.price}fcfa
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 btn-primary text-sm py-2 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Ajouter</span>
          </button>
          <Link
            to={`/product/${product.id}`}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
          >
            Voir
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;