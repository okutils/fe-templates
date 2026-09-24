import { useSyncExternalStore } from 'react';

interface WindowControlsOverlay extends EventTarget {
  readonly visible: boolean;
}

interface OverlayNavigator extends Navigator {
  readonly windowControlsOverlay?: WindowControlsOverlay;
}

type StoreListener = () => void;
type Unsubscribe = () => void;

const getOverlay = (): WindowControlsOverlay | undefined =>
  (navigator as OverlayNavigator).windowControlsOverlay;

const subscribe = (handleChange: StoreListener): Unsubscribe => {
  const overlay = getOverlay();
  overlay?.addEventListener('geometrychange', handleChange);
  return () => overlay?.removeEventListener('geometrychange', handleChange);
};

const getSnapshot = (): boolean => getOverlay()?.visible ?? false;

export const useTitlebarOverlay = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot);
