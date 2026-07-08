import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Bed, Bath, Maximize, Check, ArrowLeft, Wifi, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageGallery from '../components/property/ImageGallery';
import { properties } from '../data/properties';
import { categories } from '../data/images';

const amenityIcons = {
  WiFi: Wifi,
  AC: () => <span>❄️</span>,
  Gym: () => <span>💪</span>,
  Pool: () => <span>🏊</span>,
  Parking: () => <span>🚗</span>,
  Security: Shield,
  'Power Backup': () => <span>🔋</span>,
  'Play Area': () => <span>🎮</span>,
  'Study Table': () => <span>📚</span>,
  Almirah: () => <span>🗄️</span>,
  'Water Purifier': () => <span>💧</span>,
  'Mess Available': () => <span>🍽️</span>,
  'Work Desk': () => <span>💼</span>,
  'Mini Bar': () => <span>🍸</span>,
  'Room Service': () => <span>🛎️</span>,
  Meals: () => <span>🍳</span>,
  Housekeeping: () => <span>🧹</span>,
  Laundry: () => <span>👕</span>,
  Lockers: () => <span>🔐</span>,
  'Common Room': () => <span>🛋️</span>,
  Kitchen: () => <span>🍳</span>,
  'Garden Access': () => <span>🌿</span>,
};

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Link to="/properties" className="btn-primary">Back to Properties</Link>
        </div>
      </div>
    );
  }

  const formatRent = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Properties
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <ImageGallery images={property.gallery} />
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{property.title}</h1>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-900">{property.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  property.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {property.available ? 'Available' : 'Rented'}
                </span>
                <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-xs font-semibold">
                  {property.roomType}
                </span>
              </div>

              <div className="text-3xl font-bold text-primary-500 mb-1">
                {formatRent(property.rent)}
                <span className="text-base font-normal text-gray-500">/month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Property Details</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Bed, label: 'Bedrooms', value: `${property.bedrooms} ${property.bedrooms === 1 ? 'Bed' : 'Beds'}` },
                  { icon: Bath, label: 'Bathrooms', value: `${property.bathrooms} ${property.bathrooms === 1 ? 'Bath' : 'Baths'}` },
                  { icon: Maximize, label: 'Area', value: property.area },
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 bg-gray-50 rounded-xl">
                    <item.icon className="w-5 h-5 text-primary-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {property.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Check;
                  return (
                    <div key={amenity} className="flex items-center gap-2 text-gray-700">
                      {typeof Icon === 'function' && Icon !== Check ? (
                        <Icon />
                      ) : (
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                      )}
                      <span className="text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="btn-primary w-full py-4 text-lg"
              disabled={!property.available}
            >
              {property.available ? 'Book Now' : 'Currently Rented'}
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">{property.description}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetails;
