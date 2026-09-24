import { ipcMain } from 'electron';

import { IPC_CHANNELS } from '../../shared/ipc-channels';
import { appService } from '../services/app-service';
import { assertTrustedSender } from './trusted-sender';
import type { IpcContext } from './trusted-sender';

export const registerAppHandlers = (context: IpcContext): void => {
  ipcMain.handle(IPC_CHANNELS.app.getVersion, (event) => {
    assertTrustedSender(event, context);
    return appService.getVersion();
  });
};
