export interface AppAPI {
  getVersion: () => Promise<string>;
}
