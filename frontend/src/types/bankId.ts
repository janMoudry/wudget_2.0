export interface TokenResponse {
  code: string;
  state: string;
}

export interface BankIdResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  token_type: string;
  scope: string;
}

export interface UserInfo {
  sub: string;
  txn: string;
  name: string;
  given_name: string;
  family_name: string;
  gender: string;
  birthdate: string;
  email: string;
  zoneinfo: string;
  locale: string;
  phone_number: string;
  updated_at: number;
  verified_claims?: {
    verification: {
      trust_framework: string;
      verification_process: string;
    };
  };
}
