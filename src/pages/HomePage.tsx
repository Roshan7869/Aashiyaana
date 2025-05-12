import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ListingGrid from '../components/ListingGrid';

interface Filters {
  amenities: string[];
  priceRange: number;
  selectedArea: string;
  propertyTypes: string[];
}

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    amenities: [],
    priceRange: 30000,
    selectedArea: "All Areas",
    propertyTypes: []
  });

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="pt-4 pb-12">
      <FilterBar onFiltersChange={handleFiltersChange} />
      <ListingGrid filters={filters} />
    </div>
  );
};

export default HomePage;