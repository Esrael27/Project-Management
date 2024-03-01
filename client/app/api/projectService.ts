// Importing axios library for making HTTP requests
import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:3001/api/projects'; // Update with your backend URL

// Function to get all projects
export const getAllProjects = async () => {
  // Send a GET request to the API endpoint to retrieve all projects
  const response = await axios.get(API_BASE_URL);
  // Return the data received from the API
  return response.data;
};

// Function to get a project by its ID
export const getProjectById = async (projectId: string) => {
  // Send a GET request to the API endpoint with the specified project ID
  const response = await axios.get(`${API_BASE_URL}/${projectId}`);
  // Return the data received from the API
  return response.data;
};

// Function to create a new project
export const createProject = async (projectData: any) => {
  // Send a POST request to the API endpoint with the project data
  const response = await axios.post(API_BASE_URL, projectData);
  // Return the data received from the API
  return response.data;
};

// Function to update an existing project
export const updateProject = async (projectId: string, projectData: any) => {
  // Send a PUT request to the API endpoint with the project ID and updated data
  const response = await axios.put(`${API_BASE_URL}/${projectId}`, projectData);
  // Return the data received from the API
  return response.data;
};

// Function to delete a project by its ID
export const deleteProject = async (projectId: string) => {
  // Send a DELETE request to the API endpoint with the project ID
  const response = await axios.delete(`${API_BASE_URL}/${projectId}`);
  // Return the data received from the API
  return response.data;
};
