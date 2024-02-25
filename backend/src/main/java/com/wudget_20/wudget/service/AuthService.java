package com.wudget_20.wudget.service;

import com.wudget_20.wudget.gateways.BankIdRestApi;
import com.wudget_20.wudget.model.Auth;
import com.wudget_20.wudget.model.BankID;
import com.wudget_20.wudget.model.BankIdResponse;
import com.wudget_20.wudget.model.User;
import com.wudget_20.wudget.repository.AuthRepository;
import com.wudget_20.wudget.repository.UserRepository;
import com.wudget_20.wudget.utils.JWT;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  @Autowired
  private BankIdRestApi bankIdRestApi;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AuthRepository authRepository;

  @Value("${client_id}")
  private String clientId;

  @Value("${client_secret}")
  private String clientSecret;

  public ResponseEntity<String> redirectUri() {
    String url =
      "https://oidc.sandbox.bankid.cz/auth?client_id=96d21bab-c99e-4cb3-9aaa-4b50db39e77f&redirect_uri=https%3A%2F%2Fwudget.cz%2Fbankid&scope=profile.phonenumber%20profile.birthnumber%20profile.zoneinfo%20profile.gender%20openid%20profile.titles%20notification.claims_updated%20profile.name%20profile.birthplaceNationality%20profile.locale%20profile.idcards%20profile.maritalstatus%20profile.legalstatus%20profile.paymentAccounts%20profile.email%20offline_access%20profile.addresses%20profile.birthdate%20profile.updatedat&response_type=code&state=Bank%20iD%20works%21&nonce=5b58fee5-e5a5-4022-b31e-77aa2b45c2a2&prompt=login&display=page&acr_values=loa3";

    return ResponseEntity.ok().body(url);
  }

  public ResponseEntity<Map<String, Object>> loginViaBankId(BankID bankID) {
    try {
      BankIdResponse codeExchangeResponse = bankIdRestApi.tokenExchange(bankID);

      User userInfo = bankIdRestApi.getUserInfo(
        codeExchangeResponse.getAccess_token()
      );

      Optional<User> user = userRepository.findBySub(userInfo.getSub());

      if (user.isEmpty()) {
        userRepository.save(userInfo);
      }

      Auth auth = new Auth(userInfo.getSub(), JWT.generateJWT(userInfo));

      authRepository.save(auth);

      Map<String, Object> response = new HashMap<>();
      response.put("BankIdResponse", codeExchangeResponse);
      response.put("BeAuthResponse", auth);

      return ResponseEntity.ok().body(response);
    } catch (Exception e) {
      System.out.println(e);

      return ResponseEntity.badRequest().build();
    }
  }
}
