import { app } from 'electron';

export const appService = {
  getVersion: (): string => app.getVersion(),
};
