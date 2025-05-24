import { fetchListingsFromSheet, Listing } from './spreadsheetData';

export const fetchedListings: Promise<Listing[]> = fetchListingsFromSheet()
  .catch(error => {
    console.error("Error fetching listings:", error);
    // Return an empty array or handle the error as appropriate for your application
    return [];
  });

export const areas = [
  "All Areas",
  "Risali",
  "VIP Nagar",
  "Smriti Nagar",
  "Maroda",
  "Nehru Nagar"
];