const db = require ('../db/queries');
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { body, validationResult, matchedData, query } = require("express-validator");

// const alphaErr = "must only contain letters.";
// const lengthErr = "must be between 1 and 50 characters.";

const validateSearch = [
    body("searchTerm").trim().escape()
      // .isAlpha('en-US', { ignore: ' ' }).withMessage(`Name ${alphaErr}`)
      // .isLength({ min: 1, max: 50 }).withMessage(`Name ${lengthErr}`),
];

async function getAllData(req, res) {
  allInfo = await db.getAllGameInfo();
  res.render("index", {
    title: "Hello World",
    games: allInfo,
  });
}

async function fetchAndFormatData(searchFor, searchTerm, inStockOnly) {
  let formatedData = [];

  const workingData = await db.getSearchedTitles(searchFor, searchTerm, inStockOnly);
  for(let i = 0; i < workingData.length; i++ ){
    formatedData.push(workingData[i]);
    formatedData[i].dev_name = await getDevsFromTitle(workingData[i].title);
    formatedData[i].genre_name = await getGenresFromTitle(workingData[i].title);
    await console.log(formatedData);
  }  
  return formatedData
}

async function getDevsFromTitle(title) {
  let devs = [];
  const getDevs = await db.getDevsFromTitle(title);
  devs.push(getDevs);
  return devs
}

async function getGenresFromTitle(title) {
  let genres = [];
  const getGenres = await db.getGenresFromTitle(title);
  genres.push(getGenres);
  return genres
}

exports.indexGet = async (req, res) => {
  getAllData(req, res);
};

exports.indexPost = [
  validateSearch,
  async (req, res) => {
    if(!req.body.searchTerm) {
      getAllData(req, res);
      return
    }
    const searchTerm = matchedData(req).searchTerm;
    const searchFor = req.body.searchFor;
    const inStock = req.body.inStock;
    let inStockOnly = '';
    if(inStock) {
      inStockOnly = 'AND stock > 0';
    }
    // const errors = validationResult(req);
    // console.log(errors);
    // searchedInfo = await db.getSearchedInfo(searchFor, searchTerm, inStockOnly);
    searchedInfo = await fetchAndFormatData(searchFor, searchTerm, inStockOnly);
    if(searchedInfo.length != 0){
      res.render("index", {
        title: "Hello Search",
        games: searchedInfo,
      });
    } else {
        res.render("noData", {
          title: "No data",
        });
    }
  }
]
