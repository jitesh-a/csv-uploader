import Uploads from '../models/uploads.model';

import csv from 'csv-parse';
import fs from 'fs';
import Employee from '../models/employee.model';

export const getUploads = async () => {
  return await Uploads.find({ isActive: true }).sort({ 'createdAt': 'desc' }).exec();
}

const insertDataInDb = async (data, docId) => {
  const model = new Employee({
    name: data[0],
    age: data[1],
    dateOfBirth: data[2],
    reportingManager: data[3],
    salary: data[4],
    department: data[5],
    uploadsId: docId
  });
  try {
    await model.save();
  } catch (error) {
    // TODO - Save errors in db
    console.error(error);
  }
}
// method to process csv
export const processCsv = (filePath, docId) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv({ fromLine: 2, autoParse: true }))
    .on('data', async data => await insertDataInDb(data, docId))
    .on('error', (err) => {
      console.error(err.message);
    })
    .on('end', async () => {
      const upload = await Uploads.findOne(docId);
      upload.processing = false;
      await upload.save();
    });
}

// upload file
export const uploadFile = (req) => {
  const uploadFile = req.files.file;
  const fileName = req.files.file.name;
  const fileType = req.files.file.mimetype;
  const fileSize = req.files.file.size;

  // check for file type
  if (fileType !== 'text/csv') {
    throw new Error('Invalid file type');
  } // check for file fileSize
  else if (fileSize > 100000) {
    throw new Error('File size exceeds maximum allowed size');
  } 
  else {
    return new Promise((resolve, reject) => {
      const TARGET_PATH = `${__dirname}/../public/uploads/${Date.now()}_${fileName}`;
      uploadFile.mv(
        TARGET_PATH,
        async function (err) {
          if (err) {
            reject(err);
          }
          // create entry in db
          try {
            const res = await Uploads.insertMany({
              fileName,
              filePath: TARGET_PATH,
              processing: true
            });

            // start csv processing in background
            processCsv(TARGET_PATH, res[0]._id);
            resolve(res);
          } catch (error) {
            reject(error);
          }
          // .then(result => resolve(result)).catch(err => reject(err));
        },
      )
    })

  }
}