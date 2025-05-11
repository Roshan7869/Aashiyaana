import React, { useState } from 'react';
import { Search, Calendar, Users } from 'lucide-react';

interface SearchBarProps {
  active: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ active }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  
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
          <label className="text-xs font-bold">Where</label>
          <input 
            className="search-input text-sm mt-1" 
            placeholder="Search destinations" 
          />
          <div className={`absolute inset-0 flex items-center justify-center top-auto h-8 pointer-events-none ${activeTab !== 'location' ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
            <div className="h-full w-px bg-gray-300 absolute right-0"></div>
          </div>
        </div>
        
        <div 
          className={`relative flex flex-col py-3 px-6 cursor-pointer ${activeTab === 'check-in' ? 'bg-gray-100' : ''}`}
          onClick={() => handleTabClick('check-in')}
        >
          <label className="text-xs font-bold">Check in</label>
          <div className="flex items-center gap-1 mt-1">
            <Calendar size={14} />
            <span className="text-sm">Add dates</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center top-auto h-8 pointer-events-none">
            <div className="h-full w-px bg-gray-300 absolute right-0"></div>
          </div>
        </div>
        
        <div 
          className={`relative flex flex-col py-3 px-6 cursor-pointer ${activeTab === 'check-out' ? 'bg-gray-100' : ''}`}
          onClick={() => handleTabClick('check-out')}
        >
          <label className="text-xs font-bold">Check out</label>
          <div className="flex items-center gap-1 mt-1">
            <Calendar size={14} />
            <span className="text-sm">Add dates</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center top-auto h-8 pointer-events-none">
            <div className="h-full w-px bg-gray-300 absolute right-0"></div>
          </div>
        </div>
        
        <div 
          className={`relative flex flex-col py-3 px-6 cursor-pointer ${activeTab === 'guests' ? 'bg-gray-100' : ''}`}
          onClick={() => handleTabClick('guests')}
        >
          <label className="text-xs font-bold">Who</label>
          <div className="flex items-center gap-1 mt-1">
            <Users size={14} />
            <span className="text-sm">Add guests</span>
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

export default SearchBar;