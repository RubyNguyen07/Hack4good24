var express = require("express");
var router = express.Router();
var campaignsController = require('../../controllers/campaignsController');

router.get('/', campaignsController.getAllCampaign);

router.get('/:id', campaignsController.getCampaignById);

module.exports = router;