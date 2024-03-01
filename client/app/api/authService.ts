// Importing axios library for making HTTP requests
import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:3001/auth/login';

export const LoginService = async (authData: any) => {
    // Send a GET request to the API endpoint to retrieve all projects
    const response = await axios.post(API_BASE_URL, authData);
    // Return the data received from the API
    return response.data;
  };