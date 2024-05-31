const pool = require("../connection/pool");

// interact with the users table in the database and model how you return the data for web consumption
class User {
  getUserType = (userType) =>
    `${userType.toLowerCase() === "certifyee" ? "client" : userType}`;

  async getUsers() {
    const query = "SELECT * FROM clients;";
    const { rows } = await pool.query(query);
    return rows;
  }

  async getAdmins() {
    const query = "SELECT * FROM admins WHERE user_type='admin';";
    const { rows } = await pool.query(query);
    return rows;
  }

  async getCertifiers() {
    const query = "SELECT * FROM certifiers;";
    const { rows } = await pool.query(query);
    return rows;
  }

  async getUser(id, userType) {
    const query = `SELECT * FROM ${this.getUserType(
      userType
    )}s WHERE user_id = $1;`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async createUser(user, userType) {
    const query = `INSERT INTO ${this.getUserType(
      userType
    )}s (first_name, last_name, username, email, phone, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    const { rows } = await pool.query(query, [
      user.first_name,
      user.last_name,
      user.username,
      user.email,
      user.phone,
      user.password,
    ]);
    return rows[0];
  }

  async updateUser(user, userType) {
    const query = `UPDATE ${this.getUserType(
      userType
    )}s SET username = $1, email = $2, password = $3, phone = $4, first_name = $5, last_name = $6 WHERE user_id = $7 RETURNING *;`;
    const { rows } = await pool.query(query, [
      user.username,
      user.email,
      user.password,
      user.phone,
      user.first_name,
      user.last_name,
      user.id,
    ]);
    return rows[0];
  }

  async deleteUser(id, userType) {
    const query = `DELETE FROM ${this.getUserType(
      userType
    )}s WHERE user_id = $1;`;
    await pool.query(query, [id]);
  }

  async authenticateUser(email, password, userType) {
    const query = `SELECT * FROM ${this.getUserType(
      userType
    )}s WHERE (email = $1 OR username = $1) AND password = $2;`;
    const { rows } = await pool.query(query, [email, password]);
    return rows[0];
  }

  async getTotalNumberOfSystemUsers() {
    const totalAdmins = (await this.getAdmins()).length;
    const totalCertifiers = (await this.getCertifiers()).length;
    const totalUsers = (await this.getUsers()).length;
    return totalAdmins + totalCertifiers + totalUsers;
  }
}

module.exports = new User();
