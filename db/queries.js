const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM <<<tablename>>>");
  return rows;
}

async function insertMessage(message, username, date) {
  await pool.query("INSERT INTO <<<tablename>>> (message, username, date) VALUES ($1, $2, $3)", [message, username, date]);
}

module.exports = {
  getAllMessages,
  insertMessage
};
