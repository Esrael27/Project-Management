// pages/api/projects/update.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { updateProject } from '../../../service/projectService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      // Extract project ID from the request URL
      const { projectId } = req.query;

      // Parse the project ID as a string
      const projectIdString = projectId as string;

      // Extract the updated project data from the request body
      const { name, description } = req.body;

      // Call the updateProject function from the service layer to update the project
      await updateProject(projectIdString, { name, description });

      // Return a success response
      res.status(200).json({ success: true, message: 'Project updated successfully' });
    } catch (error) {
      // Return an error response if an error occurs
      console.error('Error updating project:', error);
      res.status(500).json({ success: false, message: 'Failed to update project' });
    }
  } else {
    // Return a 405 Method Not Allowed error if the request method is not supported
    res.status(405).end();
  }
}
