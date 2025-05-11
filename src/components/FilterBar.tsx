import React from 'react';
import { SlidersHorizontal, MapPin } from 'lucide-react';

interface FilterChipProps {
  label: string;
  active?: boolean;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, active }) => {
  return (
    <button className={`px-4 py-2 text-sm rounded-full border transition-colors ${active ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 hover:border-gray-500'}`}>
      {label}
    </button>
  );
};

const FilterBar: React.FC = () => {
  return (
    <div className="container-pad sticky top-[80px] z-10 bg-white py-4 border-b">
      <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">
        <FilterChip label="Amazing pools" />
        <FilterChip label="Beachfront" />
        <FilterChip label="Cabins" />
        <FilterChip label="Trending" active />
        <FilterChip label="Houseboats" />
        <FilterChip label="Mansions" />
        <FilterChip label="Amazing views" />
        <FilterChip label="Countryside" />
        <FilterChip label="Design" />
        <FilterChip label="Tropical" />
        
        <div className="ml-auto flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium">
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>
          
          <button className="hidden md:flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium">
            <MapPin size={16} />
            <span>Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;