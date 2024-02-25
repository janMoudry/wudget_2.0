import { Language } from "@enums";
import { BankIdResponse } from "./bankId";
import { BeAuthType } from "./auth";

export type STORE_VALUES = {
  [STORE_KEYS.LANGUAGE]: Language;
  [STORE_KEYS.AUTH]: BankIdResponse;
  [STORE_KEYS.BE_AUTH]: BeAuthType;
};

export enum STORE_KEYS {
  LANGUAGE = "language",
  AUTH = "auth",
  BE_AUTH = "be_auth",
}
