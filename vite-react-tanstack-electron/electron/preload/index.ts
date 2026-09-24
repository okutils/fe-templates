import { contextBridge } from 'electron';

import type { ElectronAPI } from '../../shared/api';
import { appAPI } from './app';

const api: ElectronAPI = {
  app: appAPI,
};

contextBridge.exposeInMainWorld('electronAPI', api);
