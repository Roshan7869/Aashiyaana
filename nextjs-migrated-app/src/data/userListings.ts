import type { Listing } from './spreadsheetData';

const USER_LISTINGS_KEY = 'userAddedListings';

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

function saveUserListings(listings: Listing[]): void {
  try {
    localStorage.setItem(USER_LISTINGS_KEY, JSON.stringify(listings));
  } catch (error) {
    console.error('Error saving user listings to localStorage:', error);
  }
}

export function addUserListing(newListingData: Omit<Listing, 'id'>): Listing {
  const userListings = getUserListings();

  let nextId = -1; // Default for first item if others are positive or empty
  if (userListings.length > 0) {
    // Find the minimum ID among existing listings. If it's negative, decrement.
    // If all are positive, this will result in -1.
    const numericIds = userListings.map(l => parseInt(String(l.id), 10)).filter(id => !isNaN(id));
    if (numericIds.length > 0) {
      const minId = Math.min(...numericIds);
      if (minId < 0) {
        nextId = minId - 1;
      }
    }
    // If all existing IDs are positive or non-numeric, nextId remains -1.
  }


  const newListingWithId: Listing = {
    ...newListingData,
    id: String(nextId), // Ensure ID is a string as per Listing type
  };

  userListings.push(newListingWithId);
  saveUserListings(userListings);
  return newListingWithId;
}
