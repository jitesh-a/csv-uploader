import express from 'express';
import Uploads from '../models/uploads.model';
import { getUploads, uploadFile } from '../services/uploads.service';
const uploadsRouter = express.Router();
//const Uploads = require('../models/uploads.model');

/* Get all Uploads */
uploadsRouter.get('/', async (req, res, next) => {
  try {
    const result = await getUploads(req);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

/* CSV upload */
uploadsRouter.post('/', async (req, res, next) => {
  try {
    const result = await uploadFile(req);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export default uploadsRouter;