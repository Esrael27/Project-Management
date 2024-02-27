// pages/api/projects/new.ts

import { NextApiRequest, NextApiResponse } from 'next';

// Import your backend service or client
import { createTask } from '../../../service/tasksService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Extract project data from the request body
      const { name, description ,status } = req.body;

      // Call your backend service function to create a new project
      const newTask = await createTask({ name, description,status });

      // Return the newly created project as a response
      res.status(201).json(newTask);
    } catch (error) {
      // Handle any errors and return an error response
      res.status(500).json({ error: 'Failed to create Task' });
    }
  } else {
    // Return a 405 Method Not Allowed error if the request method is not supported
    res.status(405).end();
  }
}
