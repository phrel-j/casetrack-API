import { prisma } from '../db.js';

export async function createTeam(name, ownerId) {
  return prisma.team.create({ data: { name, ownerId } });
}

export async function getAllTeams() {
  return prisma.team.findMany({ include: { players: true, matches: true } });
}

export async function getTeamById(id) {
  return prisma.team.findUnique({
    where: { id },
    include: { players: true, matches: true },
  });
}

export async function updateTeam(id, data, requesterId) {
  const team = await prisma.team.findUnique({ where: { id } });
  if (!team) {
    const err = new Error('Team not found');
    err.status = 404;
    throw err;
  }
  if (team.ownerId !== requesterId) {
    const err = new Error('You do not own this team');
    err.status = 403;
    throw err;
  }
  return prisma.team.update({ where: { id }, data });
}

export async function deleteTeam(id, requesterId) {
  const team = await prisma.team.findUnique({ where: { id } });
  if (!team) {
    const err = new Error('Team not found');
    err.status = 404;
    throw err;
  }
  if (team.ownerId !== requesterId) {
    const err = new Error('You do not own this team');
    err.status = 403;
    throw err;
  }
  return prisma.team.delete({ where: { id } });
}