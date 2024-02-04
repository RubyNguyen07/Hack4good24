var express = require("express"); 
var router = express.Router(); 
var reviewController = require('../../controllers/reviewsController'); 

router.get('/', reviewController.getAllReviews);
router.get('/:campaignId', reviewController.getReviewsByCampaign);

module.exports = router; 