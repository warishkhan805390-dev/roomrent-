import { Link } from 'react-router-dom';
import { MapPin, Star, Bed, Bath, Maximize } from 'lucide-react';
import { motion } from 'framer-motion';

const PropertyCard = ({ property, index = 0 }) => {
  const { id, title, thumbnail, rent, location, roomType, rating, available, bedrooms, bathrooms, area } = property;

  const formatRent = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/properties/${id}`}
        className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      >
        <div className="relative overflow-hidden h-56">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              available
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}>
              {available ? 'Available' : 'Rented'}
            </span>
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-gray-900">{rating}</span>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="bg-primary-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
              {roomType}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-500 transition-colors mb-2">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Bed className="w-4 h-4" />
              <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Bath className="w-4 h-4" />
              <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Maximize className="w-4 h-4" />
              <span>{area}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-2xl font-bold text-primary-500">{formatRent(rent)}</span>
              <span className="text-gray-500 text-sm">/month</span>
            </div>
            <span className="text-primary-500 font-medium text-sm group-hover:underline">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
