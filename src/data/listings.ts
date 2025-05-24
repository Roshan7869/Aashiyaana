import { fetchListingsFromSheet, Listing } from './spreadsheetData';

// Keep the original one-time fetch for potential other uses or gradual refactoring
export const fetchedListings: Promise<Listing[]> = fetchListingsFromSheet()
  .catch(error => {
    console.error("Error fetching listings (one-time):", error);
    return [];
  });

let pollingIntervalId: NodeJS.Timeout | null = null;
let previousDataStringified: string | null = null;

export function startPollingListings(
  callback: (listings: Listing[]) => void,
  errorCallback: (error: Error) => void, // Added error callback for initial fetch
  interval: number = 30000 // 30 seconds
) {
  // Clear any existing interval
  if (pollingIntervalId) {
    clearInterval(pollingIntervalId);
  }

  let initialFetchDone = false;
  let pollCount = 0; // For easier tracking of poll cycles

  const fetchData = async (isInitialFetch: boolean) => {
    pollCount++;
    console.log(`Polling (${isInitialFetch ? 'Initial' : `Cycle ${pollCount}`}): fetchData started.`);
    try {
      console.log(`Polling (${isInitialFetch ? 'Initial' : `Cycle ${pollCount}`}): Calling fetchListingsFromSheet.`);
      const listings = await fetchListingsFromSheet();
      const currentDataStringified = JSON.stringify(listings);

      if (isInitialFetch) {
        initialFetchDone = true;
        previousDataStringified = currentDataStringified;
        callback(listings);
      } else if (currentDataStringified !== previousDataStringified) {
        previousDataStringified = currentDataStringified;
        callback(listings); // Call success callback with initial data
        console.log(`Polling (Initial): Initial data fetched and callback triggered.`);
      } else if (currentDataStringified !== previousDataStringified) {
        previousDataStringified = currentDataStringified;
        callback(listings); // Call success callback with updated data
        console.log(`Polling (Cycle ${pollCount}): Data updated and callback triggered.`);
      } else {
        console.log(`Polling (Cycle ${pollCount}): Data unchanged.`);
      }
    } catch (error) {
      console.error(`Polling (${isInitialFetch ? 'Initial' : `Cycle ${pollCount}`}): Error fetching data:`, error);
      if (isInitialFetch && !initialFetchDone) {
        // If initial fetch fails, notify the component to set an error state
        errorCallback(error as Error);
      }
      // For subsequent errors, we just log and continue polling.
      // The UI will continue to show the last successfully fetched data.
    }
  };

  // Initial fetch
  fetchData(true);

  // Set up polling
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