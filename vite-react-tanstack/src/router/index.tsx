import { createRouter } from '@tanstack/react-router';

import { dashboardRoute } from './dashboard';
import { rootRoute } from './root';

export const routeTree = rootRoute.addChildren([dashboardRoute]);

export const router = createRouter({ routeTree });
