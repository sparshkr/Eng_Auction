const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const ROUTES = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    // LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  AUCTIONS: {
    BASE: `${API_BASE_URL}/auctions`,
    CREATE: `${API_BASE_URL}/auctions`,
    GET_ALL: `${API_BASE_URL}/auctions`,
    GET_ACTIVE: `${API_BASE_URL}/auctions/active`,
    GET_BY_ID: (id: string | number) => `${API_BASE_URL}/auctions/${id}`,
    UPDATE: (id: string | number) => `${API_BASE_URL}/auctions/${id}`,
    DELETE: (id: string | number) => `${API_BASE_URL}/auctions/${id}`,
  },
  BIDS: {
    BASE: `${API_BASE_URL}/bids`,
    PLACE_BID: `${API_BASE_URL}/bids`,
    // GET_BY_AUCTION_ID: (auctionId: string | number) => `${API_BASE_URL}/bids?auctionId=${auctionId}`,
  },
  PRODUCTS: {
    BASE: `${API_BASE_URL}/products`,
    CREATE: `${API_BASE_URL}/products`,
    GET_ALL: `${API_BASE_URL}/products`,
    GET_BY_ID: (id: string | number) => `${API_BASE_URL}/products/${id}`,
    UPDATE: (id: string | number) => `${API_BASE_URL}/products/${id}`,
    DELETE: (id: string | number) => `${API_BASE_URL}/products/${id}`,
  },
};
