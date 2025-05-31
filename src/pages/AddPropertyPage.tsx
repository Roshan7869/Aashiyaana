import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUserListing } from '../data/userListings';
import type { Listing } from '../data/spreadsheetData';

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null); // For storing Data URL
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // For preview <img> tag
  const [price, setPrice] = useState('');
  const [amenities, setAmenities] = useState(''); // Comma-separated
  const [rules, setRules] = useState(''); // Comma-separated
  const [distance, setDistance] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result as string;
        setImageBase64(resultStr); // This is the Data URL string
        setImagePreviewUrl(resultStr);
      };
      reader.readAsDataURL(file);
    } else {
      setImageBase64(null);
      setImagePreviewUrl(null);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title || !location || !imageBase64 || !price || !amenities || !rules || !distance) {
      setError('Please fill in all fields, including selecting an image.');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid price.');
      return;
    }

    // imageBase64 is the Data URL string (e.g., "data:image/jpeg;base64,...")
    // This will be used as the imageUrl for the listing.
    const newListingData: Omit<Listing, 'id'> = {
      title,
      location,
      imageUrl: imageBase64, // Using the Base64 Data URL string here
      price: priceNum,
      amenities: amenities.split(',').map(a => a.trim()).filter(a => a),
      rules: rules.split(',').map(r => r.trim()).filter(r => r),
      distance,
      rating: 0, // Default rating for new properties
    };

    try {
      addUserListing(newListingData);
      setSuccess('Property added successfully! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (e) {
      console.error('Failed to add property:', e);
      setError('Failed to add property. Please try again.');
    }
  };

  return (
    <div className="container-pad py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Your Property</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        {error && <p className="mb-4 text-red-500 bg-red-100 p-3 rounded">{error}</p>}
        {success && <p className="mb-4 text-green-500 bg-green-100 p-3 rounded">{success}</p>}

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>

        <div className="mb-4">
          <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">Property Image</label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
            required
            className="w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-[#FF5A5F] hover:file:bg-pink-100"
          />
          <p className="mt-1 text-xs text-gray-500">
            Note: Images are stored locally in your browser. Uploading many large images may exceed browser storage limits.
          </p>
        </div>

        {imagePreviewUrl && (
          <div className="mt-2 mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image Preview</label>
            <img src={imagePreviewUrl} alt="Image preview" className="max-w-xs w-full h-auto border rounded-md shadow-sm object-contain" style={{ maxHeight: '200px' }} />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">Distance (e.g., '2km from center')</label>
          <input type="text" id="distance" value={distance} onChange={e => setDistance(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price per Month (INR)</label>
          <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>

        <div className="mb-4">
          <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma-separated)</label>
          <input type="text" id="amenities" value={amenities} onChange={e => setAmenities(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., AC, WiFi, Furnished" />
        </div>

        <div className="mb-6">
          <label htmlFor="rules" className="block text-sm font-medium text-gray-700 mb-1">Rules (comma-separated)</label>
          <input type="text" id="rules" value={rules} onChange={e => setRules(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., No smoking, Pets allowed" />
        </div>

        <button type="submit" className="w-full bg-[#FF5A5F] text-white py-2.5 rounded-md hover:bg-[#E00B41] transition-colors font-medium">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
