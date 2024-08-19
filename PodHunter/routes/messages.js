const express = require("express");
const controller = require('../controllers/messageController');
const router = express.Router();

router.get('/', controller.getAllMessages);
router.get('/:id', controller.getMessage);
router.post('/', controller.addMessage);
router.put('/:id', controller.editMessage);
router.delete('/:id', controller.deleteMessage);

module.exports = router;