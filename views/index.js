/**
 * @author : 최정우
 * @since : 2022.10.19
 * @dscription : Vue를 활용한 Client단 구현의 시작점(Index) Component 입니다.
 */
import { createApp } from 'vue';
import { createStore } from 'vuex';
import axios from 'axios';

import AppRouter from './pages/AppRouter.js';
import App from './pages/App.vue';
import storeOptions from './pages/store.js';

const store = createStore(storeOptions);

const app = createApp(App);
app.use(AppRouter);
app.use(store);
app.provide('$axios', axios);

app.mount('#root');



if (!APP_USER_HTTP_REQUEST_URL && APP_USER_HTTP_REQUEST_URL != '/') {
  console.log('index.js APP_USER_HTTP_REQUEST_URL : ', APP_USER_HTTP_REQUEST_URL);
  AppRouter.push({ path: APP_USER_HTTP_REQUEST_URL, query: {}});
}
