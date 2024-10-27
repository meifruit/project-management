import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjects,
} from "../controllers/projectController";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.delete("/", deleteProject);
export default router;
