import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please company name"],
    maxlength: 100,
   
  },

  position: {
    type: String,
    required: [true, "Please provide postion"],
    maxlength: 100,
  },
  
  
  status: {
    type: String,
   enum: ['interview', 'declined','pending'],
   default: 'pending'
  },

  jobType: {
    type: String,
   enum: ['full-time', 'part-time','remote','intership'],
   default: 'full-time'
  },

  jobLocation: {
    type: String,
   default: 'my city',
   required: true,
  },

  createdBy: {
    type: mongoose.Types.ObjectId,
   ref: 'User',
   required: [true,'please provide user']
  },
},
{timestamps: true}

)
  

export default mongoose.model("Job", JobSchema);
