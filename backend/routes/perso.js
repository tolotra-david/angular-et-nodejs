const express = require('express')
const Personnel = require('../controllers/Perso')
const router = express.Router()

router.get('/:id', Personnel.getUsers)
router.get('/', Personnel.getCount)
router.get('/find/:id', Personnel.getUserById)
router.post('/add', Personnel.createUsers)
router.post('/getOne', Personnel.getUser)
router.put('/update/:id', Personnel.updateUser)
router.delete('/delete/:id', Personnel.deleteUser)


module.exports = router
