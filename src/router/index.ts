import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard.vue'
import LoginPage from '../views/login.vue'
import Superadmin from '../views/Superadmin.vue'
import Profile from '../views/profile.vue'
import Collector from '../views/collector.vue'
import access_restricted from '../views/restricted_access_page.vue'
import { getallroles } from '@/repositories/Apis'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true, allowedRoles: ['admin', 'employee'] }
    },
    {
      path: '/superadmin',
      name: 'superadmin',
      component: Superadmin,
      meta: { requiresAuth: true, allowedRoles: ['admin'] }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true, allowedRoles: ['admin', 'employee'] }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/collector',
      name: 'Collector',
      component: Collector,
      meta: {requireAuth: true, allowedRoles: ['collector']}
    },
    {
      path: '/access_restricted',
      name: 'access_restricted',
      component: access_restricted,
      meta: {allowedRoles: ['admin', 'employee', 'collector']}
    }
  ]
})

// ✅ Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem('token')
  const roleId = sessionStorage.getItem('roleid')

  if (to.meta.requiresAuth && !token) {
    next('/login') // 🚫 Block access if not logged in
    return
  }

  // if (to.path === '/login' && token) {
  //   next('/') // ✅ Already logged in? Redirect to dashboard
  //   return
  // }

  // If route has allowedRoles, check if user's role is allowed
  if (to.meta && to.meta.allowedRoles && roleId) {
    try {
      type Role = { id: string | number; rolename: string }
      const rolesResponse = await getallroles()
      const roles: Role[] = rolesResponse.data // Array of { id, rolename }
      const userRole = roles.find((r) => String(r.id) === String(roleId))
      if (!userRole) {
        next('/access_restricted')
        return
      }
      if (Array.isArray(to.meta.allowedRoles) && !to.meta.allowedRoles.includes(userRole.rolename)) {
        next('/access_restricted')
        return
      }
    } catch {
      // If API fails, restrict access
      next('/access_restricted')
      return
    }
  }

  next() // 👍 Proceed
})

export default router

