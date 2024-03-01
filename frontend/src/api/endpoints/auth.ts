import {
  BankIdResponse,
  BeAuthType,
  LoginConfigResponse,
  STORAGE_VALUES,
  TokenResponse,
} from "@types";
import { api } from "../fetch";

export const getRedirectUri = async (rememberMe: boolean): Promise<string> => {
  const res = await api.get("/auth/redirectUri", {
    rememberMe,
  });

  return res;
};

export const login = async (
  tokenResponse: TokenResponse
): Promise<{
  BankIdResponse: BankIdResponse;
  BeAuthResponse: BeAuthType;
  Config: LoginConfigResponse;
}> => {
  const res = await api.post("/auth/login", tokenResponse);

  return res;
};

export const logout = async ({ clientId }: { clientId: string }) => {
  await api.get("/auth/logout", {
    clientId,
  });
};

export const loginWithRefreshToken = async (
  refreshToken: STORAGE_VALUES["refresh_token"]
): Promise<{
  BankIdResponse: BankIdResponse;
  BeAuthResponse: BeAuthType;
  Config: LoginConfigResponse;
}> => {
  const res = await api.get("/auth/loginWithRefreshToken", refreshToken);

  return res;
};
