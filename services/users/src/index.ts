import express from 'express'
import cors from 'cors'
import supertokens from 'supertokens-node'
import Session from 'supertokens-node/recipe/session'
import { verifySession } from 'supertokens-node/recipe/session/framework/express'
import { middleware, errorHandler, SessionRequest } from 'supertokens-node/framework/express'
import { SuperTokensConfig } from './config'
import user from './routes/user'

supertokens.init(SuperTokensConfig)

const port = 4000
const app = express()

/** Parse the user request bodies */
app.use(express.json())

/** CORS needs explicit origin (no *) with credentials:true */
app.use(
    cors({
        origin: 'http://localhost:3000',
        allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        credentials: true
    })
)

/** Expose all the APIs from SuperTokens to the client */
app.use(middleware())

/** Returns 401 to the client in the case of session related errors */
app.use(errorHandler())

/** An example route that does not require session verification */
app.get('/ping', async (_req, res) => res.json({ message: 'pong' }))

/** Login route with custom verification logic */
app.post('/login', async (req, res) => {

    const { userAddress } = req.body

    /** 
     * Verify a user's wallet signature here
     * then... 
     */

    await Session.createNewSession(req, res, userAddress)

    /* a new session has been created.
     * - an access & refresh token has been attached to the response's cookie
     * - a new row has been inserted into the database for this new session
     */

    res.json({ message: `User with address ${userAddress} signed in.` })
})

/** An example route that requires session verification */
app.get('/user', user)
app.get('/user', verifySession(), async (req: SessionRequest, res) => {

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

app.listen(port, () => console.log(`Users server listening on port ${port}`))
