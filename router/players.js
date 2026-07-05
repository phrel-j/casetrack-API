import express from 'express';
import { prisma } from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { name, position, teamId } = req.body;

    if (!name || !position || !teamId) {
      return res.status(400).json({ error: 'name, position and teamId are required' });
    }

    const player = await prisma.player.create({
      data: { name, position, teamId: parseInt(teamId) },
    });
    res.status(201).json(player);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// READ all
router.get('/', async (req, res) => {
  const players = await prisma.player.findMany();
  if (!players) {return res.status(404).json({ error: 'No players found' });}
  res.status(200).json(players);
});

// READ one
router.get('/:id', async (req, res) => {
  const player = await prisma.player.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!player) return res.status(404).json({ error: 'Player not found' });
  res.status(200).json(player);
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const player = await prisma.player.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json(player);
  } catch (err) {
    res.status(404).json({ error: 'Player not found' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await prisma.player.delete({ where: { id: parseInt(req.params.id) } });
    res.status(200).json({ message: 'Player deleted' });
  } catch (err) {
    res.status(404).json({ error: 'Player not found' });
  }
});

export default router;