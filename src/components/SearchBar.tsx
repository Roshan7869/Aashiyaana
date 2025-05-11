import React, { useState } from 'react';
import { Search, Building2, Users } from 'lucide-react';

interface SearchBarProps {
  active: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ active }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const suggestions = [
    'Bilai Sector 5',
    'Bilai City Center',
    'Bilai Sector 6',
    'Shankar Nagar'
  ].filter(s => s.toLowerCase().includes(location.toLowerCase()));
  
  const handleTabClick = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  if (!active) return null;

  return (
    <div className="bg-white rounded-full shadow-md border overflow-hidden">
      <div className="flex items-center">
        <div 
          className={`relative flex flex-col flex-grow py-3 px-6 cursor-pointer ${activeTab === 'location' ? 'bg-gray-100' : ''}`}
          onClick={() => handleTabClick('location')}
        >
          <label className="text-xs font-bold">Location</label>
          <input 
            className="search-input text-sm mt-1" 
            placeholder="Search in Bilai"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {activeTab === 'location' && location && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 z-50">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setLocation(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div 
          className={`relative flex flex-col py-3 px-6 cursor-pointer ${activeTab === 'type' ? 'bg-gray-100' : ''}`}
          onClick={() => handleTabClick('type')}
        >
          <label className="text-xs font-bold">Property Type</label>
          <div className="flex items-center gap-1 mt-1">
            <Building2 size={14} />
            <span className="text-sm">PG/Hostel</span>
          </div>
        </div>
        
        <div 
          className={`relative flex flex-col py-3 px-6 cursor-pointer ${activeTab === 'occupancy' ? 'bg-gray-100' : ''}`}
          onClick={() => handleTabClick('occupancy')}
        >
          <label className="text-xs font-bold">Occupancy</label>
          <div className="flex items-center gap-1 mt-1">
            <Users size={14} />
            <span className="text-sm">Single/Shared</span>
          </div>
        </div>
        
        <div className="p-3">
          <button className="bg-[#FF5A5F] text-white p-3 rounded-full hover:bg-[#E00B41] transition-colors">
            <Search size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};