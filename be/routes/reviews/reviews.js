var express = require("express"); 
var router = express.Router(); 
var reviewController = require('../../controllers/reviewsController'); 

router.get('/', reviewController.getAllReviews);

module.exports = router; 