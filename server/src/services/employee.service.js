import Employee from '../models/employee.model';

export const getEmployees = async ({ uploadsId = '60aa14c91b0fad52db694ee1', searchValue = '', skip = 0, limit = 10, sortKey = 'name', sortOrder = 'asc' }, filters = []) => {
  var regex = new RegExp(searchValue, 'i');

  skip = parseInt(skip) || 0;
  limit = parseInt(limit) || 10;

  // filters
  const _filters = { uploadsId };
  if (filters?.length) {
    // TODO logic for multiple filters (and/or)
    filters.forEach(({ columnField, operatorValue, value }) => {
      if (operatorValue === 'contains') {
        _filters[columnField] = new RegExp(value, 'i');
      } else {
        _filters[columnField] = value
      }
    });
  }

  // data
  const data = await Employee.find(_filters)
    .or([{ 'name': { $regex: regex } },
    { 'age': { $regex: regex } },
    { 'dateOfBirth': { $regex: regex } },
    { 'reportingManager': { $regex: regex } },
    { 'salary': { $regex: regex } },
    { 'department': { $regex: regex } }])
    .sort({ [sortKey]: sortOrder })
    .skip(skip)
    .limit(limit)
    .exec();

  // count
  const totalRecords = await Employee.find(_filters)
    .or([{ 'name': { $regex: regex } },
    { 'age': { $regex: regex } },
    { 'dateOfBirth': { $regex: regex } },
    { 'reportingManager': { $regex: regex } },
    { 'salary': { $regex: regex } },
    { 'department': { $regex: regex } }])
    .countDocuments()
    .exec()

  return {
    data,
    totalRecords
  }
}