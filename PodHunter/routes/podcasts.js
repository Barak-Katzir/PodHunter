const express = require("express");
const controller = require('../controllers/podcastController');
const router = express.Router();

router.get('/', controller.getAllPodcasts);
router.get('/:id', controller.getSinglePodcast);
router.post('/', controller.addSinglePodcast);
router.put('/:id', controller.updateSinglePodcast);
router.delete('/:id', controller.deleteSinglePodcast);

module.exports = router;