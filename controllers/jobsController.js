const createJob = async (req, res) => {
  res.status(200).send("create");
};
const getAllJobs = async (req, res) => {
  res.status(200).send("get all jobs");
};
const updateJob = async (req, res) => {
  res.status(200).send("update job");
};
const deleteJob = async (req, res) => {
  res.status(200).send("delete job");
};
const showStats = async (req, res) => {
  res.status(200).send("show Stats");
};

export { createJob, getAllJobs, updateJob, showStats, deleteJob };
