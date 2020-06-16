const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../modals/user");
const userValidate = require("../validate/userValidate");

router.post("/", async (req, res) => {
  //Some validation
  const { error } = userValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check exist in database
  const user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("Sorry, this user is there in our database");

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //Create salt and hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      });
    });
  });

  //   try {
  //     const savesUser = await newUser.save();
  //     res.send(savesUser);
  //   } catch (e) {
  //     console.log(e);
  //   }
});

module.exports = router;
