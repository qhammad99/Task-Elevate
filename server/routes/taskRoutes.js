const express = require('express')
const router = express.Router()
const notesController = require('../controllers/taskController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(notesController.getAllTasks)
    .post(notesController.createTask)
    .patch(notesController.updateTask)
    .delete(notesController.deleteTask)

module.exports = router