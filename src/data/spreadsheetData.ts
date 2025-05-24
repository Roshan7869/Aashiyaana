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
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvData = await response.text();
    console.log('Fetched CSV Data (first 500 chars):', csvData.substring(0, 500)); // Log first few lines
    
    const listings = parseCsvData(csvData);
    console.log('Parsed Listings (first 2):', listings.slice(0, 2)); // Log first few objects
    return listings;
  } catch (error) {
    console.error('Error in fetchListingsFromSheet:', error); // Log errors
    throw error; // Re-throw the error to be handled by the caller
  }
}

function parseCsvData(csvData: string): Listing[] {
  const rows = csvData.split('\n').slice(1); // Skip header row
  const listings: Listing[] = [];

  try {
    rows.forEach((row, index) => {
      const cells = row.split(',');

      // Assuming the CSV columns are in the order:
      // imageUrl, title, location, distance, amenities, price, rating, rules
      if (cells.length >= 8) {
        const listing: Listing = {
          id: index + 1, // Use row index + 1 as id
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
      } else if (row.trim() !== '') { // Handle potential empty lines or lines with insufficient data
        console.warn(`Skipping row ${index + 2} due to insufficient data: ${row}`);
      }
    });
  } catch (parseError) {
    console.error('Error parsing CSV data:', parseError); // Log parsing errors
    // Potentially return partial data or re-throw
  }

  return listings;
}
