import React from 'react';
import { Star, Heart } from 'lucide-react';
import { listings } from '../data/listings';

interface ListingCardProps {
  listing: {
    id: number;
    imageUrl: string;
    title: string;
    location: string;
    distance: string;
    dates: string;
    price: number;
    rating: number;
    isFavorite?: boolean;
    isTopRated?: boolean;
  };
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <div className="listing-card group overflow-hidden">
      <div className="relative">
        <div className="relative pb-[66.6666%] overflow-hidden rounded-xl">
          <img 
            src={listing.imageUrl} 
            alt={listing.title}
            className="listing-image absolute inset-0 w-full h-full object-cover transition-transform duration-500"
          />
        </div>
        <button className="absolute top-3 right-3 p-2 text-white hover:text-[#FF5A5F] transition-colors">
          <Heart 
            size={24} 
            fill={listing.isFavorite ? "#FF5A5F" : "none"} 
            className={listing.isFavorite ? "text-[#FF5A5F]" : ""}
          />
        </button>
        {listing.isTopRated && (
          <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold">
            Top Rated
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900">{listing.title}</h3>
          <div className="flex items-center gap-1">
            <Star size={16} fill="currentColor" />
            <span>{listing.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500">{listing.location}</p>
        <p className="text-sm text-gray-500">{listing.distance}</p>
        <p className="text-sm text-gray-500">{listing.dates}</p>
        <p className="mt-1 font-medium">
          ${listing.price} <span className="font-normal">night</span>
        </p>
      </div>
    </div>
  );
};

const ListingGrid: React.FC = () => {
  return (
    <div className="container-pad py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingGrid;