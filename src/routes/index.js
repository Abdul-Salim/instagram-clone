import AuthLayout from 'components/layouts/auth';
import DashbaordLayout from 'components/layouts/dashboard/portal';

const baseRoutes = [
  {
    path: '/auth',
    component: AuthLayout,
    key: 'authLayout',
  },
  {
    path: '/',
    component: DashbaordLayout,
    key: 'dashboardLayout',
  },
];

export default baseRoutes;