const pool = require("./pool");

// async function getAllGameInfo() {
//   const { rows } = await pool.query(
//     "SELECT DISTINCT title, dev_name, genre_name, price, stock FROM games \
//     JOIN game_devs ON games.game_id = game_devs.game_id \
//     JOIN devs ON game_devs.dev_id = devs.dev_id \
//     JOIN game_genres ON games.game_id = game_genres.game_id \
//     JOIN genres ON game_genres.genre_id = genres.genre_id \
//     JOIN prices ON games.price_id = prices.price_ID;"
//   )
//   return rows
// }

// async function getSearchedInfo(searchFor, searchTerm, inStockOnly) {
//   const { rows } = await pool.query(
//     `SELECT DISTINCT title, dev_name, genre_name, price, stock FROM games \
//     JOIN game_devs ON games.game_id = game_devs.game_id \
//     JOIN devs ON game_devs.dev_id = devs.dev_id \
//     JOIN game_genres ON games.game_id = game_genres.game_id \
//     JOIN genres ON game_genres.genre_id = genres.genre_id \
//     JOIN prices ON games.price_id = prices.price_ID \
//     WHERE ${searchFor} ILIKE '%${searchTerm}%' ${inStockOnly};`
//   )
//   return rows
// }

async function getSearchedTitles(searchFor, searchTerm, inStockOnly) {
  const { rows } = await pool.query(
    `SELECT DISTINCT title, price, stock FROM games \
    LEFT JOIN game_devs ON games.game_id = game_devs.game_id \
    LEFT JOIN devs ON game_devs.dev_id = devs.dev_id \
    LEFT JOIN game_genres ON games.game_id = game_genres.game_id \
    LEFT JOIN genres ON game_genres.genre_id = genres.genre_id \
    LEFT JOIN prices ON games.price_id = prices.price_ID \
    WHERE ${searchFor} ILIKE '%${searchTerm}%' ${inStockOnly} \
    ORDER BY title;`
  )
  return rows
}

async function getDevsFromTitle(title) {
  const { rows } = await pool.query(
    `SELECT DISTINCT dev_name FROM games \
    JOIN game_devs ON games.game_id = game_devs.game_id \
    JOIN devs ON game_devs.dev_id = devs.dev_id \
    WHERE title = '${title}';`
  )
  return rows
}

async function getGames() {
  const { rows } = await pool.query(
    `SELECT title FROM games \
    ORDER BY title;`
  )
  return rows;
}

async function addGame(title, stock, price_id) {
  const { rows } = await pool.query(
    "INSERT INTO games (title, stock, price_id) VALUES ($1, $2, $3) RETURNING game_id;", [title, stock, price_id]
  )
  return rows
}

async function removeGame(title) {
  await pool.query(`DELETE FROM games WHERE title = '${title}'`);
}

async function getDevs() {
  const { rows } = await pool.query(
    `SELECT DISTINCT dev_name FROM devs \
    ORDER BY dev_name;`
  )
  return rows
}

async function addDev(dev_name) {
  await pool.query("INSERT INTO devs (dev_name) VALUES ($1)", [dev_name]);
}

async function removeDev(dev_name) {
  await pool.query(`DELETE FROM devs WHERE dev_name = '${dev_name}'`);
}

async function getDevID(devs) {
  const { rows } = await pool.query(
    `SELECT array_agg(dev_id) FROM devs \
    WHERE dev_name IN (${devs});`
  )
  return rows
}

async function getGenresFromTitle(title) {
  const { rows } = await pool.query(
    `SELECT DISTINCT genre_name FROM games \
    JOIN game_genres ON games.game_id = game_genres.game_id \
    JOIN genres ON game_genres.genre_id = genres.genre_id \
    WHERE title = '${title}';`
  )
  return rows
}

async function getGenres() {
  const { rows } = await pool.query(
    `SELECT DISTINCT genre_name FROM genres \
    ORDER BY genre_name;`
  )
  return rows
}

async function addGenre(genre_name) {
  await pool.query("INSERT INTO genres (genre_name) VALUES ($1)", [genre_name]);
}

async function removeGenre(genre_name) {
  await pool.query(`DELETE FROM genres WHERE genre_name = '${genre_name}'`);
}

async function getGenreID(genres) {
  const { rows } = await pool.query(
    `SELECT array_agg(genre_id) FROM genres \
    WHERE genre_name IN (${genres});`
  )
  return rows
}

async function getPrices() {
  const { rows } = await pool.query(
    `SELECT DISTINCT price FROM prices \
    ORDER BY price;`
  )
  return rows
}

async function getPriceID(price) {
  const { rows } = await pool.query(
    `SELECT DISTINCT price_id FROM prices \
    WHERE price = ${price};`
  )
  return rows
}

async function addPrice(price) {
  await pool.query("INSERT INTO prices (price) VALUES ($1)", [price]);
}

async function removePrice(price) {
  await pool.query(`DELETE FROM prices WHERE price = '${price}'`);
}

async function addGameDevs(game_id, dev_id) {
  await pool.query("INSERT INTO game_devs (game_id, dev_id) VALUES ($1, $2)", [game_id, dev_id]);
}

async function addGameGenres(game_id, genre_id) {
  await pool.query("INSERT INTO game_genres (game_id, genre_id) VALUES ($1, $2)", [game_id, genre_id]);
}

module.exports = {
  getSearchedTitles,

  getGames,
  addGame,
  removeGame,
  
  getDevsFromTitle,
  getDevs,
  addDev,
  removeDev,
  getDevID,

  getGenresFromTitle,
  getGenres,
  addGenre,
  removeGenre,
  getGenreID,

  getPrices,
  addPrice,
  removePrice,
  getPriceID,

  addGameDevs,
  addGameGenres
};
