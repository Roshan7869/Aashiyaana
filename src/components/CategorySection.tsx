import React from 'react';
import { Home, Mountain, Waves as WaveSine, Trees, Warehouse, Building, Castle, Tent, Palmtree, Sailboat } from 'lucide-react';

interface CategoryItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ icon, label, active }) => {
  return (
    <div className={`category-item flex flex-col items-center gap-1 cursor-pointer pb-4 ${active ? 'border-b-2 border-black' : 'opacity-70 hover:opacity-100'}`}>
      <div className="category-icon transition-transform duration-200">
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
};

const CategorySection: React.FC = () => {
  return (
    <div className="container-pad py-4">
      <div className="flex justify-between items-center overflow-x-auto hide-scrollbar gap-8 pb-2">
        <CategoryItem icon={<Home size={24} />} label="All homes" active />
        <CategoryItem icon={<Mountain size={24} />} label="Amazing views" />
        <CategoryItem icon={<WaveSine size={24} />} label="Beachfront" />
        <CategoryItem icon={<Trees size={24} />} label="Countryside" />
        <CategoryItem icon={<Warehouse size={24} />} label="Cabins" />
        <CategoryItem icon={<Building size={24} />} label="Design" />
        <CategoryItem icon={<Castle size={24} />} label="Mansions" />
        <CategoryItem icon={<Tent size={24} />} label="Camping" />
        <CategoryItem icon={<Palmtree size={24} />} label="Tropical" />
        <CategoryItem icon={<Sailboat size={24} />} label="Lakefront" />
      </div>
    </div>
  );
};

export default CategorySection;