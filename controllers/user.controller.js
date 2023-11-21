const User = require("../models/user.model");

exports.getUser = (req, res, next) => {
  try {
    User.find().then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Item added Succesfully",
        result,
      });
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

exports.createUser = (req, res, next) => {
  console.log(req);

  const user = new User({
    fName: req.body?.fName,
    lName: req.body?.lName,
    city: req.body?.city,
    date: req.body?.date,
    country: req.body?.country,
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        data: result,
      });
    })
    .catch((error) => {
      console.log(error, "///error");
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(next);
    });
};
