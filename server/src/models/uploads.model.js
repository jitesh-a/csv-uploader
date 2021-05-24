// Uploads.model.js
import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';

const uploadsSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  userId: {
    type: String
  },
  processing: {
    type: Boolean,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});
uploadsSchema.plugin(normalize);

const Uploads = mongoose.model("Uploads", uploadsSchema);
export default Uploads;
