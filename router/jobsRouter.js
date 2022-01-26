import {
  createJob,
  getAllJobs,
  updateJob,
  showStats,
  deleteJob,
} from "../controllers/jobsController.js";

import express from "express";

const router = express.Router();

router.route("/").get(getAllJobs);
router.route("/").post(createJob);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob);
router.route("/:id").patch(updateJob);

export default router;
