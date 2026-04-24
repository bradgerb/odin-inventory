const db = require ('../db/queries');
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { body, validationResult, matchedData, query } = require("express-validator");

const validateSearch = [
    body("searchTerm").trim().escape()
];

async function getAllData(req, res) {
  const searchFor = 'title';
  const searchTerm = '';
  const inStockOnly = checkInStock(req.body.inStock);
  allInfo = await fetchAndFormatData(searchFor, searchTerm, inStockOnly);
  res.render("index", {
    title: "Hello World",
    games: allInfo,
  });
}

async function fetchAndFormatData(searchFor, searchTerm, inStockOnly) {
  let formatedData = [];

  console.log(searchFor, searchTerm, inStockOnly);

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

const checkInStock = (input)=>{
  const inStock = input;
  let inStockOnly = '';
  if(inStock) {
    inStockOnly = 'AND stock > 0';
  }
  return inStockOnly
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
    let inStockOnly = checkInStock(req.body.inStock);

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
