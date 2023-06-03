const router = require("express").Router();
const User = require("../models/User.js");
// var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
// ​
// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
const CryptoJS = require("crypto-js");
router.post("/signup", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.HASH__KEY
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).send(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.send(401).json("worng user");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.HASH__KEY
    );
    const password = hashedPassword.toString(CryptoJS.enc.Utf8);
    password !== req.body.password && res.send(401).json("worng pword");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
