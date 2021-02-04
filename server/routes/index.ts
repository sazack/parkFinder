import * as express from 'express';
import {ParkModelClass} from '../service/parks';

const router = express.Router();

router.get('/parks', async (request, response) => {
  // @ts-ignore
  const parkModelClass = new ParkModelClass();
  parkModelClass.getAllParks().then(result => {
    response.json(result);
  });
  // await response.json(parkData);
});

export const myRouter = router;
