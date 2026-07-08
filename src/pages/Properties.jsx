import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropertyCard from '../components/property/PropertyCard';
import PropertyFilter from '../components/property/PropertyFilter';
import { properties } from '../data/properties';

const Properties = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');

  const [filters, setFilters] = useState({
    search: '',
    type: typeParam ? typeParam.charAt(0).toUpperCase() + typeParam.slice(1).replace('-', ' ') : '',
    priceRange: '',
    availability: '',
  });

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) return false;
      }
      if (filters.type && p.roomType !== filters.type) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (p.rent < min || (max && p.rent > max)) return false;
      }
      if (filters.availability === 'true' && !p.available) return false;
      if (filters.availability === 'false' && p.available) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Browse Properties
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your perfect room from our extensive collection of verified properties.
          </p>
        </motion.div>

        <PropertyFilter filters={filters} onFilterChange={setFilters} />

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No properties match your search criteria.</p>
            <button
              onClick={() => setFilters({ search: '', type: '', priceRange: '', availability: '' })}
              className="btn-primary mt-4"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Showing {filtered.length} {filtered.length === 1 ? 'property' : 'properties'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Properties;
