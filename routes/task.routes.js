const express = require('express');
const { show, findById, create, update, deleteTask} = require('../controllers/task.controller');

const router = express.Router();

router.get('/', show);

router.get('/:id', findById);

router.post('/create', create);

router.put('/:id/update', update);

router.delete('/:id/delete', deleteTask)

module.exports = router;
