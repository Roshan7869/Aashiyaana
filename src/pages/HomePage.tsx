import React from 'react';
import CategorySection from '../components/CategorySection';
import FilterBar from '../components/FilterBar';
import ListingGrid from '../components/ListingGrid';
import InspirationSection from '../components/InspirationSection';

const HomePage: React.FC = () => {
  return (
    <div className="pt-4 pb-12">
      <CategorySection />
      <FilterBar />
      <ListingGrid />
      <InspirationSection />
    </div>
  );
};

export default HomePage;