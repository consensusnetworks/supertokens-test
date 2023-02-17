import Session from 'supertokens-web-js/recipe/session'

export const SuperTokensWebJSConfig = {
  appInfo: {
    appName: 'SuperTokens Demo',
    apiDomain: 'http://localhost:4000'
  },
  recipeList: [Session.init()],
}
