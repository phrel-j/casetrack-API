import { z } from 'zod';

export const createTeamSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters'),
});

export const updateTeamSchema = z.object({
  name: z.string().min(2).optional(),
});