import {z} from zod;

export const createPlayerSchema = z.object({
  name: z.string().min(2, 'Player name must be at least 2 characters'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  teamId: z.number().int().positive('Team ID must be a positive integer'),
});

export const updatePlayerSchema = z.object({
  name: z.string().min(2).optional(),
  position: z.string().min(2).optional(),
  teamId: z.number().int().positive().optional(),
});
