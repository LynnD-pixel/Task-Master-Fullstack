import express from 'express';
import Project from "../../models/Project.js";
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

//Create Project
router.post("/", authMiddleware, async (req, res) => {
    console.log("REQ.USER:", req.user);
    const { name, description } = req.body;

    try {
        const project = await Project.create({
            name, 
            description,
            user: req.user._id,
        });
        res.status(201).json(project);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});

//Get All Projects
router.get("/", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user._id });

        res.json(projects);
    } catch (err) {
        res.status(401).json({ message: err.message })
    }
});


// Get a Single PROJECT
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // checks for ownership 
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(project);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// Update PROJECT
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;

    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// Delete PROJECT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await project.deleteOne();

    res.json({ message: "Project removed" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

export default router;