const API_BASE_URL = 'http://localhost:8000';

interface LoginResponse {
  user: {
    _id: string;
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role: string;
    name?: string;
  };
  token: string;
}

interface Location {
  _id: string;
  name: string;
  description?: string;
  street?: string;
  zip?: string;
  city?: string;
  country?: string;
  category?: string;
  danger?: string;
  temporary?: boolean;
  time_category?: string;
  latitude?: number;
  longitude?: number;
  image?: string;
  tags?: string[];
  user?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}

class ApiService {
  private getAuthHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  async register(userData: {
    username: string;
    password: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  }): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  }

  async getLocations(): Promise<Location[]> {
    const response = await fetch(`${API_BASE_URL}/locations`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }

    return response.json();
  }

  async getLocation(id: string): Promise<Location> {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }

    return response.json();
  }

  async createLocation(locationData: FormData, token: string): Promise<Location> {
    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: locationData,
    });

    if (!response.ok) {
      throw new Error('Failed to create location');
    }

    return response.json();
  }

  async updateLocation(id: string, locationData: FormData, token: string): Promise<Location> {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: locationData,
    });

    if (!response.ok) {
      throw new Error('Failed to update location');
    }

    return response.json();
  }

  async deleteLocation(id: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete location');
    }
  }
}

export const apiService = new ApiService();
export type { Location, LoginResponse };