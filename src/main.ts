import * as Vue from 'vue'
import * as VueRouter from 'vue-router'

import './vendor' //bootstrap
require('./main.scss'); //global css

/*
  For components that will be used in html (such as navbar),
  all you need to do is import the file somewhere in your code,
  they are automatically registered when the file is loaded.
  However, if you import the class (ex: import { Navbar } from './navbar'),
  you will have to call new Navbar() somewhere as well. You would want
  to do that if you are defining a components{} object in the @VueComponent
  options parameter. 
*/
import './components/navbar/navbar'

import { HomeComponent } from './views/home/home'
import { AboutComponent } from './views/about/about'

Vue.use(VueRouter);

var app = Vue.extend({});

var router = new VueRouter();

router.map({
  '/' : {
      component: HomeComponent
  },
  '/about' : {
      component: AboutComponent
  }
});

router.start(app, '#app-main');