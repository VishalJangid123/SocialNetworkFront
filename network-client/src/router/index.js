import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta : {
      requiresAuth:false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta : {
      requiresAuth:false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta : {
      requiresAuth:true
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*  To redirect the user from / to /login everytime he is not
   logged in by checking the jwt token from the localstorage
*/
router.beforeEach((to,from,next) =>{
  
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(localStorage.getItem('jwt') == null){
      next({
        path: '/login',
        params: { nextUrl: to.fullPath}
      })
    }else{
      console.log("Already Logged In");
      next()
    
    }
  }else{
    console.log('Do not require to auth');
    if(localStorage.getItem('jwt') !== null){
        
      next({
        path: '/',
        params: {nextUrl:'/'}
      })
    }else{
      next()
    }
  }
});
export default router
