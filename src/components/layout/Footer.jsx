import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Globe, MessageCircle, Share2, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-8 h-8 text-primary-500" />
              <span className="text-2xl font-bold text-white">
                Room<span className="text-primary-500">Finder</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted platform for finding the perfect room, apartment, or PG accommodation.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageCircle, Share2, ExternalLink].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/properties', label: 'Properties' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Property Types</h3>
            <ul className="space-y-3">
              {['Studio', 'Apartment', 'Single Room', 'Double Room', 'PG', 'Hostel', 'Villa'].map((type) => (
                <li key={type}>
                  <Link
                    to={`/properties?type=${type.toLowerCase()}`}
                    className="hover:text-primary-500 transition-colors"
                  >
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: '123 Business Avenue, City Center, NY 10001' },
                { icon: Phone, text: '+1 (555) 123-4567' },
                { icon: Mail, text: 'info@roomfinder.com' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} RoomFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
