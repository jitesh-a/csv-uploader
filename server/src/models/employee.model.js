// Employee.model.js
import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';
import employeeRouter from '../routes/employee.routes';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String
  },
  dateOfBirth: {
    type: String
  },
  reportingManager: {
    type: String
  },
  salary: {
    type: String
  },
  department: {
    type: String
  },
  uploadsId: {
    type: String,
    index: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});
employeeSchema.plugin(normalize);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
