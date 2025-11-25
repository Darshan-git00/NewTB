// Base API configuration and utilities
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

// API error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic HTTP client wrapper
export const apiClient = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // In a real app, this would be: const response = await fetch(`${API_BASE_URL}${url}`);
      // For now, we'll simulate the response structure
      return {
        status: 'success',
        data: null as T
      };
    } catch (error) {
      throw new ApiError('Network error', 500);
    }
  },

  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      return {
        status: 'success',
        data: null as T
      };
    } catch (error) {
      throw new ApiError('Network error', 500);
    }
  },

  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      return {
        status: 'success',
        data: null as T
      };
    } catch (error) {
      throw new ApiError('Network error', 500);
    }
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      return {
        status: 'success',
        data: null as T
      };
    } catch (error) {
      throw new ApiError('Network error', 500);
    }
  }
};

// Utility function to simulate API responses with mock data
export const createMockApiCall = <T>(mockData: T, delay: number = 500) => {
  return async (): Promise<ApiResponse<T>> => {
    await new Promise(resolve => setTimeout(resolve, delay));
    return {
      status: 'success',
      data: mockData
    };
  };
};
