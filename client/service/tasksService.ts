// services/projectService.ts

import axios from 'axios';



const API_BASE_URL = 'http://localhost:3001/api/projects'; // Update with your backend URL

export const getAllTasks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;

};

export const getTaskById = async (projectId: string ,taskId: string) => {
  const response = await axios.get(`${API_BASE_URL}/${projectId}/${taskId}`);
  return response.data;
};

export const createTask= async (projectId: string,taskData: any) => {
  const response = await axios.post(`API_BASE_URL/${projectId}`, taskData);
  return response.data;
};

export const updateTask= async (taskId: string, taskData: any) => {
  const response = await axios.put(`${API_BASE_URL}/${taskId}`, taskData);
  return response.data;
};

export const deleteTask= async (taskId: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${taskId}`);
  return response.data;
};
