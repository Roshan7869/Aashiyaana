import type { Listing } from './spreadsheetData';

const USER_LISTINGS_KEY = 'userAddedListings';

// Helper to get all listings from localStorage
export function getUserListings(): Listing[] {
  try {
    const listingsJson = localStorage.getItem(USER_LISTINGS_KEY);
    if (listingsJson) {
      return JSON.parse(listingsJson) as Listing[];
    }
  } catch (error) {
    console.error('Error reading user listings from localStorage:', error);
  }
  return [];
}

// Helper to save all listings to localStorage
function saveUserListings(listings: Listing[]): void {
  try {
    localStorage.setItem(USER_LISTINGS_KEY, JSON.stringify(listings));
  } catch (error) {
    console.error('Error saving user listings to localStorage:', error);
  }
}

// Function to add a new listing
// It will generate a new negative ID to avoid conflicts with existing listings
export function addUserListing(newListingData: Omit<Listing, 'id'>): Listing {
  const userListings = getUserListings();

  // Generate a new ID (negative to distinguish from sheet/CSV listings)
  let nextId = -1;
  if (userListings.length > 0) {
    const minId = Math.min(...userListings.map(l => l.id));
    if (minId < 0) { // Only consider negative IDs for decrementing
      nextId = minId - 1;
    }
  }

  const newListingWithId: Listing = {
    ...newListingData,
    id: nextId,
  };

  userListings.push(newListingWithId);
  saveUserListings(userListings);
  return newListingWithId;
}
