import React from 'react';
import { Globe, CreditCard } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t mt-8">
      <div className="container-pad py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:underline">Help Center</a></li>
              <li><a href="#" className="text-sm hover:underline">Safety information</a></li>
              <li><a href="#" className="text-sm hover:underline">Cancellation options</a></li>
              <li><a href="#" className="text-sm hover:underline">Report neighborhood concern</a></li>
              <li><a href="#" className="text-sm hover:underline">Anti-discrimination</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Hosting</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:underline">List your space</a></li>
              <li><a href="#" className="text-sm hover:underline">Hosting resources</a></li>
              <li><a href="#" className="text-sm hover:underline">Community forum</a></li>
              <li><a href="#" className="text-sm hover:underline">Host responsibly</a></li>
              <li><a href="#" className="text-sm hover:underline">Hosting insurance</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Aashiyaan</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:underline">Newsroom</a></li>
              <li><a href="#" className="text-sm hover:underline">Careers</a></li>
              <li><a href="#" className="text-sm hover:underline">Investors</a></li>
              <li><a href="#" className="text-sm hover:underline">Gift cards</a></li>
              <li><a href="#" className="text-sm hover:underline">Sustainability</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Community</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:underline">Disaster relief housing</a></li>
              <li><a href="#" className="text-sm hover:underline">Support refugees</a></li>
              <li><a href="#" className="text-sm hover:underline">Combating discrimination</a></li>
              <li><a href="#" className="text-sm hover:underline">Referrals</a></li>
              <li><a href="#" className="text-sm hover:underline">Aashiyaan.org</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <span className="text-sm">© 2025 Aashiyaan, Inc.</span>
            <span className="text-sm hidden md:inline">·</span>
            <a href="#" className="text-sm hover:underline">Privacy</a>
            <span className="text-sm hidden md:inline">·</span>
            <a href="#" className="text-sm hover:underline">Terms</a>
            <span className="text-sm hidden md:inline">·</span>
            <a href="#" className="text-sm hover:underline">Sitemap</a>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-medium">
              <Globe size={16} />
              <span>English (US)</span>
            </button>
            <button className="flex items-center gap-2 text-sm font-medium">
              <CreditCard size={16} />
              <span>USD</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;