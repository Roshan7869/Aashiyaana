import React, { useState } from 'react';
import { SlidersHorizontal, Wifi, Wind, Droplets, Home, Fan } from 'lucide-react';
import { areas } from '../data/listings';

interface FilterChipProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, icon, active, onClick }) => {
  return (
    <button 
      className={`px-4 py-2 text-sm rounded-full border transition-colors flex items-center gap-2 ${
        active ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 hover:border-gray-500'
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

interface FilterBarProps {
  onFiltersChange: (filters: {
    amenities: string[];
    priceRange: number;
    selectedArea: string;
    propertyTypes: string[];
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFiltersChange }) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(30000);
  const [selectedArea, setSelectedArea] = useState<string>("All Areas");
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    const newAmenities = selectedAmenities.includes(amenity) 
      ? selectedAmenities.filter(a => a !== amenity)
      : [...selectedAmenities, amenity];
    
    setSelectedAmenities(newAmenities);
    onFiltersChange({
      amenities: newAmenities,
      priceRange,
      selectedArea,
      propertyTypes
    });
  };

  const togglePropertyType = (type: string) => {
    const newTypes = propertyTypes.includes(type)
      ? propertyTypes.filter(t => t !== type)
      : [...propertyTypes, type];
    
    setPropertyTypes(newTypes);
    onFiltersChange({
      amenities: selectedAmenities,
      priceRange,
      selectedArea,
      propertyTypes: newTypes
    });
  };

  const handlePriceChange = (value: number) => {
    setPriceRange(value);
    onFiltersChange({
      amenities: selectedAmenities,
      priceRange: value,
      selectedArea,
      propertyTypes
    });
  };

  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
    onFiltersChange({
      amenities: selectedAmenities,
      priceRange,
      selectedArea: area,
      propertyTypes
    });
  };

  return (
    <div className="container-pad sticky top-[80px] z-10 bg-white py-4 border-b">
      <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">
        <FilterChip 
          icon={<Wind size={16} />} 
          label="AC" 
          active={selectedAmenities.includes('AC')}
          onClick={() => toggleAmenity('AC')}
        />
        <FilterChip 
          icon={<Home size={16} />} 
          label="Furnished" 
          active={selectedAmenities.includes('Furnished')}
          onClick={() => toggleAmenity('Furnished')}
        />
        <FilterChip 
          icon={<Wifi size={16} />} 
          label="WiFi" 
          active={selectedAmenities.includes('WiFi')}
          onClick={() => toggleAmenity('WiFi')}
        />
        <FilterChip 
          icon={<Droplets size={16} />} 
          label="24/7 Water" 
          active={selectedAmenities.includes('24/7 Water')}
          onClick={() => toggleAmenity('24/7 Water')}
        />
        <FilterChip 
          icon={<Home size={16} />} 
          label="Independent" 
          active={selectedAmenities.includes('Independent')}
          onClick={() => toggleAmenity('Independent')}
        />
        <FilterChip 
          icon={<Fan size={16} />} 
          label="Air Water Cooler" 
          active={selectedAmenities.includes('Air Water Cooler')}
          onClick={() => toggleAmenity('Air Water Cooler')}
        />
        
        <div className="ml-auto flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium">
            <SlidersHorizontal size={16} />
            <span>More Filters</span>
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <input 
            type="range" 
            className="w-full" 
            min="1000" 
            max="30000" 
            step="500" 
            value={priceRange}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>₹1,000</span>
            <span>₹{priceRange.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
          <select 
            className="w-full rounded-md border-gray-300 shadow-sm"
            value={selectedArea}
            onChange={(e) => handleAreaChange(e.target.value)}
          >
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                className="rounded text-[#FF5A5F]"
                checked={propertyTypes.includes('PG')}
                onChange={() => togglePropertyType('PG')}
              />
              <span className="text-sm">PG</span>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                className="rounded text-[#FF5A5F]"
                checked={propertyTypes.includes('Hostel')}
                onChange={() => togglePropertyType('Hostel')}
              />
              <span className="text-sm">Hostel</span>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                className="rounded text-[#FF5A5F]"
                checked={propertyTypes.includes('Apartment')}
                onChange={() => togglePropertyType('Apartment')}
              />
              <span className="text-sm">Apartment</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;