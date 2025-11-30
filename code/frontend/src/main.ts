import './style.css'
import { createApp, type Plugin } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import router from './router/index.ts'

// CREATE VUE APP
const app = createApp(App);
app.use(createPinia());
app.use(router);

// PRIMEVUE CONFIGURATION
app.use(PrimeVue as unknown as Plugin, {
    theme: {
        preset: Aura,
    },
    tooltip: {
        appendTo: 'body',
    },
    pt: {
        tooltip: {
            root: {
                style: 'z-index: 10000; pointer-events: none; position: fixed;'
            },
            arrow: {
                style: 'z-index: 10001;'
            },
            text: {
                style: 'pointer-events: none;'
            }
        }
    }
});

// MOUNT THE APP
app.mount("#app");
