import { fetchListingsFromSheet, fetchListingsFromLocalCsv, Listing } from './spreadsheetData';
import { getUserListings } from './userListings'; // Added import

const USE_LOCAL_CSV = true; // Set to true to use local CSV, false for Google Sheets

// One-time fetch promise, respects the USE_LOCAL_CSV flag
export const fetchedListings: Promise<Listing[]> = (
  USE_LOCAL_CSV 
    ? fetchListingsFromLocalCsv() 
    : fetchListingsFromSheet()
)
  .catch(error => {
    console.error(`Error fetching listings (one-time, source: ${USE_LOCAL_CSV ? 'Local CSV' : 'Google Sheets'}):`, error);
    return []; // Return an empty array on error
  });

let pollingIntervalId: NodeJS.Timeout | null = null;
let previousDataStringified: string | null = null;

export function startPollingListings(
  callback: (listings: Listing[]) => void,
  errorCallback: (error: Error) => void,
  interval: number = 30000 // 30 seconds
) {
  if (pollingIntervalId) {
    clearInterval(pollingIntervalId);
  }

  let initialFetchDone = false;
  let pollCount = 0;

  const fetchData = async (isInitialFetch: boolean) => {
    pollCount++;
    const source = USE_LOCAL_CSV ? 'Local CSV' : 'Google Sheets';
    console.log(`Polling (${isInitialFetch ? 'Initial' : `Cycle ${pollCount}`}, Source: ${source}): fetchData started.`);
    
    let listingsPromise: Promise<Listing[]>;

    if (USE_LOCAL_CSV) {
      console.log(`Polling (${isInitialFetch ? 'Initial' : `Cycle ${pollCount}`}): Using local CSV data source.`);
      listingsPromise = fetchListingsFromLocalCsv();
    } else {
      console.log(`Polling (${isInitialFetch ? 'Initial' : `Cycle ${pollCount}`}): Using Google Sheets data source.`);
      listingsPromise = fetchListingsFromSheet();
    }

    try {
      const baseListings = await listingsPromise;
      const userAddedListings = getUserListings();

      // Combine listings: primary source first, then user-added ones.
      // User-added listings have negative IDs, so they won't clash if base IDs are positive.
      const combinedListings = [...baseListings, ...userAddedListings];

      console.log(`Polling: Fetched ${baseListings.length} base listings, ${userAddedListings.length} user listings. Total: ${combinedListings.length}`);

      const currentDataStringified = JSON.stringify(combinedListings); // Use combined listings for change detection

      if (!initialFetchDone) { // This covers the very first fetch, regardless of isInitialFetch flag for subsequent logic
        initialFetchDone = true;
        previousDataStringified = currentDataStringified;
        console.log(`Polling (Initial, Source: ${source}): Initial data fetched (including user listings) and callback triggered.`);
        callback(combinedListings);
      } else if (currentDataStringified !== previousDataStringified) {
        previousDataStringified = currentDataStringified;
        console.log(`Polling (Cycle ${pollCount}, Source: ${source}): Data updated (including user listings) and callback triggered.`);
        callback(combinedListings);
      } else {
        console.log(`Polling (Cycle ${pollCount}, Source: ${source}): Data unchanged (including user listings).`);
      }
    } catch (error) {
      console.error(`Polling (${isInitialFetch ? 'Initial' : `Cycle ${pollCount}`}, Source: ${source}): Error fetching data:`, error);
      if (!initialFetchDone) { // Only call errorCallback if the initial fetch attempt fails
        initialFetchDone = true; // Mark that an initial attempt was made
        errorCallback(error as Error);
      }
      // For subsequent errors during polling, we just log and continue.
      // The UI will continue to show the last successfully fetched data.
    }
  };

  // Initial fetch
  fetchData(true); // Pass true for the very first call

  // Set up polling
  pollingIntervalId = setInterval(() => fetchData(false), interval); // Pass false for subsequent calls

  return {
    stop: () => {
      if (pollingIntervalId) {
        clearInterval(pollingIntervalId);
        pollingIntervalId = null;
        console.log('Polling stopped.');
      }
    },
  };
}

export const areas = [
  "All Areas",
  "Risali",
  "VIP Nagar",
  "Smriti Nagar",
  "Maroda",
  "Nehru Nagar"
];