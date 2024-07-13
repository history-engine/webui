/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import pinia from './stores'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.use(pinia)
app.mount('#app')
