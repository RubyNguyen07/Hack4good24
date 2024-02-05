const express = require('express');
const router = express.Router();
const statisticsController = require('../../controllers/statisticsController');

router.get('/', statisticsController.getTotalStats);

module.exports = router;