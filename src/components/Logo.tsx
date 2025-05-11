import React from 'react';
import { Building } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Building size={30} className="text-[#FF5A5F] stroke-current" strokeWidth={2} />
      <span className="ml-1 text-[#FF5A5F] font-bold text-xl tracking-tight">PGWaala</span>
    </div>
  );
};

export default Logo;