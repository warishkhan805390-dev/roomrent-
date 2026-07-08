import { Search } from 'lucide-react';
import { propertyTypes } from '../../data/properties';

const PropertyFilter = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or location..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div>
          <select
            value={filters.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="input-field"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type === 'All' ? '' : type}>
                {type === 'All' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={filters.priceRange}
            onChange={(e) => handleChange('priceRange', e.target.value)}
            className="input-field"
          >
            <option value="">All Prices</option>
            <option value="0-5000">Under ₹5,000</option>
            <option value="5000-10000">₹5,000 - ₹10,000</option>
            <option value="10000-20000">₹10,000 - ₹20,000</option>
            <option value="20000+">Above ₹20,000</option>
          </select>
        </div>

        <div>
          <select
            value={filters.availability}
            onChange={(e) => handleChange('availability', e.target.value)}
            className="input-field"
          >
            <option value="">All Availability</option>
            <option value="true">Available Only</option>
            <option value="false">Rented Only</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
