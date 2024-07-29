import { Router } from 'express';

const chillSpotRouter = Router();
const textRouter = Router();

import {
  getAllChillSpots,
  getSpecificChillSpot,
  createChillSpot,
  editChillSpot,
  deleteChillSpot,
  getFooterText,
} from './controllers';

chillSpotRouter
  .route('/chill-spot')
  .get(getAllChillSpots)
  .post(createChillSpot);

chillSpotRouter
  .route('/chill-spot/:id')
  .get(getSpecificChillSpot)
  .patch(editChillSpot)
  .delete(deleteChillSpot);

textRouter.route('/footer-text').get(getFooterText);

export default { chillSpotRouter, textRouter };
