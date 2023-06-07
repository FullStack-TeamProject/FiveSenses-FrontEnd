import { createWebHistory, createRouter } from "vue-router";

import Main from '../pages/main/Main.vue';
import Dashboard from '../pages/main/Dashboard.vue';
import Dashboardlist from '../pages/main/Dashboardlist.vue';
import Tablelist from '../pages/main/Tablelist.vue';
import Tableinsert from '../pages/main/Tableinsert.vue';
import Datalist from '../pages/main/Datalist.vue';
import Filestandard from '../pages/main/Filestandard.vue';
import Visualization from '../pages/main/Visualization.vue';
import Barchart from '../pages/main/Barchart.vue';
import y_Barchart from '../pages/main/y_Barchart.vue';
import Doughnutchart from '../pages/main/Doughnutchart.vue';
import Linechart from '../pages/main/Linechart.vue';
import Piechart from '../pages/main/Piechart.vue';
import Polarareachart from '../pages/main/Polarareachart.vue';
import Radarchart from '../pages/main/Radarchart.vue';
import Bubblechart from '../pages/main/Bubblechart.vue';

const routes = [
    /* 메인화면 */
    { path: '/', name: 'Main', component: Main},
    { path: '/Dashboard.page', name: 'Dashboard', component: Dashboard},
    { path: '/Tablelist.page', name: 'Tablelist', component: Tablelist},
    { path: '/Tableinsert.page', name: 'Tableinsert', component: Tableinsert},
    { path: '/Datalist.page', name: 'Datalist', component: Datalist},
    { path: '/Dashboardlist.page', name: 'Dashboardlist', component: Dashboardlist},
    { path: '/Filestandard.page/:id', name: 'Filestandard', component: Filestandard},
    { path: '/Visualization.page/:id', name: 'Visualization', component: Visualization },
  //아래부턴 차트 컴포넌트 받아서 라우팅
    { path: '/Barchart.page/:id/:column/:data', name: 'Barchart', component: Barchart},
    { path: '/y_Barchart.page/:id/:column/:data', name: 'y_Barchart', component: y_Barchart},
    { path: '/Doughnutchart.page/:id/:column/:data', name: 'Doughnutchart', component: Doughnutchart},
    { path: '/Linechart.page/:id/:column/:data', name: 'Linechart', component: Linechart},
    { path: '/Piechart.page/:id/:column/:data', name: 'Piechart', component: Piechart},
    { path: '/Polarareachart.page/:id/:column/:data', name: 'Polarareachart', component: Polarareachart},
    { path: '/Radarchart.page/:id/:column/:data', name: 'Radarchart', component: Radarchart},
    { path: '/Bubblechart.page/:id/:column/:data', name: 'Bubblechart', component: Bubblechart},
];

const router = createRouter({
    history: createWebHistory('/'),
    routes, 
});

export default router;