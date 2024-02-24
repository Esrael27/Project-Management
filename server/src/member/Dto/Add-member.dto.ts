
import { z } from 'zod';

// Define the AddProjectDto schema
export const AddMemberDto = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(), // In a real-world scenario, you might not include the password in the DTO
    role: z.enum(['ADMIN', 'MEMBER'])
});

// Infer the type of AddProjectDto
export type AddMemberDto = z.infer<typeof AddMemberDto>;


