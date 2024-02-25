import { z } from 'zod';

export const SetDeadlineDto = z.object({
  deadline: z.date(),
});

export type SetSetDeadlineDto = z.infer<typeof SetDeadlineDto>;
