import express from "express";
import Task from "../../models/Task.js";
import Project from "../../models/Project.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();


// Create TASK in project
router.post("/projects/:projectId/tasks", authMiddleware, async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      project: project._id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

//
// Gets TASKS for a PROJECT
router.get("/projects/:projectId/tasks", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const tasks = await Task.find({ project: project._id });

    res.json(tasks);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// Update TASK 
router.put("/tasks/:taskId", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Finds parent project
    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update 
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// Delete TASK
router.delete("/tasks/:taskId", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task removed" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

export default router;