import { BankIdResponse, BeAuthType, TokenResponse } from "@types";
import { api } from "../fetch";

export const getRedirectUri = async (): Promise<string> => {
  const res = await api.get("/auth/redirectUri");

  return res;
};

export const login = async (
  tokenResponse: TokenResponse
): Promise<{
  BankIdResponse: BankIdResponse;
  BeAuthResponse: BeAuthType;
}> => {
  const res = await api.post("/auth/login", tokenResponse);

  return res;
};
