var express = require("express");
var router = express.Router();
var volunteersController = require("../../controllers/volunteersController");
var userController = require("../../controllers/userController");

router.post("/profile/signup", volunteersController.register);

router.get("/profile/:id", volunteersController.getLevel);

router.post("/review/:token", volunteersController.postReview);

module.exports = router;
