package com.wudget_20.wudget.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BankIdResponse {

  private String id_token;

  private String access_token;

  private String token_type;

  private String expires_in;

  private String scope;
}
