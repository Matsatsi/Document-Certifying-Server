const reportModel = require("../models/report-model");
const docModel = require("../models/doc-model");
const userModel = require("../models/user-model");

const usersReport = async (req, res) => {
  try {
    const report = await reportModel.usersReport();
    res.json({ report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fullReport = async (req, res) => {
  try {
    const userStatReport = await reportModel.usersReport();
    const requestsToday = await docModel.getNumDocsCreatedToday();
    const requestsThisMonth = await docModel.getNumDocsCreatedThisMonth();
    const totalRequests = await docModel.getTotalDocs();
    const totalUsers = await userModel.getTotalNumberOfSystemUsers();

    res.json({
      fullReport: {
        userStatReport,
        requestsToday,
        requestsThisMonth,
        totalRequests,
        totalUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  usersReport,
  fullReport,
};
