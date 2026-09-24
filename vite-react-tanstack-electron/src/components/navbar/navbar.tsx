import type { FC } from 'react';

import type { NavbarProps } from './types';
import { useTitlebarOverlay } from './use-titlebar-overlay';

import './navbar.css';

export const Navbar: FC<NavbarProps> = (props) => {
  const { children } = props;
  const isOverlayVisible = useTitlebarOverlay();

  return (
    <header className="navbar" data-overlay-visible={isOverlayVisible}>
      <nav className="navbar__content" aria-label="Main navigation">
        {children}
      </nav>
    </header>
  );
};
