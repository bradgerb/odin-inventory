const db = require ('../db/queries');
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { body, validationResult, matchedData, query } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 50 characters.";

const validateSearch = [
    // console.log(body("search")),
    body("search").trim()
      .isAlpha('en-US', { ignore: ' ' }).withMessage(`Name ${alphaErr}`)
      .isLength({ min: 1, max: 50 }).withMessage(`Name ${lengthErr}`),
];

// const getMessages = async (req, res) => {

//   const messages = await db.getAllMessages();

//   if (!messages) {
//     throw new CustomNotFoundError("Messages not found");
//   }

//   res.render('index', {messages: messages});
// };

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
    const { search } = matchedData(req);
    const errors = validationResult(req);
    console.log(search);
    searchedInfo = await db.getSearchedInfo(search);
    // console.log(searchedInfo);
    res.render("index", {
      title: "Hello Search",
      games: searchedInfo,
    });
  }
]
