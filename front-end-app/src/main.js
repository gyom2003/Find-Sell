import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from "@primevue/themes/aura";
import PrimeButton from 'primevue/button';
import PrimeInputText from 'primevue/inputtext';
import PrimeDataTable from 'primevue/datatable';
import PrimeColumn from 'primevue/column';
import PrimeDialog from 'primevue/dialog';
import PrimeToastService from 'primevue/toastservice';

// import "primevue/resources/themes/saga-blue/theme.css";
// import "primevue/resources/primevue.min.css"; 
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import router from './router'

const app = createApp(App).use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
})
app.use(PrimeToastService)

app.component('PrimeButton', PrimeButton);
app.component('PrimeInputText', PrimeInputText);
app.component('PrimeDataTable', PrimeDataTable);
app.component('PrimeColumn', PrimeColumn);
app.component('PrimeDialog', PrimeDialog);

app.mount('#app')
