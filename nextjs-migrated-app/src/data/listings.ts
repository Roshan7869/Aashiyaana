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

      const combinedListings = [...baseListings, ...userAddedListings];

      console.log(`Polling: Fetched ${baseListings.length} base listings, ${userAddedListings.length} user listings. Total: ${combinedListings.length}`);

      const currentDataStringified = JSON.stringify(combinedListings);

      if (!initialFetchDone) {
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
      if (!initialFetchDone) {
        initialFetchDone = true;
        errorCallback(error as Error);
      }
    }
  };

  fetchData(true);

  pollingIntervalId = setInterval(() => fetchData(false), interval);

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
