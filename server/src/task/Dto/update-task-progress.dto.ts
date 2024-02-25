import { z } from 'zod';

export const UpdateTaskProgressDto = z.object({
  progress: z.number().int().min(0).max(100),
});

export type UpdateTaskProgressDtoType = z.infer<typeof UpdateTaskProgressDto>;
