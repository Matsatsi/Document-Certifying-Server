const e = require("express");
const appModel = require("../models/app-model");

const getAdminStats = async (req, res) => {
  try {
    const stats = await appModel.getAdminStats();
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserStats = async (req, res) => {
  const { id } = req.params;
  try {
    const stats = await appModel.getUserStats(id);
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCertifierStats = async (req, res) => {
  const { id } = req.params;
  try {
    const stats = await appModel.getCertifierStats(id);
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAdminStats,
  getUserStats,
  getCertifierStats,
};
