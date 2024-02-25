import { UserInfo } from "@types";
import { api } from "../fetch";

export const getUserInfo = async (): Promise<UserInfo> => {
  const res = await api.get("/user/info");

  return res;
};
