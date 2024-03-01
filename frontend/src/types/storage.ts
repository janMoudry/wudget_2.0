export type STORAGE_VALUES = {
  [STORAGE_KEYS.REFRESH_TOKEN]: {
    bankId: string;
    wudget: string;
  };
};

export enum STORAGE_KEYS {
  REFRESH_TOKEN = "refresh_token",
}
