import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, MessageCircle, Share2, ChevronLeft, ChevronRight, Check, Truck, Shield, Headphones } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = state.products.find(p => p.id === id);
  const relatedProducts = state.products.filter(p => 
    p.id !== id && p.category === product?.category
  ).slice(0, 3);

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <Link to="/products" className="btn-primary">
            Retour aux produits
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const handleWhatsAppOrder = () => {
    const message = `Bonjour ! Je suis intéressé(e) par le produit ${product.name} au prix de ${product.price}fcfa. Quantité souhaitée: ${quantity}. Pouvez-vous me donner plus d'informations pour finaliser ma commande ?`;
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8 animate-fade-in-up">
          <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">Produits</Link>
          <span>/</span>
          <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-white transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8 animate-fade-in-up"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour aux produits</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4 animate-fade-in-up">
            <div className="relative aspect-square bg-dark-800 rounded-2xl overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-electric-500' : 'border-gray-600'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-400">
                {product.rating}/5 ({product.reviews} avis)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-electric-400">
                  {product.price}fcfa
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.originalPrice}fcfa
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-neon-400 font-medium">
                  Économisez {product.originalPrice - product.price}fcfa ({Math.round((1 - product.price / product.originalPrice) * 100)}%)
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-neon-400" />
              <span className="text-neon-400 font-medium">En stock - Expédition immédiate</span>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Quantité</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-dark-700 hover:bg-dark-600 text-white w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="bg-dark-700 px-4 py-2 rounded-lg min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-dark-700 hover:bg-dark-600 text-white w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Ajouter au Panier - {(product.price * quantity).toLocaleString()}fcfa</span>
              </button>
              
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Commander par WhatsApp</span>
              </button>

              <button className="w-full bg-dark-700 hover:bg-dark-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Share2 className="h-5 w-5" />
                <span>Partager</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
              <div className="text-center space-y-2">
                <Truck className="h-6 w-6 text-electric-400 mx-auto" />
                <div className="text-sm">
                  <div className="font-medium text-white">Livraison</div>
                  <div className="text-gray-400">24-48h</div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <Shield className="h-6 w-6 text-neon-400 mx-auto" />
                <div className="text-sm">
                  <div className="font-medium text-white">Garantie</div>
                  <div className="text-gray-400">3 ans</div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <Headphones className="h-6 w-6 text-yellow-400 mx-auto" />
                <div className="text-sm">
                  <div className="font-medium text-white">Support</div>
                  <div className="text-gray-400">24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-bold mb-6">Spécifications Techniques</h2>
          <div className="glass rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
                  <span className="font-medium text-gray-300">{key}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl font-bold mb-6">Produits Similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="glass rounded-xl p-4 hover:bg-white/10 transition-colors"
                >
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-white mb-2">{relatedProduct.name}</h3>
                  <p className="text-electric-400 font-bold text-lg">{relatedProduct.price}fcfa</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;