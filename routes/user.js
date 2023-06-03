const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("user test success");
});

router.post("/userpost", (req, res) => {
  const username = req.body.username;
  console.log(username);
  res.send("user test success");
});

module.exports = router;
