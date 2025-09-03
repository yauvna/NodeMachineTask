const express = require('express');
const router = express.Router();
const controller = require('../controller/productController');

router.get('/', controller.list);
router.get('/new', controller.showCreateForm);
router.post('/', controller.create);
router.get('/:id/edit', controller.showEditForm);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
