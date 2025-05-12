import React from 'react';
import FilterBar from '../components/FilterBar';
import ListingGrid from '../components/ListingGrid';

const HomePage: React.FC = () => {
  return (
    <div className="pt-4 pb-12">
      <FilterBar />
      <ListingGrid />
    </div>
  );
};