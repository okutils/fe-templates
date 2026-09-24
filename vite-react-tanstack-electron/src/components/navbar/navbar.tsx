import type { CSSProperties, FC } from 'react';

import { TITLE_BAR_HEIGHT } from '../../../shared/constants/ui';
import type { NavbarProps } from './types';
import { useTitlebarOverlay } from './use-titlebar-overlay';

import './navbar.css';

const NAVBAR_STYLE: CSSProperties = {
  height: TITLE_BAR_HEIGHT,
};

export const Navbar: FC<NavbarProps> = (props) => {
  const { children } = props;
  const isOverlayVisible = useTitlebarOverlay();

  return (
    <header
      className="navbar"
      style={NAVBAR_STYLE}
      data-overlay-visible={isOverlayVisible}
    >
      <nav className="navbar__content" aria-label="Main navigation">
        {children}
      </nav>
    </header>
  );
};
