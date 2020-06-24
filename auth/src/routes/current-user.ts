import express, {Request, Response} from 'express'
import { currentUser } from '../middlewares/current-user';

const router = express.Router()

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {

    // currentUser was added to the express types on currentUser middleware
        // the req from the user can be null if not logged on or with a 

    res.send({currentUser: req.currentUser || null})

})

export { router as currentUserRouter }