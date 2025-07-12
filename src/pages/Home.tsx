import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Monitor, Gamepad2, Users, Clock, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { state } = useApp();
  
  const featuredProducts = state.products.filter(product => product.featured).slice(0, 6);
  const categories = [
    {
      id: 'gaming',
      name: 'PC Gaming',
      description: 'Performances extrêmes pour les joueurs',
      icon: Gamepad2,
      image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'portable',
      name: 'PC Portables',
      description: 'Mobilité et puissance réunies',
      icon: Monitor,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      color: 'from-blue-500 to-electric-500'
    },
    {
      id: 'bureau',
      name: 'PC de Bureau',
      description: 'Solutions professionnelles complètes',
      icon: Cpu,
      image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg',
      color: 'from-green-500 to-neon-500'
    }
  ];

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Graphiste',
      content: 'Service exceptionnel et produits de qualité. Mon nouveau PC portable est parfait pour mes créations !',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      rating: 5
    },
    {
      name: 'Thomas Martin',
      role: 'Gamer Pro',
      content: 'Enfin une config qui tient ses promesses ! 144fps constants, je recommande vivement PC-Tech.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      rating: 5
    },
    {
      name: 'Sophie Laurent',
      role: 'Entrepreneuse',
      content: 'Support client réactif et conseils personnalisés. Parfait pour équiper mon équipe !',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      rating: 5
    }
  ];

  return (
    <div className="pt-16">
      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-display font-bold mb-4 text-gray-900">
              Nos <span className="bg-gradient-to-r from-electric-500 to-neon-500 bg-clip-text text-transparent">Catégories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez nos gammes spécialisées pour tous vos besoins informatiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/products/${category.id}`}
                  className="group relative h-80 rounded-2xl overflow-hidden card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute inset-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                      <IconComponent className="h-12 w-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-white/90 mb-4">{category.description}</p>
                      <div className="flex items-center text-white group-hover:text-yellow-400 transition-colors">
                        <span className="font-medium">Découvrir</span>
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-display font-bold mb-4 text-gray-900">
              Produits <span className="bg-gradient-to-r from-electric-500 to-neon-500 bg-clip-text text-transparent">Phares</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection des meilleurs PC du moment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2">
              <span>Voir Tous les Produits</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 bg-gradient-to-r from-electric-600 to-neon-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6">
              Offre Spéciale
            </h2>
            <p className="text-2xl text-white/90 mb-8">
              Jusqu'à <span className="font-bold text-yellow-300">30% de réduction</span> sur nos PC Gaming
            </p>
            
            {/* Countdown Timer */}
            <div className="flex justify-center space-x-8 mb-8">
              {[
                { label: 'Jours', value: '15' },
                { label: 'Heures', value: '08' },
                { label: 'Minutes', value: '42' },
                { label: 'Secondes', value: '18' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                    <div className="text-3xl font-bold text-white">{item.value}</div>
                    <div className="text-sm text-white/80">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/products/gaming" className="bg-white text-electric-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg text-lg transition-colors inline-flex items-center space-x-2">
              <span>Profiter de l'Offre</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-display font-bold mb-4 text-gray-900">
              Ce que disent nos <span className="bg-gradient-to-r from-electric-500 to-neon-500 bg-clip-text text-transparent">Clients</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex space-x-1">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-display font-bold mb-4 text-gray-900">
              Pourquoi <span className="bg-gradient-to-r from-electric-500 to-neon-500 bg-clip-text text-transparent">PC-Tech</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Garantie Premium',
                description: 'Tous nos produits sont garantis 3 ans avec support technique inclus'
              },
              {
                icon: Clock,
                title: 'Livraison Rapide',
                description: 'Livraison express en 24h partout en France métropolitaine'
              },
              {
                icon: Users,
                title: 'Support Expert',
                description: 'Notre équipe de spécialistes vous accompagne avant et après achat'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-gradient-to-br from-electric-500 to-neon-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;