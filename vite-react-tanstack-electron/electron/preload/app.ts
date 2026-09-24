import { ipcRenderer } from 'electron';

import type { AppAPI } from '../../shared/api/app';
import { IPC_CHANNELS } from '../../shared/ipc-channels';

export const appAPI: AppAPI = {
  getVersion: () => ipcRenderer.invoke(IPC_CHANNELS.app.getVersion),
};
