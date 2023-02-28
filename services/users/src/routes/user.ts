import express from 'express'
import { SessionRequest } from 'supertokens-node/framework/express'
import { verifySession } from 'supertokens-node/recipe/session/framework/express'

const router = express.Router()

/** An example route that requires session verification */
router.get('/', verifySession(), async (req: SessionRequest, res) => {

    const userAddress = req.session?.getUserId()

    /** 
     * Get user data from user database here
     * then... 
     */

    res.json({
        address: userAddress,
        accounts: [{
            address: userAddress,
            balance: 100
        }]
    })
})

export default router