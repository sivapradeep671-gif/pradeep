const express = require('express');
const router = express.Router();
const controller = require('./godown.controller');

router.get('/', controller.list);
router.get('/:id', controller.getOne);

module.exports = router;
