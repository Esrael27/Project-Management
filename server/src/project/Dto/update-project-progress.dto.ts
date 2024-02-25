import { z } from 'zod';

export const UpdateProjectProgressDto = z.object({
  progress: z.number().int().min(0).max(100),
});

export type UpdateProjectProgressDtoType = z.infer<typeof UpdateProjectProgressDto>;
