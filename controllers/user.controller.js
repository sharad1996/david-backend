const User = require("../models/user.model");

exports.getUser = (req, res, next) => {
  try {
    const currentDate = new Date();

    User.find()
      .sort({ date: +1 })
      .then((result) => {
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

exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  try {
    User.findById(id).then((result) => {
      console.log(result);
      res.status(200).json({
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
  const { fName, lName, city, date, country } = req.body;

  User.find({
    fName,
    lName,
    city,
  })
    .then((user) => {
      console.log(user);
      if (!user.length) {
        const user = new User({
          fName,
          lName,
          city,
          date,
          country,
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
      } else {
        res.status(403).json({
          message: "User should be Unique",
        });
      }
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(next);
    });
};
