import { z } from 'zod';

// Define the CreateIssueDto schema
export const CreateIssueDto = z.object({
  title: z.string().min(3).max(255),
  description: z.string().max(255).optional(),
  status: z.enum(['OPEN']),
});

// Infer the type of CreateIssueDto
export type CreateIssueDto= z.infer<typeof CreateIssueDto>;
