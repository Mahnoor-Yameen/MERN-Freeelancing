const express = require('express')
const router = express.Router()
const {RegisterUser, UpdateProfile, GetAllUsers, LoginUser, DeleteUser} = require("./Controller")


router.post("/register-user", RegisterUser)
router.put("update-user-profile",UpdateProfile)
router.get("/get-all-users", GetAllUsers)
router.post("/login-user",LoginUser)
router.delete("/delete-user", DeleteUser)



module.exports = router