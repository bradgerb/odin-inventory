const db = require ('../db/queries');
// const CustomNotFoundError = require("../errors/CustomNotFoundError");
// const { body, validationResult, matchedData, query } = require("express-validator");

// const alphaErr = "must only contain letters.";
// const lengthErr = "must be between 1 and 10 characters.";
// const msgLengthErr = "must be between 1 and 250 characters.";

// const validateMessage = [
//     body("author").trim()
//       .isAlpha().withMessage(`Name ${alphaErr}`)
//       .isLength({ min: 1, max: 10 }).withMessage(`Name ${lengthErr}`),
//     body("message").trim()
//       .isLength({ min: 1, max: 250 }).withMessage(`Message ${msgLengthErr}`),
// ];

// const getMessages = async (req, res) => {

//   const messages = await db.getAllMessages();

//   if (!messages) {
//     throw new CustomNotFoundError("Messages not found");
//   }

//   res.render('index', {messages: messages});
// };

exports.indexGet = async (req, res) => {
  example = await db.getAllTitles();
  res.render("index", {
    title: "Hello World",
    games: example,
  });
};
