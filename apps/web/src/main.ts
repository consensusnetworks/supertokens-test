import { createApp } from 'vue'
import App from './App.vue'
import SuperTokens from 'supertokens-web-js'
import { SuperTokensWebJSConfig } from './config'

SuperTokens.init(SuperTokensWebJSConfig)

const app = createApp(App)

app.mount('#app')
