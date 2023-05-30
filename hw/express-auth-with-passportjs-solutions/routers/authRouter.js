const express = require('express')
const authRouter = express.Router()
const { passport, jwtSign } = require('../auth/auth')


authRouter.post('/login', (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if(err || !user) {
                const error = new Error(`An Error Ocurred: ${JSON.stringify(info)}`)
                return next(error)
            }
            req.login(user, {session: false}, async (error) => {
                if(error){
                    return next(error)
                }
                const { email, id } = user
                const payload = {email, id}
                const token = jwtSign(payload)
                return res.json({user, token})
            })
        }
        catch (e) {
            return next(error)
        }
    }) (req, res, next)
})
authRouter.post('/signup', async (req, res, next) => {
    passport.authenticate('signup', async (err, user,info) => {
        try {
            console.log('user from /signup', user)

            const { email, id } = user
            const payload = { email, id }
            const token = jwtSign(payload)

            return res.json({user, token, message: 'User successfully created'})
        } 
            catch (error) {
                return next (error)
            }
    })    (req, res, next)
})
module.exports = authRouter