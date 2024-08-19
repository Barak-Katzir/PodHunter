const express = require("express");
const controller = require('../controllers/commentController');
const router = express.Router();

router.get('/:podcastId/:id', controller.getSingleComment);
router.get('/:podcastId', controller.getAllComments);
router.post('/:podcastId', controller.addSingleComment);
router.put('/:id', controller.updateSingleComment);
router.delete('/:id', controller.deleteSingleComment);

module.exports = router;