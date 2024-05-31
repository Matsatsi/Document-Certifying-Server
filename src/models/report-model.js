const pool = require("../connection/pool");
const userModel = require("./user-model");

class Report {
  async usersReport() {
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
        name: "certifyee",
        user_count: users?.length,
      },
    ];

    const total = rows.reduce((acc, row) => acc + row.user_count, 0);
    return rows.map((row) => ({
      ...row,
      percent: (row.user_count / total) * 100,
    }));
  }
}

module.exports = new Report();
