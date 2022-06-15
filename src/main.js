/* import fontawesome library */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCaretDown, faX } from '@fortawesome/free-solid-svg-icons';

import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

/* add icons to the library */
library.add(faCaretDown, faX);

createApp(App)
  .use(store)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
