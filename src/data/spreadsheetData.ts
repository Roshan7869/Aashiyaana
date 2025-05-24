// Define cache constants
const CACHE_KEY = 'spreadsheetListingsCache';
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export interface Listing {
  id: number;
  imageUrl: string;
  title: string;
  location: string;
  distance: string;
  amenities: string[];
  price: number;
  rating: number;
  rules: string[];
}

const SHEET_ID = '1AhtSLUqtMyYR-XmaRi3s4Nj4BlAldxcHgL89KzaSy_I';
const SHEET_NAME = 'Sheet1'; // Assuming the first sheet is named 'Sheet1'

export async function fetchListingsFromSheet(): Promise<Listing[]> {
  // 1. Cache Check
  try {
    const cachedItem = localStorage.getItem(CACHE_KEY);
    console.log('fetchListingsFromSheet: Attempting to read from cache.');
    const cachedItem = localStorage.getItem(CACHE_KEY);
    if (cachedItem) {
      console.log('fetchListingsFromSheet: Found item in cache.');
      const cached = JSON.parse(cachedItem);
      if (cached && cached.timestamp && cached.data) {
        const isCacheValid = (Date.now() - cached.timestamp) < CACHE_DURATION_MS;
        if (isCacheValid) {
          console.log('fetchListingsFromSheet: Cache HIT and valid. Returning cached data.');
          return cached.data as Listing[];
        } else {
          console.log('fetchListingsFromSheet: Cache HIT but expired.');
        }
      } else {
        console.log('fetchListingsFromSheet: Cached item was malformed.');
      }
    } else {
      console.log('fetchListingsFromSheet: Cache MISS. No item found.');
    }
  } catch (e) {
    console.warn('fetchListingsFromSheet: Error accessing or parsing localStorage cache:', e);
  }

  // 2. Network Fetch
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
  console.log('fetchListingsFromSheet: Initiating network fetch.');

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvData = await response.text();
    console.log('Fetched CSV Data (first 500 chars):', csvData.substring(0, 500));
    
    const listings = parseCsvData(csvData);
    console.log('Parsed Listings (first 2):', listings.slice(0, 2));

    // 3. Cache Update
    try {
      const cacheToStore = {
        timestamp: Date.now(),
        data: listings,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheToStore));
      console.log('fetchListingsFromSheet: New data fetched from network and written to cache.');
    } catch (e) {
      console.warn('fetchListingsFromSheet: Error storing data to localStorage cache:', e);
    }
    
    return listings;
  } catch (error) {
    console.error('Error in fetchListingsFromSheet (network fetch):', error);
    throw error; 
  }
}

function parseCsvData(csvData: string): Listing[] {
  // console.log('parseCsvData: Starting CSV parsing.'); // Can be too verbose
  const rows = csvData.split('\n').slice(1); 
  const listings: Listing[] = [];

  try {
    rows.forEach((row, index) => {
      const cells = row.split(',');
      if (cells.length >= 8) {
        const listing: Listing = {
          id: index + 1, 
          imageUrl: cells[0].trim(),
          title: cells[1].trim(),
          location: cells[2].trim(),
          distance: cells[3].trim(),
          amenities: cells[4].split(';').map(amenity => amenity.trim()),
          price: parseFloat(cells[5].trim()),
          rating: parseFloat(cells[6].trim()),
          rules: cells[7].split(';').map(rule => rule.trim()),
        };
        listings.push(listing);
      } else if (row.trim() !== '') { 
        // console.warn(`Skipping row ${index + 2} due to insufficient data: ${row}`); // Already exists
      }
    });
  } catch (parseError) {
    console.error('Error parsing CSV data:', parseError); 
  }
  // console.log(`parseCsvData: Parsed ${listings.length} listings.`); // Can be too verbose
  return listings;
}
