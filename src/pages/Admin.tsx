import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Eye, Package, Users, TrendingUp } from 'lucide-react';
import { useApp, Product } from '../context/AppContext';

const Admin: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: 0,
    originalPrice: 0,
    category: 'Gaming',
    description: '',
    specifications: {} as Record<string, string>,
    images: [''],
    rating: 4.5,
    reviews: 0,
    inStock: true,
    featured: false,
    new: false,
    promo: false
  });
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  // Redirect if not admin
  if (!state.user || !state.user.isAdmin) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center glass rounded-2xl p-8 max-w-md mx-4">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-4">Accès Restreint</h2>
          <p className="text-gray-800 mb-6">
            Vous devez être connecté en tant qu'administrateur pour accéder à cette page.
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  const openProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || 0,
        category: product.category,
        description: product.description,
        specifications: product.specifications,
        images: product.images,
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
        featured: product.featured || false,
        new: product.new || false,
        promo: product.promo || false
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        price: 0,
        originalPrice: 0,
        category: 'Gaming',
        description: '',
        specifications: {},
        images: [''],
        rating: 4.5,
        reviews: 0,
        inStock: true,
        featured: false,
        new: false,
        promo: false
      });
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = () => {
    const product: Product = {
      id: editingProduct?.id || Date.now().toString(),
      ...productForm,
      images: productForm.images.filter(img => img.trim() !== '')
    };

    if (editingProduct) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: product });
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: product });
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    }
  };

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setProductForm(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey]: newSpecValue
        }
      }));
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    setProductForm(prev => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return { ...prev, specifications: newSpecs };
    });
  };

  const mockOrders = [
    { id: '1', customer: 'Marie Dubois', product: 'Gaming Beast Pro X1', status: 'En cours', date: '2024-01-15', amount: 2499 },
    { id: '2', customer: 'Thomas Martin', product: 'UltraBook Pro 15"', status: 'Expédié', date: '2024-01-14', amount: 1599 },
    { id: '3', customer: 'Sophie Laurent', product: 'Workstation Pro 32', status: 'Livré', date: '2024-01-13', amount: 3299 },
  ];

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold mb-2">Administration</h1>
          <p className="text-gray-900">Gestion de votre boutique PC-Tech</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-dark-800 p-1 rounded-lg w-fit animate-fade-in-up">
          {[
            { id: 'dashboard', label: 'Tableau de Bord', icon: TrendingUp },
            { id: 'products', label: 'Produits', icon: Package },
            { id: 'orders', label: 'Commandes', icon: Users }
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id ? 'bg-electric-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'Total Produits', value: state.products.length, icon: Package, color: 'electric' },
                { title: 'Commandes', value: mockOrders.length, icon: Users, color: 'neon' },
                { title: 'Chiffre d\'Affaires', value: `${mockOrders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}fcfa`, icon: TrendingUp, color: 'yellow' },
                { title: 'Taux de Conversion', value: '12.5%', icon: Eye, color: 'blue' }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="glass rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                        <IconComponent className={`h-6 w-6 text-${stat.color}-400`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Activité Récente</h3>
              <div className="space-y-4">
                {mockOrders.slice(0, 5).map(order => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                    <div>
                      <p className="font-medium text-white">{order.customer}</p>
                      <p className="text-sm text-gray-400">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-electric-400">{order.amount}fcfa</p>
                      <p className="text-sm text-gray-400">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des Produits</h2>
              <button
                onClick={() => openProductModal()}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Ajouter un Produit</span>
              </button>
            </div>

            <div className="glass rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Produit</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Catégorie</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Prix</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {state.products.map(product => (
                      <tr key={product.id} className="hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-white">{product.name}</p>
                              <p className="text-sm text-gray-400 truncate max-w-xs">{product.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{product.category}</td>
                        <td className="px-6 py-4">
                          <div className="text-electric-400 font-medium">{product.price}fcfa</div>
                          {product.originalPrice && (
                            <div className="text-xs text-gray-500 line-through">{product.originalPrice}fcfa</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            product.inStock ? 'bg-neon-500/20 text-neon-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {product.inStock ? 'En stock' : 'Rupture'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openProductModal(product)}
                              className="text-electric-400 hover:text-electric-300 p-1"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold">Gestion des Commandes</h2>
            
            <div className="glass rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Produit</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Montant</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {mockOrders.map(order => (
                      <tr key={order.id} className="hover:bg-white/5">
                        <td className="px-6 py-4 text-gray-300">#{order.id}</td>
                        <td className="px-6 py-4 text-white font-medium">{order.customer}</td>
                        <td className="px-6 py-4 text-gray-300">{order.product}</td>
                        <td className="px-6 py-4 text-gray-400">{order.date}</td>
                        <td className="px-6 py-4 text-electric-400 font-medium">{order.amount}fcfa</td>
                        <td className="px-6 py-4">
                          <select
                            defaultValue={order.status}
                            className="bg-dark-700 border border-gray-600 rounded px-2 py-1 text-sm"
                          >
                            <option value="En attente">En attente</option>
                            <option value="En cours">En cours</option>
                            <option value="Expédié">Expédié</option>
                            <option value="Livré">Livré</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Product Modal */}
        {isProductModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-dark-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {editingProduct ? 'Modifier le Produit' : 'Ajouter un Produit'}
                  </h2>
                  <button
                    onClick={() => setIsProductModalOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nom du produit</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-500"
                        placeholder="Ex: Gaming Beast Pro X1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Prix (fcfa)</label>
                        <input
                          type="number"
                          value={productForm.price}
                          onChange={(e) => setProductForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                          className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Prix original (fcfa)</label>
                        <input
                          type="number"
                          value={productForm.originalPrice}
                          onChange={(e) => setProductForm(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                          className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-500"
                      >
                        <option value="Gaming">Gaming</option>
                        <option value="Portable">Portable</option>
                        <option value="Bureau">Bureau</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-500"
                        placeholder="Description du produit..."
                      />
                    </div>
                  </div>

                  {/* Images & Options */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Images (URLs)</label>
                      <div className="space-y-2">
                        {productForm.images.map((image, index) => (
                          <div key={index} className="flex space-x-2">
                            <input
                              type="url"
                              value={image}
                              onChange={(e) => {
                                const newImages = [...productForm.images];
                                newImages[index] = e.target.value;
                                setProductForm(prev => ({ ...prev, images: newImages }));
                              }}
                              className="flex-1 px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-500"
                              placeholder="https://..."
                            />
                            {index > 0 && (
                              <button
                                onClick={() => {
                                  const newImages = productForm.images.filter((_, i) => i !== index);
                                  setProductForm(prev => ({ ...prev, images: newImages }));
                                }}
                                className="text-red-400 hover:text-red-300 p-2"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => setProductForm(prev => ({ ...prev, images: [...prev.images, ''] }))}
                          className="text-electric-400 hover:text-electric-300 text-sm flex items-center space-x-1"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Ajouter une image</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Note</label>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={productForm.rating}
                          onChange={(e) => setProductForm(prev => ({ ...prev, rating: Number(e.target.value) }))}
                          className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avis</label>
                        <input
                          type="number"
                          value={productForm.reviews}
                          onChange={(e) => setProductForm(prev => ({ ...prev, reviews: Number(e.target.value) }))}
                          className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-300">Options</label>
                      <div className="space-y-2">
                        {[
                          { key: 'inStock', label: 'En stock' },
                          { key: 'featured', label: 'Produit phare' },
                          { key: 'new', label: 'Nouveau' },
                          { key: 'promo', label: 'En promotion' }
                        ].map(option => (
                          <label key={option.key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={productForm[option.key as keyof typeof productForm] as boolean}
                              onChange={(e) => setProductForm(prev => ({ ...prev, [option.key]: e.target.checked }))}
                              className="rounded border-gray-600 text-electric-500 focus:ring-electric-500"
                            />
                            <span className="text-sm text-gray-300">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Spécifications</label>
                  <div className="space-y-3">
                    {Object.entries(productForm.specifications).map(([key, value]) => (
                      <div key={key} className="flex space-x-2">
                        <input
                          type="text"
                          value={key}
                          readOnly
                          className="flex-1 px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => setProductForm(prev => ({
                            ...prev,
                            specifications: { ...prev.specifications, [key]: e.target.value }
                          }))}
                          className="flex-1 px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-500"
                        />
                        <button
                          onClick={() => removeSpecification(key)}
                          className="text-red-400 hover:text-red-300 p-2"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newSpecKey}
                        onChange={(e) => setNewSpecKey(e.target.value)}
                        placeholder="Nom de la spécification"
                        className="flex-1 px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-500"
                      />
                      <input
                        type="text"
                        value={newSpecValue}
                        onChange={(e) => setNewSpecValue(e.target.value)}
                        placeholder="Valeur"
                        className="flex-1 px-3 py-2 bg-dark-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric-500"
                      />
                      <button
                        onClick={addSpecification}
                        className="btn-primary px-4"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-700 flex justify-end space-x-4">
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingProduct ? 'Modifier' : 'Ajouter'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;