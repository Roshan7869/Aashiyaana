import React, { useState } from 'react';

const InspirationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('popular');
  
  const tabData = {
    popular: [
      { id: 1, imageUrl: 'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg', title: 'Bali', description: 'Indonesia' },
      { id: 2, imageUrl: 'https://images.pexels.com/photos/5563472/pexels-photo-5563472.jpeg', title: 'Santorini', description: 'Greece' },
      { id: 3, imageUrl: 'https://images.pexels.com/photos/2604991/pexels-photo-2604991.jpeg', title: 'Tokyo', description: 'Japan' },
      { id: 4, imageUrl: 'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg', title: 'Paris', description: 'France' },
    ],
    beach: [
      { id: 5, imageUrl: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg', title: 'Maldives', description: 'Indian Ocean' },
      { id: 6, imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg', title: 'Cancun', description: 'Mexico' },
      { id: 7, imageUrl: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg', title: 'Phi Phi Islands', description: 'Thailand' },
      { id: 8, imageUrl: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg', title: 'Hawaii', description: 'United States' },
    ],
    outdoors: [
      { id: 9, imageUrl: 'https://images.pexels.com/photos/2098405/pexels-photo-2098405.jpeg', title: 'Swiss Alps', description: 'Switzerland' },
      { id: 10, imageUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg', title: 'Patagonia', description: 'Argentina & Chile' },
      { id: 11, imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg', title: 'Canadian Rockies', description: 'Canada' },
      { id: 12, imageUrl: 'https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg', title: 'Grand Canyon', description: 'United States' },
    ],
  };
  
  return (
    <div className="container-pad py-12">
      <h2 className="text-2xl font-bold mb-6">Inspiration for your next trip</h2>
      
      <div className="flex mb-6 overflow-x-auto hide-scrollbar">
        <button 
          className={`tab-button ${activeTab === 'popular' ? 'active' : ''}`}
          onClick={() => setActiveTab('popular')}
        >
          Popular
        </button>
        <button 
          className={`tab-button ${activeTab === 'beach' ? 'active' : ''}`}
          onClick={() => setActiveTab('beach')}
        >
          Beach
        </button>
        <button 
          className={`tab-button ${activeTab === 'outdoors' ? 'active' : ''}`}
          onClick={() => setActiveTab('outdoors')}
        >
          Outdoors
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tabData[activeTab as keyof typeof tabData].map(item => (
          <div key={item.id} className="group cursor-pointer">
            <div className="rounded-xl overflow-hidden relative pb-[75%]">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspirationSection;