const express = require('express')
const router = express.Router()

const { createUser, login } = require('../Controller/userController')
const {createOrder,getorder}=require('../Controller/orderController')
const {Auth}=require('../middleware/auth')

router.post("/add-user", createUser)
router.post("/login-user", login)


router.post("/add-order",Auth,createOrder)
router.get("/get-order/:id",Auth,getorder)

module.exports = router