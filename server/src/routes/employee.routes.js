import express from 'express';
import Employee from '../models/employee.model';
import { getEmployees } from '../services/employee.service';
const employeeRouter = express.Router();
//const Employee = require('../models/employee.model');

/* Get all Employees */
employeeRouter.post('/', async (req, res, next) => {
  try {
    const result = await getEmployees(req.query, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default employeeRouter;