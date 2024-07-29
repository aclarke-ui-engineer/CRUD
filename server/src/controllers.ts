import { Request, Response } from 'express';
import DatabaseInstance, { Database } from './db';
import { request } from 'http';

export const getAllChillSpots = async (
  request: Request,
  response: Response
) => {
  try {
    const chillSpots = await DatabaseInstance.getChillSpots();
    if (chillSpots.length === 0)
      return response.status(404).send('No chill spot found');
    response.status(200).json(chillSpots);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
};

export const getSpecificChillSpot = async (
  request: Request,
  response: Response
) => {
  try {
    const id = request.params.id;
    const chillSpot = await DatabaseInstance.getChillSpotById(id);
    if (!chillSpot)
      return response.status(404).json({ error: 'chill spot not found' });
    response.status(200).json(chillSpot);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
};

export const createChillSpot = async (request: Request, response: Response) => {
  try {
    console.log(request.body, 'TTTT');
    const { name, location, description, rating, entryCost, establishedSince } =
      request.body;
    if (!name || !location || !description || !rating || !establishedSince)
      return response.status(400).json({ error: 'Invalid chill spot data' });

    const chillSpot = {
      id: `${Math.floor(Math.random() * 1000000)}`,
      name,
      location,
      description,
      rating: +rating,
      entryCost,
      establishedSince,
    };

    await DatabaseInstance.createChillSpot(chillSpot);

    response.status(201).json(chillSpot);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
};

export const editChillSpot = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    const chillSpot = await DatabaseInstance.getChillSpotById(id);

    if (!chillSpot)
      return response.status(404).json({ error: 'Chill spot not found' });

    if (
      !request.body.name &&
      !request.body.location &&
      !request.body.description &&
      !request.body.rating &&
      !request.body.entryCost &&
      !request.body.establishedSince
    )
      return response.status(400).json({ error: 'Invalid chill spot data' });

    const updatedChillSpot = {
      id: chillSpot.id,
      name: request.body.name || chillSpot.name,
      location: request.body.location || chillSpot.location,
      description: request.body.description || chillSpot.description,
      rating: Number(request.body.rating) || chillSpot.rating,
      entryCost: request.body.entryCost || chillSpot.entryCost,
      establishedSince:
        request.body.establishedSince || chillSpot.establishedSince,
    };
    await DatabaseInstance.editChillSpotById(id, updatedChillSpot);
    response.status(200).json(updatedChillSpot);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteChillSpot = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    const wasDeleted = await DatabaseInstance.deleteChillSpotById(id);
    if (!wasDeleted)
      return response.status(404).json({ error: 'Chill spot not found' });
    response.status(200).json({ message: 'Chill spot deleted' });
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
};

export const getFooterText = (request: Request, response: Response) => {
  response.status(200).send('© 2025 Chill Spot');
};
