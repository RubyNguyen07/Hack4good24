const express = require('express');
const router = express.Router();
const statisticsController = require('../../controllers/statisticsController');

//total materials for ALL time
router.get('/totalAllMaterials', statisticsController.getTotalStats); 

//total materials for LAST 5 MONTHS: group by materials, order by totalQuantity desc
router.get('/totalMaterials', statisticsController.getTotalMaterials); 

//total materials for last 5m: group by (event, material type); order by totalQuantity desc
router.get('/eventMaterial', statisticsController.getEventMaterials);

//total # of volunteers registered in last 5m
router.get('/totalVolunteers', statisticsController.getTotalVolunteers); 

//total attendees, group by event, order by desc # of reviews
router.get('/totalEventParticipant', statisticsController.getTotalEventPartcipant); 

module.exports = router;