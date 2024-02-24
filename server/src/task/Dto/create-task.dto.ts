import { z } from 'zod';


export const CreateTaskDto = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.enum(['PLANNED']),     // Use the TaskStatus enum for status validation
    priority: z.enum(['MEDIUM']), // Use the TaskPriority enum for priority validation
});

export type CreateTaskDto = z.infer<typeof CreateTaskDto>;
