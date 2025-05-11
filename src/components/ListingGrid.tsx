import React from 'react';
import { Star, Heart, Wifi, Wind, UtensilsCrossed, Sofa, Car, Tv } from 'lucide-react';
import { listings } from '../data/listings';

interface ListingCardProps {
  listing: {
    id: number;
    imageUrl: string;
    title: string;
    location: string;
    distance: string;
    amenities: string[];
    price: number;
    rating: number;
    isFavorite?: boolean;
    isTopRated?: boolean;
  };
}

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case 'WiFi': return <Wifi size={16} />;
    case 'AC': return <Wind size={16} />;
    case 'Food': return <UtensilsCrossed size={16} />;
    case 'Furnished': return <Sofa size={16} />;
    case 'Parking': return <Car size={16} />;
    case 'TV': return <Tv size={16} />;
    default: return null;
  }
};

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
        
        <div className="flex gap-2 mt-2">
          {listing.amenities.map((amenity, index) => (
            <span key={index} className="text-gray-600" title={amenity}>
              {getAmenityIcon(amenity)}
            </span>
          ))}
        </div>
        
        <p className="mt-2 font-medium">
          ₹{listing.price.toLocaleString('en-IN')} <span className="font-normal">/ month</span>
        </p>
        
        <button className="mt-3 w-full bg-[#FF5A5F] text-white py-2 rounded-lg hover:bg-[#E00B41] transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

const ListingGrid: React.FC = () => {
  return (
    <div className="container-pad py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Best PGs in Bhilai</h1>
        <p className="text-gray-600 mt-1">Showing {listings.length} properties in Bhilai</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingGrid;