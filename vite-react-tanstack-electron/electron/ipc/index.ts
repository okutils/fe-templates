import { registerAppHandlers } from './app';
import type { IpcContext } from './trusted-sender';

// Register once during app startup, not each time a window is created.
export const registerIpcHandlers = (context: IpcContext): void => {
  registerAppHandlers(context);
};
