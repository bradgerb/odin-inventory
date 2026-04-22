const db = require ('../db/queries');
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { body, validationResult, matchedData, query } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 50 characters.";

const validateSearch = [
    body("searchTerm").trim()
      .isAlpha('en-US', { ignore: ' ' }).withMessage(`Name ${alphaErr}`)
      .isLength({ min: 1, max: 50 }).withMessage(`Name ${lengthErr}`),
];

exports.indexGet = async (req, res) => {
  allInfo = await db.getAllGameInfo();
  res.render("index", {
    title: "Hello World",
    games: allInfo,
  });
};

exports.indexPost = [
  validateSearch,
  async (req, res) => {
    const searchTerm = matchedData(req).searchTerm;
    const searchFor = req.body.searchFor;
    const errors = validationResult(req);
    searchedInfo = await db.getSearchedInfo(searchFor, searchTerm);
    res.render("index", {
      title: "Hello Search",
      games: searchedInfo,
    });
  }
]
