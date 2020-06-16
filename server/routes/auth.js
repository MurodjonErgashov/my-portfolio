const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const authValidate = require("../validate/authValidate");
const auth = require("../middleware/auth");

const User = require("../modals/user");

router.post("/", async (req, res) => {
  //Some validation
  const { error } = authValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check exist in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User is not exist in our database");

  //Validate password
  bcrypt.compare(req.body.password, user.password).then((isMatch) => {
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

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

router.get("/user", auth, async (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
