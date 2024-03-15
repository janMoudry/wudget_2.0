import { api } from "../fetch";

export const subscribe = async (email: string) => {
  await api.get("test/subscribe", { email });
};
