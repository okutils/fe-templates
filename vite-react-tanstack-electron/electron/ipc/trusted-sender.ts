import type { BrowserWindow, IpcMainInvokeEvent } from 'electron';

export interface IpcContext {
  // Read the current window on each request, including after macOS reactivation.
  getMainWindow: () => BrowserWindow | null;
  isAppURL: (value: string) => boolean;
}

export const assertTrustedSender = (
  event: IpcMainInvokeEvent,
  context: IpcContext,
): void => {
  const window = context.getMainWindow();
  if (
    !window ||
    event.sender !== window.webContents ||
    event.senderFrame !== window.webContents.mainFrame ||
    !context.isAppURL(event.senderFrame.url)
  ) {
    throw new Error('Untrusted IPC sender');
  }
};
