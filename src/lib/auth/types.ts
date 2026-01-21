// Authentication types based on the documentation

// User type
export interface User {
  userId: string;
  wallet: string;
  createdAt: number;
  updatedAt: number;
}

// Auth tokens type
export interface AuthTokens {
  userId: string;
  wallet: string;
  accessToken: string;
  refreshToken: string;
}
