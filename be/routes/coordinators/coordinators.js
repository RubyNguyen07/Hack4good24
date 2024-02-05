var express = require("express");
var router = express.Router();
var coordinatorsController = require('../../controllers/coordinatorsController');

router.get('/profile/:id', coordinatorsController.getCoordinatorProfile);

router.post('/campaigns', coordinatorsController.createCampaign);

router.post('/campaigns/edit/:campaignId', coordinatorsController.editCampaign);

module.exports = router;