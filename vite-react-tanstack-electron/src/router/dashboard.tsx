import { createRoute } from '@tanstack/react-router';

import Home from '@/pages/page';

import { rootRoute } from './root';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});
