import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const { state } = useApp();
  
  const [filteredProducts, setFilteredProducts] = useState(state.products);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const searchQuery = searchParams.get('search') || '';

  const categories = ['Gaming', 'Portable', 'Bureau'];
  const sortOptions = [
    { value: 'name', label: 'Nom' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating', label: 'Meilleures notes' },
  ];

  useEffect(() => {
    let filtered = [...state.products];

    // Filter by category from URL
    if (category) {
      const categoryMap: { [key: string]: string } = {
        'portable': 'Portable',
        'bureau': 'Bureau',
        'gaming': 'Gaming'
      };
      const mappedCategory = categoryMap[category];
      if (mappedCategory) {
        filtered = filtered.filter(product => product.category === mappedCategory);
      }
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        Object.values(product.specifications).some(spec => 
          spec.toLowerCase().includes(query)
        )
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [state.products, category, searchQuery, selectedCategories, priceRange, sortBy]);

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  const getPageTitle = () => {
    if (searchQuery) return `Recherche: "${searchQuery}"`;
    if (category) {
      const titles: { [key: string]: string } = {
        'portable': 'PC Portables',
        'bureau': 'PC de Bureau',
        'gaming': 'PC Gaming'
      };
      return titles[category] || 'Tous les Produits';
    }
    return 'Tous les Produits';
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-display font-bold mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-gray-400">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="glass rounded-xl p-6 animate-fade-in-up">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtres
              </h3>

              {/* Categories */}
              {!category && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-300">Catégories</h4>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleCategoryToggle(cat)}
                          className="rounded border-gray-600 text-electric-500 focus:ring-electric-500"
                        />
                        <span className="text-sm text-gray-300">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-gray-300">Prix</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-20 px-2 py-1 bg-dark-700 border border-gray-600 rounded text-sm"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-20 px-2 py-1 bg-dark-700 border border-gray-600 rounded text-sm"
                    />
                    <span className="text-gray-400">fcfa</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in-up">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden btn-primary flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filtres</span>
              </button>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-600 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-electric-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-electric-500 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in-up">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-300">Aucun produit trouvé</h3>
                <p className="text-gray-400 mb-6">
                  Essayez de modifier vos critères de recherche ou de navigation.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange({ min: 0, max: 5000 });
                  }}
                  className="btn-primary"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;