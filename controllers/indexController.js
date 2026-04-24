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

    const allDevsUnformatted = await db.getDevsFromTitle(workingData[i].title);
    let formattedDevs = [];
    for(let n = 0; n < allDevsUnformatted.length; n++) {
      formattedDevs.push(allDevsUnformatted[n].dev_name);
    }
    formatedData[i].dev_name = formattedDevs.join(', ');

    const allGenresUnformatted = await db.getGenresFromTitle(workingData[i].title);
    let formattedGenres = [];
    for(let n = 0; n < allGenresUnformatted.length; n++) {
      formattedGenres.push(allGenresUnformatted[n].genre_name);
    }
    formatedData[i].genre_name = formattedGenres.join(', ');
  }  
  return formatedData
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
