import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { FC } from 'react';

import { Navbar } from '@/components/navbar';

export const Root: FC = () => {
  return (
    <div className="app-shell">
      <Navbar>Electron + React</Navbar>
      <div className="app-content">
        <Outlet />
      </div>
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  );
};
