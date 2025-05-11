import React from 'react';
import { SlidersHorizontal, Wifi, Wind, UtensilsCrossed, Sofa, Car, Tv, Home, Droplets } from 'lucide-react';

interface FilterChipProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, icon, active }) => {
  return (
    <button className={`px-4 py-2 text-sm rounded-full border transition-colors flex items-center gap-2 ${active ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 hover:border-gray-500'}`}>
      {icon}
      {label}
    </button>
  );
};

const FilterBar: React.FC = () => {
  return (
    <div className="container-pad sticky top-[80px] z-10 bg-white py-4 border-b">
      <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">
        <FilterChip icon={<Wifi size={16} />} label="WiFi" />
        <FilterChip icon={<Wind size={16} />} label="AC" />
        <FilterChip icon={<UtensilsCrossed size={16} />} label="Food" active />
        <FilterChip icon={<Sofa size={16} />} label="Furnished" />
        <FilterChip icon={<Car size={16} />} label="Parking" />
        <FilterChip icon={<Tv size={16} />} label="TV" />
        <FilterChip icon={<Home size={16} />} label="Independent" />
        <FilterChip icon={<Droplets size={16} />} label="24/7 Water" />
        
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
          <input type="range" className="w-full" min="1000" max="50000" step="500" />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>₹1,000</span>
            <span>₹20,000</span>
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-[#FF5A5F]" />
              <span className="text-sm">PG</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-[#FF5A5F]" />
              <span className="text-sm">Hostel</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-[#FF5A5F]" />
              <span className="text-sm">Apartment</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;