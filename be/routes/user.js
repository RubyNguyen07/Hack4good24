var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router.get("/webhook", (req, res) => {
  res.send("webhook");
});
router.post("/webhook", userController.webhook);

module.exports = router;
