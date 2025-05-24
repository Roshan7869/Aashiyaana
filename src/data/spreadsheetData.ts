// Vite-specific import for raw text
import localCsvDataRaw from './localListings.csv?raw';

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
    
    const listings = parseCsvData(csvData); // Use the common parser
    console.log('Parsed Listings (first 2 from Sheet):', listings.slice(0, 2));

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

// This function is used by both fetchListingsFromSheet and fetchListingsFromLocalCsv
function parseCsvData(csvData: string): Listing[] {
  // console.log('parseCsvData: Starting CSV parsing.');
  const rows = csvData.split('\n').slice(1); 
  const listings: Listing[] = [];

  try {
    rows.forEach((row, index) => {
      const cells = row.split(',');
      // Ensure cells[4] (amenities) and cells[7] (rules) exist before trying to split them.
      // Default to empty array if they don't exist to prevent error on .split
      if (cells.length >= 8) { // Check for minimum expected columns
        const amenitiesString = cells[4] || ""; // Default to empty string if undefined
        const rulesString = cells[7] || "";     // Default to empty string if undefined

        const listing: Listing = {
          id: parseInt(cells[0]?.trim(), 10) || (index + 1), // Use CSV ID or fallback to index
          imageUrl: cells[1]?.trim() || "",
          title: cells[2]?.trim() || "No Title",
          location: cells[3]?.trim() || "No Location",
          distance: cells[5]?.trim() || "N/A", // Note: CSV has distance at index 5 in local, 3 in sheet example. Standardizing.
                                            // For localListings.csv, distance is at index 4, price at 6, rating at 7, rules at 8
                                            // The provided local CSV has: id,imageUrl,title,location,distance,amenities,price,rating,rules
                                            // So: id=0, imageUrl=1, title=2, location=3, distance=4, amenities=5, price=6, rating=7, rules=8
                                            // The original parseCsvData for sheets was: imageUrl=0, title=1, location=2, distance=3, amenities=4, price=5, rating=6, rules=7
                                            // This parseCsvData needs to be robust or standardized.
                                            // For now, assuming the original sheet mapping for `parseCsvData` for consistency, and local CSV might need remapping or a different parser.
                                            // Re-checking the original parseCsvData: it was:
                                            // id: index + 1 (generated)
                                            // imageUrl: cells[0]
                                            // title: cells[1]
                                            // location: cells[2]
                                            // distance: cells[3]
                                            // amenities: cells[4]
                                            // price: cells[5]
                                            // rating: cells[6]
                                            // rules: cells[7]
                                            // This means localListings.csv's `id` column is currently ignored by this parser.
                                            // And localListings.csv has amenities at index 5, price at 6, rating at 7, rules at 8.
                                            // This parser will misalign localListings.csv.
                                            // I will adjust parseCsvData slightly to be more robust for local CSV, using its 'id' column.

          // Standardized mapping based on original `parseCsvData` structure, but using local CSV's `id`
          // This is a compromise. A better solution would be dedicated parsers or config.
          // For the new local CSV:
          // cells[0] = id, cells[1]=imageUrl, cells[2]=title, cells[3]=location, cells[4]=distance, 
          // cells[5]=amenities, cells[6]=price, cells[7]=rating, cells[8]=rules
          // Let's make parseCsvData accept a flag or use a more robust detection,
          // but for now, I will provide a specific parser for local if needed, or adjust this one carefully.
          // Given the task is about `fetchListingsFromLocalCsv` using `parseCsvData`, I should make `parseCsvData` compatible.
          // The simplest way is to check if cells[0] is numeric, suggesting it's the local CSV with an ID.
          
          id: cells[0] && !isNaN(parseInt(cells[0].trim(), 10)) ? parseInt(cells[0].trim(), 10) : (index + 1),
          imageUrl: cells[0] && !isNaN(parseInt(cells[0].trim(), 10)) ? cells[1]?.trim() : cells[0]?.trim(),
          title:    cells[0] && !isNaN(parseInt(cells[0].trim(), 10)) ? cells[2]?.trim() : cells[1]?.trim(),
          location: cells[0] && !isNaN(parseInt(cells[0].trim(), 10)) ? cells[3]?.trim() : cells[2]?.trim(),
          distance: cells[0] && !isNaN(parseInt(cells[0].trim(), 10)) ? cells[4]?.trim() : cells[3]?.trim(),
          amenities: (cells[0] && !isNaN(parseInt(cells[0].trim(), 10)) ? cells[5] : cells[4])?.split(';').map(amenity => amenity.trim()) || [],
          price:    parseFloat((cells[0] && !isNaN(parseInt(cells[0].trim(), 10)) ? cells[6] : cells[5])?.trim() || "0"),
          rating:   parseFloat((cells[0] && !isNaN(parseInt(cells[0].trim(), 10)) ? cells[7] : cells[6])?.trim() || "0"),
          rules:    (cells[0] && !isNaN(parseInt(cells[0].trim(), 10)) ? cells[8] : cells[7])?.split(';').map(rule => rule.trim()) || [],
        };
        listings.push(listing);
      } else if (row.trim() !== '') { 
        console.warn(`Skipping row in parseCsvData (likely due to insufficient columns): ${row}`);
      }
    });
  } catch (parseError) {
    console.error('Error during CSV row processing in parseCsvData:', parseError, csvData.substring(0, 100)); 
  }
  // console.log(`parseCsvData: Parsed ${listings.length} listings.`);
  return listings;
}

export const fetchListingsFromLocalCsv = async (): Promise<Listing[]> => {
  console.log('fetchListingsFromLocalCsv: Attempting to load local CSV data.');
  try {
    if (typeof localCsvDataRaw === 'undefined' || localCsvDataRaw === null) {
      console.error("fetchListingsFromLocalCsv: Local CSV data is undefined or null. Check Vite import ('?raw').");
      return [];
    }
    if (localCsvDataRaw.trim() === '') {
      console.warn("fetchListingsFromLocalCsv: Local CSV data is empty.");
      return [];
    }
    console.log('fetchListingsFromLocalCsv: Raw local CSV data loaded (first 300 chars):', localCsvDataRaw.substring(0, 300));
    const listings = parseCsvData(localCsvDataRaw); // Use the common parser
    console.log(`fetchListingsFromLocalCsv: Parsed ${listings.length} listings from local CSV.`);
    return listings;
  } catch (error) {
    console.error("fetchListingsFromLocalCsv: Error fetching or parsing listings from local CSV:", error);
    return []; 
  }
};
