const express = require('express');
const eventsController = require('../controllers/EventsController');
const {validateEvents} = require('../validator/eventsValidator');

const router = express.Router();

router.get('/', eventsController.getEvents);
router.get('/search', eventsController.searchEvent);
router.get('/export', eventsController.exportEvent);
router.get('/:id', eventsController.getEvent);
router.get('/search', eventsController.searchEvent);
router.post('/', validateEvents ,eventsController.insertEvent);
router.put('/:id', validateEvents,eventsController.updateEvent);
router.delete('/:id', eventsController.deleteEvent);

module.exports = router;
