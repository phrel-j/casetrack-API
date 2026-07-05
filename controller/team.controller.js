import * as teamService from '../services/team.service.js';

export async function createTeam(req, res, next) {
  try {
    const team = await teamService.createTeam(req.body.name, req.user.userId);
    res.status(201).json(team);
  } catch (err) {
    next(err);
  }
}

export async function getAllTeams(req, res, next) {
  try {
    const teams = await teamService.getAllTeams();
    res.status(200).json(teams);
  } catch (err) {
    next(err);
  }
}

export async function getTeamById(req, res, next) {
  try {
    const team = await teamService.getTeamById(parseInt(req.params.id));
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.status(200).json(team);
  } catch (err) {
    next(err);
  }
}

export async function updateTeam(req, res, next) {
  try {
    const team = await teamService.updateTeam(
      parseInt(req.params.id),
      req.body,
      req.user.userId
    );
    res.status(200).json(team);
  } catch (err) {
    next(err);
  }
}

export async function deleteTeam(req, res, next) {
  try {
    await teamService.deleteTeam(parseInt(req.params.id), req.user.userId);
    res.status(200).json({ message: 'Team deleted' });
  } catch (err) {
    next(err);
  }
}