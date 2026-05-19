const Project = require("../models/Project");


// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      admin: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET MY PROJECTS
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id,
    })
      .populate("admin", "name email")
      .populate("members", "name email");

    res.json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE PROJECT
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("admin", "name email")
      .populate("members", "name email");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ADD MEMBER
exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.admin.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only project admin can add members",
      });
    }

    if (!project.members.includes(userId)) {
      project.members.push(userId);
    }

    await project.save();

    res.json({
      message: "Member added successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// REMOVE MEMBER
exports.removeMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.admin.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only project admin can remove members",
      });
    }

    project.members = project.members.filter(
      (memberId) => memberId.toString() !== userId
    );

    await project.save();

    res.json({
      message: "Member removed successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};