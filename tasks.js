const express = require('express')
const router = express.Router()
const {getalltasks, createtasks,gettask,updatetask, deletetask} = require('./controllers')
 
router.route('/').get(getalltasks).post(createtasks)
router.route('/:id').get(gettask).patch(updatetask).delete(deletetask)


module.exports = router