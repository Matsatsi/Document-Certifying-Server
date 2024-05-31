const pool = require("../connection/pool");
const userModel = require("./user-model");
const docModel = require("./doc-model");

class App {
  async getAdminStats() {
    const admins = await userModel.getAdmins();
    const certifiers = await userModel.getCertifiers();
    const users = await userModel.getUsers();
    const rows = [
      {
        name: "admin",
        user_count: admins?.length,
      },
      {
        name: "certifier",
        user_count: certifiers?.length,
      },
      {
        name: "Certifyee",
        user_count: users?.length,
      },
    ];
    return rows;
  }

  async getCertifierStats(id) {
    const docs = await docModel.getDocsByCertifier(id);
    const totalDocsAssigned = docs?.length;
    const certifiedDocs = docs.filter((doc) => doc.status === "certified");
    const totalDocsCertified = certifiedDocs?.length;
    const pendingDocs = docs.filter((doc) => doc.status === "pending");
    const totalDocsPending = pendingDocs?.length;

    const rows = [
      {
        name: "Documents",
        doc_count: totalDocsAssigned,
        description: "Documents assigned to the certifier",
      },

      {
        name: "Pending Documents",
        doc_count: totalDocsPending,
        description: "Documents pending certification",
      },
      {
        name: "Certified Documents",
        doc_count: totalDocsCertified,
        description: "Documents certified by the certifier",
      },
    ];
    return rows;
  }

  async getUserStats(id) {
    const docs = await docModel.getDocsByClient(id);
    const rejectedDocs = docs.filter((doc) => doc.status === "rejected");
    const certifiedDocs = docs.filter((doc) => doc.status === "certified");
    const rows = [
      {
        name: "Documents",
        doc_count: docs?.length,
        description: "Uploaded documents",
      },
      {
        name: "Action Needed",
        doc_count: rejectedDocs?.length,
        description: "Documents that need attention",
      },
      {
        name: "Certified Documents",
        doc_count: certifiedDocs?.length,
        description: "Documents that have been certified",
      },
    ];
    return rows;
  }
}

module.exports = new App();
