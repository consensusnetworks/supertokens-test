import Session from 'supertokens-node/recipe/session'
import { TypeInput } from 'supertokens-node/types'
import Dashboard from 'supertokens-node/recipe/dashboard'

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        // SuperTokens core (temporary) host
        connectionURI: 'https://try.supertokens.com',
    },
    appInfo: {
        appName: 'SuperTokens Demo App',
        apiDomain: 'http://localhost:4000',
        websiteDomain: 'http://localhost:3000',
    },
    recipeList: [
        Session.init(),
        Dashboard.init({
            apiKey: 'supertokens_is_awesome',
        })
    ],
}
