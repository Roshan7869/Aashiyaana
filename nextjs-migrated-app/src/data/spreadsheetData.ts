// Dummy spreadsheetData.ts
interface Listing { id: string; name: string; price: number; }

const parseCsvData = (csvText: string): Listing[] => {
  console.log("Dummy parseCsvData called.");
  if (!csvText) return [];
  // Basic CSV parsing, assuming header: id,name,price
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return []; // Need header and at least one data line
  const header = lines[0].split(',');
  const idIdx = header.indexOf('id');
  const nameIdx = header.indexOf('name');
  const priceIdx = header.indexOf('price');

  if (idIdx === -1 || nameIdx === -1 || priceIdx === -1) {
    console.error("CSV header must contain 'id', 'name', and 'price'");
    return [];
  }

  return lines.slice(1).map(line => {
    const values = line.split(',');
    if (values.length < header.length) return null; // Skip malformed lines
    const price = parseFloat(values[priceIdx]);
    if (isNaN(price)) return null; // Skip if price is not a number
    return {
      id: values[idIdx],
      name: values[nameIdx],
      price: price,
    };
  }).filter(listing => listing !== null) as Listing[];
};

export const fetchListingsFromLocalCsv = async (): Promise<Listing[]> => {
  console.log("fetchListingsFromLocalCsv: Attempting to fetch local CSV data from /localListings.csv.");
  try {
    const response = await fetch('/localListings.csv'); // Path relative to public
    if (!response.ok) {
      console.error(`fetchListingsFromLocalCsv: Failed to fetch localListings.csv: ${response.status} ${response.statusText}`);
      return []; // Return empty on fetch error
    }
    const csvText = await response.text();
    if (typeof csvText === 'undefined' || csvText === null) {
      console.error("fetchListingsFromLocalCsv: Fetched CSV data is undefined or null.");
      return [];
    }
    if (csvText.trim() === '') {
      console.warn("fetchListingsFromLocalCsv: Fetched CSV data is empty.");
      return [];
    }
    console.log('fetchListingsFromLocalCsv: Raw local CSV data fetched (first 300 chars):', csvText.substring(0, 300));
    const listings = parseCsvData(csvText); // Assumes parseCsvData is defined in this file
    console.log(`fetchListingsFromLocalCsv: Parsed ${listings.length} listings from local CSV.`);
    return listings;
  } catch (error) {
    console.error("fetchListingsFromLocalCsv: Error fetching or parsing listings from local CSV:", error);
    return [];
  }
};
// End of dummy spreadsheetData.ts
