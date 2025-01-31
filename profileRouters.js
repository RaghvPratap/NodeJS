const express = require('express');
const profileRouter = express.Router();
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { userAuth } = require("./models/users")
const { editProfileData } = require("./utils/validation")

profileRouter.get('/profile', userAuth, async (req, res) => {
    try {
        const cookie = req.cookies;
        // console.log(cookie)
        // res.send("reading cookie")
        const { token } = cookie;
        if (!token) {
            res.status(400).send("Invalid token")
        }
        const msg = await jwt.verify(token, 'Hello@NodeJS')
        // console.log(msg);
        const { _id } = msg;
        const user = await User.findById({ _id })
        if (!user) {
            res.status(400).send("User does not exist")
        }
        res.send(user)
    } catch (error) {
        res.status(400).send("login failed")
    }
})


profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        const user = req.user
        res.send(user);
    } catch (error) {
        res.send("ERROR" + err.message)
    }

})


profileRouter.patch('profile/patch', userAuth, async (req, res) => {
    try {
        if (!editProfileData(req)) {
            const loggedInUser = req.user;
            Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
            // res.send("ERROR:Invaild edit request"+err.message)
            //   console.log(loggedInUser)
            await loggedInUser.save()
            res.json({
                message: `${loggedInUser.firstName}, your profile was updated successfully `,
                data: loggedInUser
            })
        }
    } catch (error) {
        res.send("ERROR" + err.message)
    }
})

module.exports = profileRouter;