const pool = require("./pool");

async function getAllTitles() {
  const { rows } = await pool.query("SELECT title FROM games");
  return rows;
}

async function getAllGameInfo() {
  const { rows } = await pool.query(
    "SELECT DISTINCT title, dev_name, genre_name, price, stock FROM games \
    JOIN game_devs ON games.game_id = game_devs.game_id \
    JOIN devs ON game_devs.dev_id = devs.dev_id \
    JOIN game_genres ON games.game_id = game_genres.game_id \
    JOIN genres ON game_genres.genre_id = genres.genre_id \
    JOIN prices ON games.price_id = prices.price_ID;"
  )
  return rows
}

async function getSearchedInfo(searchFor, searchTerm) {
  const { rows } = await pool.query(
    `SELECT DISTINCT title, dev_name, genre_name, price, stock FROM games \
    JOIN game_devs ON games.game_id = game_devs.game_id \
    JOIN devs ON game_devs.dev_id = devs.dev_id \
    JOIN game_genres ON games.game_id = game_genres.game_id \
    JOIN genres ON game_genres.genre_id = genres.genre_id \
    JOIN prices ON games.price_id = prices.price_ID \
    WHERE ${searchFor} ILIKE '%${searchTerm}%';`
  )
  return rows
}

async function insertMessage(message, username, date) {
  await pool.query("INSERT INTO <<<tablename>>> (message, username, date) VALUES ($1, $2, $3)", [message, username, date]);
}

module.exports = {
  getAllTitles,
  insertMessage,
  getAllGameInfo,
  getSearchedInfo
};

