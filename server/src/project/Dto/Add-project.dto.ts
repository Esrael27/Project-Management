import { z } from 'zod';

// Define the AddProjectDto schema
export const AddProjectDto = z.object({
  name: z.string().min(3).max(80),
  description: z.string().max(255),
  status: z.enum(['PLANNED']),// Add status enum field
});

// Infer the type of AddProjectDto
export type AddProjectDto = z.infer<typeof AddProjectDto>;
