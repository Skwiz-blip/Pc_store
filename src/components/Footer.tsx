import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Zap, Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Monitor className="h-8 w-8 text-electric-500" />
                <Zap className="absolute -top-1 -right-1 h-4 w-4 text-neon-500 animate-pulse" />
              </div>
              <span className="text-xl font-display font-bold bg-gradient-to-r from-electric-500 to-neon-500 bg-clip-text text-transparent">
                PC-Tech
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Votre partenaire de confiance pour la technologie PC. Nous offrons les meilleures solutions gaming, 
              professionnelles et bureautiques avec un service client exceptionnel.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-electric-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* À Propos */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">À Propos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Qui sommes-nous</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Carrières</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Actualités</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Blog Tech</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Partenaires</a></li>
            </ul>
          </div>

          {/* Service Client */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Service Client</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Retours & Remboursements</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Suivi de Commande</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Garantie</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Support Technique</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-electric-500 flex-shrink-0" />
                  <span>123 Rue de adidogomé,</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-electric-500 flex-shrink-0" />
                  <span>+228 99 99 99 99</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-electric-500 flex-shrink-0" />
                  <span>contact@pctech.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Newsletter</h3>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full btn-primary text-sm py-2"
                >
                  S'abonner
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                Recevez nos dernières offres et actualités tech
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © {currentYear} PC-Tech. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Politique de Confidentialité
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Conditions Générales
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Mentions Légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;