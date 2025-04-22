import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/login.vue';
import Register from './components/register.vue';
import Home from './components/home.vue';
import Personal from './components/personal.vue';
import Groupview from './components/groupview.vue';
import View from './components/view.vue';
import Group from './components/group.vue';
import Profile from './components/profile.vue';
import About from './components/about.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { 
    path: '/login', 
    name: 'Login', 
    component: Login,
    meta: { requiresAuth: false } // Explicitly mark as public
  },
  { 
    path: '/register', 
    name: 'Register', 
    component: Register,
    meta: { requiresAuth: false }
  },
  { 
    path: '/about',
    name: 'About',
    component: About,
    meta: { requiresAuth: false }
  },
  { 
    path: '/home', 
    name: 'Home', 
    component: Home,
    meta: { requiresAuth: true } // Protected route
  },
  // All other protected routes
  { path: '/personal', name: 'Personal', component: Personal, meta: { requiresAuth: true } },
  { path: '/groupview', name: 'Groupview', component: Groupview, meta: { requiresAuth: true } },
  { path: '/view', name: 'View', component: View, meta: { requiresAuth: true } },
  { path: '/group', name: 'Group', component: Group, meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Simplified authentication check
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jsontoken'); // Changed from authToken to token
  
  // Check if the route requires authentication
  if (to.meta.requiresAuth && !token) {
    // Redirect to login with return URL
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    });
  } else {
    // Proceed to the route
    next();
  }
});

export default router;
