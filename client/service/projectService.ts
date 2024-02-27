import axios from 'axios';


const API_BASE_URL = 'http://localhost:3001/api/projects'; // Update with your backend URL

export const getAllProjects = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;

};

export const getProjectById = async (projectId: string) => {
  const response = await axios.get(`${API_BASE_URL}/${projectId}`);
  return response.data;
};

export const createProject = async (projectData: any) => {
  const response = await axios.post(API_BASE_URL, projectData);
  return response.data;
};

export const updateProject = async (projectId: string, projectData: any) => {
  const response = await axios.put(`${API_BASE_URL}/${projectId}`, projectData);
  return response.data;
};

export const deleteProject = async (projectId: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${projectId}`);
  return response.data;
};
