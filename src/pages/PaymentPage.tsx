import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CreditCard, Building2, Calendar, Lock } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const listing = location.state?.listing;
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'YOUR_KEY_ID',
      amount: (listing?.price || 50000) * 100,
      currency: "INR",
      name: "PGWaala",
      description: `Booking for ${listing?.title || 'PG/Hostel'}`,
      image: "https://example.com/your_logo",
      order_id: "order_IluGWxBm9U8zJ8",
      handler: function (response: any) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "",
        email: "",
        contact: ""
      },
      notes: {
        address: listing?.location || "Property Address"
      },
      theme: {
        color: "#FF5A5F"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <div className="container-pad py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Complete your booking</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">Property Details</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 mt-1" />
                  <div>
                    <h3 className="font-medium">{listing?.title || 'Property Name'}</h3>
                    <p className="text-sm text-gray-600">{listing?.location || 'Location'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Card Number</label>
                  <div className="flex items-center border rounded-md p-2">
                    <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456"
                      className="flex-1 outline-none text-sm"
                      disabled
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Expiry Date</label>
                    <div className="flex items-center border rounded-md p-2">
                      <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        className="flex-1 outline-none text-sm"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">CVV</label>
                    <div className="flex items-center border rounded-md p-2">
                      <Lock className="w-5 h-5 text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        placeholder="123"
                        className="flex-1 outline-none text-sm"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border h-fit">
            <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Rent</span>
                <span>₹{listing?.price?.toLocaleString('en-IN') || '50,000'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Security Deposit</span>
                <span>₹{(listing?.price || 50000).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span>₹999</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>₹{((listing?.price || 50000) * 2 + 999).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button
                className="w-full bg-[#FF5A5F] text-white py-3 rounded-md hover:bg-[#E00B41] transition-colors mt-6 font-medium disabled:opacity-50"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Proceed to Pay'}
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Your payment is secured by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;