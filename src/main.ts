import Vue from 'vue';

import {
  Button,
  Col,
  Progress,
  Row,
  Select,
} from 'ant-design-vue';
Vue.use(Button);
Vue.use(Col);
Vue.use(Progress);
Vue.use(Row);
Vue.use(Select);

import App from './App.vue';

new Vue({
  render: h => h(App),
}).$mount('#app');
