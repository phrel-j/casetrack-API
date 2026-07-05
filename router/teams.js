import express from "express";
import { prisma } from '../db.js';
import { authMiddleware } from "../middleware/auth.js";
import {createTeamSchema, updateTeamSchema} from "../schema/team.schema.js";
import { validate } from "../middleware/validate.js";
import * as teamController from "../services/team.service.js";
import { errorHandler } from '../middleware/errorHandler.js';

const router = express.Router();

router.post('/', authMiddleware, validate(createTeamSchema), teamController.createTeam);
router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);
router.put('/:id', authMiddleware, validate(updateTeamSchema), teamController.updateTeam);
router.delete('/:id', authMiddleware, teamController.deleteTeam);
  export default router;

