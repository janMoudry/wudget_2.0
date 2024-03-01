import { api } from "../fetch";

export const getAccounts = async (): Promise<string> => {
  const res = await api.get("/bank/accounts");

  return res;
};
