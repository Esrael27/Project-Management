// pages/api/projects/[id].ts

// Import necessary dependencies
import { NextApiRequest, NextApiResponse } from 'next';
import { getProjectById, updateProject, deleteProject } from '../../service/projectService';

// Handler function for GET request to retrieve a specific project by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract project ID from the request parameters
  const { id } = req.query;
  
  try {
    // Call the service function to get the project by ID
    const project = await getProjectById(id as string);
    
    // Respond with the project data
    res.status(200).json(project);
  } catch (error) {
    // If an error occurs, respond with a 404 error
    res.status(404).json({ message: 'Project not found' });
  }
}

// Handler function for PUT request to update a project by ID
export async function putHandler(req: NextApiRequest, res: NextApiResponse) {
  // Extract project ID from the request parameters
  const { id } = req.query;

  // Extract updated project data from the request body
  const { name } = req.body;

  try {
    // Call the service function to update the project
    await updateProject(id as string, { name });
    
    // Respond with a success message
    res.status(200).json({ success: true, message: 'Project updated successfully' });
  } catch (error) {
    // If an error occurs, respond with a 404 error
    res.status(404).json({ success: false, message: 'Project not found' });
  }
}

// Handler function for DELETE request to delete a project by ID
export async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
  // Extract project ID from the request parameters
  const { id } = req.query;

  try {
    // Call the service function to delete the project
    await deleteProject(id as string);
    
    // Respond with a success message
    res.status(204).end();
  } catch (error) {
    // If an error occurs, respond with a 404 error
    res.status(404).json({ message: 'Project not found' });
  }
}
