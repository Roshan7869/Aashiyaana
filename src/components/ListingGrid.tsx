import React, { useState, useEffect } from 'react';
import { Star, Heart, Wifi, Wind, Droplets, Home, Fan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { startPollingListings } from '../data/listings'; // Updated import
import type { Listing } from '../data/spreadsheetData';

interface Filters {
  amenities: string[];
  priceRange: number;
  selectedArea: string;
  propertyTypes: string[];
}

interface ListingCardProps {
  listing: Listing & { // Combine Listing with optional UI-specific fields
    isFavorite?: boolean;
    isTopRated?: boolean;
  };
}

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case 'AC': return <Wind size={14} />;
    case 'Furnished': return <Home size={14} />;
    case 'WiFi': return <Wifi size={14} />;
    case '24/7 Water': return <Droplets size={14} />;
    case 'Independent': return <Home size={14} />;
    case 'Air Water Cooler': return <Fan size={14} />;
    default: return null;
  }
};

// Apply React.memo to ListingCard
const ListingCard: React.FC<ListingCardProps> = React.memo(({ listing }) => {
  // console.log(`Rendering ListingCard: ${listing.id} - ${listing.title}`); // Keep this commented unless actively debugging card re-renders
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/payment', { state: { listing } });
  };

  return (
    <div className="listing-card group">
      <div className="relative">
        <div className="relative pb-[66.6666%] overflow-hidden rounded-lg">
          <img 
            src={listing.imageUrl} 
            alt={listing.title}
            className="listing-image absolute inset-0 w-full h-full object-cover transition-transform duration-500"
          />
        </div>
        <button className="absolute top-2 right-2 p-1.5 text-white hover:text-[#FF5A5F] transition-colors">
          <Heart 
            size={20} 
            fill={listing.isFavorite ? "#FF5A5F" : "none"} 
            className={listing.isFavorite ? "text-[#FF5A5F]" : ""}
          />
        </button>
      </div>
      
      <div className="mt-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 text-sm">{listing.title}</h3>
          {!isNaN(listing.rating) ? (
            <div className="flex items-center gap-0.5">
              <Star size={14} fill="currentColor" />
              <span className="text-sm">{listing.rating}</span>
            </div>
          ) : null}
        </div>
        
        <p className="text-xs text-gray-500">{listing.location}</p>
        <p className="text-xs text-gray-500">{listing.distance}</p>
        
        <div className="flex gap-1.5 mt-1.5">
          {listing.amenities.map((amenity, index) => (
            amenity && (
              <span key={index} className="text-gray-600" title={amenity}>
                {getAmenityIcon(amenity)}
              </span>
            )
          ))}
        </div>
        
        <div className="mt-1.5 text-xs text-gray-500">
          <strong>Rules:</strong> {listing.rules.filter(rule => rule).join(', ')}
        </div>
        
        <p className="mt-1.5 font-medium text-sm">
          {!isNaN(listing.price) 
            ? `₹${listing.price.toLocaleString('en-IN')} / month`
            : "Price not available"}
        </p>
        
        <button 
          className="mt-2 w-full bg-[#FF5A5F] text-white py-1.5 rounded-md hover:bg-[#E00B41] transition-colors text-sm"
          onClick={handleBookNow}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}); // End of React.memo for ListingCard

interface ListingGridProps {
  filters: Filters;
}

const ListingGrid: React.FC<ListingGridProps> = ({ filters }) => {
  const [listingsData, setListingsData] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Manages initial loading state
  const [error, setError] = useState<string | null>(null);
  const [showRefreshIndicator, setShowRefreshIndicator] = useState(false);
  
  const refreshIndicatorTimeoutId = React.useRef<NodeJS.Timeout | null>(null);
  const isInitialLoadDoneRef = React.useRef(false); // Ref to track initial load completion

  useEffect(() => {
    console.log('ListingGrid: Main useEffect for polling setup triggered.');
    
    // Set loading true for the very first setup.
    // This ensures "Loading listings..." is shown initially.
    if (!isInitialLoadDoneRef.current) {
        setIsLoading(true);
    }

    const poller = startPollingListings(
      (data) => { // Success callback for new data
        console.log('ListingGrid: Polling success callback. Data (first 2):', data.slice(0, 2));
        
        if (isInitialLoadDoneRef.current) { // Show refresh indicator only AFTER initial load has completed
          console.log(`ListingGrid: Refresh Indicator - Initial load done. Current showRefreshIndicator state (before update): ${showRefreshIndicator}`); // This will log the current state, not the pending one.
          setShowRefreshIndicator(true);
          console.log(`ListingGrid: Refresh Indicator - setShowRefreshIndicator(true) called.`);
          if (refreshIndicatorTimeoutId.current) {
            clearTimeout(refreshIndicatorTimeoutId.current);
          }
          refreshIndicatorTimeoutId.current = setTimeout(() => {
            console.log('ListingGrid: Refresh Indicator - Hiding via setTimeout.');
            setShowRefreshIndicator(false);
          }, 2500);
        }
        
        setListingsData(data);
        
        if (!isInitialLoadDoneRef.current) {
          setIsLoading(false); // Set loading to false only once after the first successful data fetch
          isInitialLoadDoneRef.current = true;
          console.log('ListingGrid: Initial load complete. isLoading set to false.');
        }
        if (error) setError(null); // Clear any previous error if data is successfully fetched
      },
      (initialError) => { // Error callback for initial fetch
        console.error("ListingGrid: Initial fetch error from polling:", initialError);
        setError("Failed to load initial listings. Please try again later or check your connection.");
        if (!isInitialLoadDoneRef.current) {
            setIsLoading(false); // Set loading to false on initial error
            isInitialLoadDoneRef.current = true; // Mark initial load attempt as done
            console.log('ListingGrid: Initial load failed. isLoading set to false.');
        }
      }
    );

    // Cleanup function to stop polling and clear any pending timeout
    return () => {
      console.log('ListingGrid: Unmounting. Stopping polling.');
      poller.stop();
      if (refreshIndicatorTimeoutId.current) {
        clearTimeout(refreshIndicatorTimeoutId.current);
      }
      // Do NOT reset isInitialLoadDoneRef.current here if you want the "Loading listings..."
      // not to show on fast refresh in development. For a true remount, it would be false anyway.
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and unmount

  const filteredListings = listingsData.filter(listing => {
    if (listing.price > filters.priceRange) return false;
    if (filters.selectedArea !== "All Areas" && listing.location !== filters.selectedArea) return false;
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity =>
        listing.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }
    if (filters.propertyTypes.length > 0 && !filters.propertyTypes.some(type => listing.title.toLowerCase().includes(type.toLowerCase()))) {
      return false;
    }
    return true;
  });

  if (isLoading) { // This 'isLoading' is primarily for the initial load
    return <div className="container-pad py-4 text-center">Loading listings...</div>;
  }

  if (error) {
    return <div className="container-pad py-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container-pad py-4">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Best PGs in Bhilai</h1>
          {showRefreshIndicator && <span className="text-sm text-green-600 animate-pulse">Updating listings...</span>}
        </div>
        <p className="text-sm text-gray-600 mt-0.5">
          {filteredListings.length > 0
            ? `Showing ${filteredListings.length} properties in Bhilai`
            : "No properties found matching your criteria."}
        </p>
      </div>
      
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No listings match your current filters.</p>
          <p className="text-sm text-gray-400">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ListingGrid;