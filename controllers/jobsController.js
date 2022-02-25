import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes';
import { BadRequestError,UnAuthenticatedError } from "../errors/index.js";


const createJob = async (req, res) => {
  const {position,company} = req.body

  if(!position || !company){
    throw new BadRequestError('please provide all values')
  }

  req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})

 
};
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({createdBy: req.user.userId})
  res.status(StatusCodes.OK).json({jobs, totalJobs: jobs.length, numOfPages: 1 });
};


const updateJob = async (req, res) => {
  const{id: jobId} = req.params
  const {company, position} = req.body
  if(!position || !company){
    throw new BadRequestError('please provide all values')
  }

  const ob = await Job.findOne({_id: jobId})

  res.status(200).send("update job");
};
const deleteJob = async (req, res) => {
  res.status(200).send("delete job");
};
const showStats = async (req, res) => {
  res.status(200).send("show Stats");
};

export { createJob, getAllJobs, updateJob, showStats, deleteJob };
