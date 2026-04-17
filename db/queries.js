const pool = require("./pool");

async function getAllTitles() {
  const { rows } = await pool.query("SELECT title FROM games");
  return rows;
}

async function insertMessage(message, username, date) {
  await pool.query("INSERT INTO <<<tablename>>> (message, username, date) VALUES ($1, $2, $3)", [message, username, date]);
}

module.exports = {
  getAllTitles,
  insertMessage
};
