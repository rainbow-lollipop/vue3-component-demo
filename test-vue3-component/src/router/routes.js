// import Home from '../view/Home.vue'
// import About from '../view/About.vue'

import { getAsyncPage } from '../utils'
const Home = getAsyncPage('../view/Home.vue');
const About = getAsyncPage('../view/About.vue');

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
]