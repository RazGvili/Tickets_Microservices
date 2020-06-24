import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res) => {

    // Send a header to dump all cookie data 
    req.session = null

    res.status(200).send({})
})

export { router as signOutRouter }