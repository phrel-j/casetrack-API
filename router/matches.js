import express from 'express';
import {prisma} from '../db.js';

const router = express.Router();

// CREATE match
router.post('/', async (req, res) => {
    try {
        const { teamA, teamB, date } = req.body;
        if (!teamA || !teamB || !date) {
            return res.status(400).json({ error: 'teamA, teamB and date are required' });
        }
        const newMatch = await prisma.match.create({
            data: { teamA, teamB, date },
        });
        res.status(201).json(newMatch);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create match' });
    }
});

// READ all (Added async here)
router.get('/', async (req, res) => {
    try {
        const matches = await prisma.match.findMany();
        res.status(200).json(matches); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
});

// READ one (Added async here)
router.get('/:id', async (req, res) => {
    try {
        const match = await prisma.match.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        
        if (!match) return res.status(404).json({ error: 'Match not found' });
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch match' });
    }
});

// UPDATE (Added async here and handled Prisma non-existent errors)
router.put('/:id', async (req, res) => {
    try {
        const match = await prisma.match.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        res.status(200).json(match);
    } catch (error) {
        // Prisma throws a target error if record isn't found
        res.status(404).json({ error: 'Match not found or failed to update' });
    }
});

// DELETE (Added async here and handled Prisma non-existent errors)
router.delete('/:id', async (req, res) => {
    try {
        const match = await prisma.match.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(200).json({ message: 'Match deleted successfully', match });
    } catch (error) {
        res.status(404).json({ error: 'Match not found or failed to delete' });
    }
});

export default router;