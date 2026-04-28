const db = require ('../db/queries');
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { body, validationResult, matchedData, query } = require("express-validator");

const validateSearch = [
    body("searchTerm").trim().escape()
];

async function getAllData(req, res) {
  const searchFor = 'title';
  const searchTerm = '';
  const inStockOnly = '';
  allInfo = await fetchAndFormatData(searchFor, searchTerm, inStockOnly);
  res.render("index", {
    title: "All data",
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
    let searchTerm;
    if(!req.body.searchTerm) {
      searchTerm = '';
    } else {
      searchTerm = matchedData(req).searchTerm;
    }
    
    const searchFor = req.body.searchFor;
    let inStockOnly = checkInStock(req.body.inStock);

    searchedInfo = await fetchAndFormatData(searchFor, searchTerm, inStockOnly);
    if(searchedInfo.length != 0){
      res.render("index", {
        title: "Search results",
        games: searchedInfo,
      });
    } else {
        res.render("noData", {
          title: "No data",
        });
    }
  }
];

exports.updateGet = async (req, res)=> {
  devs = await db.getDevs();
  genres = await db.getGenres();
  prices = await db.getPrices();
  res.render("update", {
    title: "Update database",
    devs: devs,
    genres: genres,
    prices: prices,
  });
};

exports.addDevPost = async (req, res)=> {
  await db.addDev(req.body.newDev);
  res.redirect('/update');
};

exports.removeDevPost = async (req, res)=> {
  await db.removeDev(req.body.removeDev);
  res.redirect('/update');
};

exports.addGenrePost = async (req, res)=> {
  await db.addGenre(req.body.newGenre);
  res.redirect('/update');
};

exports.removeGenrePost = async (req, res)=> {
  await db.removeGenre(req.body.removeGenre);
  res.redirect('/update');
};

exports.addPricePost = async (req, res)=> {
  await db.addPrice(req.body.newPrice);
  res.redirect('/update');
};

exports.removePricePost = async (req, res)=> {
  await db.removePrice(req.body.removePrice);
  res.redirect('/update');
};

