package com.wudget_20.wudget.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class AuthService {

  @Autowired
  private BankIdRestApi bankIdRestApi;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AuthRepository authRepository;

  @Autowired
  private EmailService emailService;

  @Value("${client_id}")
  private String clientId;

  @Value("${client_secret}")
  private String clientSecret;

  @Value("${jwt_secret}")
  private String SECRET;

  public ResponseEntity<String> redirectUri(Boolean rememberMe) {
    String clientId = "96d21bab-c99e-4cb3-9aaa-4b50db39e77f";
    String redirectUri = "https://wudget.cz/bankid";
    String state = createState(rememberMe);

    String url = UriComponentsBuilder
      .fromUriString("https://oidc.sandbox.bankid.cz/auth")
      .queryParam("client_id", clientId)
      .queryParam("redirect_uri", redirectUri)
      .queryParam(
        "scope",
        "profile.phonenumber profile.birthnumber profile.zoneinfo profile.gender openid profile.titles notification.claims_updated profile.name profile.birthplaceNationality profile.locale profile.idcards profile.maritalstatus profile.legalstatus profile.paymentAccounts profile.email offline_access profile.addresses profile.birthdate profile.updatedat"
      )
      .queryParam("response_type", "code")
      .queryParam("state", state)
      .queryParam("nonce", "5b58fee5-e5a5-4022-b31e-77aa2b45c2a2")
      .queryParam("prompt", "login")
      .queryParam("display", "page")
      .queryParam("acr_values", "loa3")
      .toUriString();

    return ResponseEntity.ok().body(url);
  }

  private String createState(Boolean rememberMe) {
    Map<String, Object> stateMap = new HashMap<>();
    stateMap.put("rememberMe", rememberMe);

    try {
      return new ObjectMapper().writeValueAsString(stateMap);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
      return "";
    }
  }

  @SuppressWarnings("null")
  public ResponseEntity<Map<String, Object>> loginViaBankId(BankID bankID) {
    try {
      BankIdResponse codeExchangeResponse = bankIdRestApi.tokenExchange(bankID);

      User userInfo = bankIdRestApi.getUserInfo(
        codeExchangeResponse.getAccess_token()
      );

      Optional<User> user = userRepository.findBySub(userInfo.getSub());

      if (user.isEmpty()) {
        emailService.sendAccountCreatedEmail(
          "moudryjan0@gmail.com",
          userInfo.getLocale()
        );

        userInfo.setScope(codeExchangeResponse.getScope());

        userRepository.save(userInfo);
      }

      Optional<Auth> authOptional = authRepository.findBySub(userInfo.getSub());

      if (authOptional.isPresent() && authOptional.get() != null) {
        authRepository.delete(authOptional.get());
      }

      Auth auth = new Auth(
        userInfo.getSub(),
        JWT.generateJWT(userInfo, SECRET)
      );

      authRepository.save(auth);

      Map<String, Object> config = new HashMap<>();

      String jsonState = bankID.getState();

      @SuppressWarnings("unchecked")
      Map<String, Object> state = new ObjectMapper()
        .readValue(jsonState, Map.class);

      config.put("rememberMe", state.get("rememberMe"));

      Map<String, Object> response = new HashMap<>();
      response.put("BankIdResponse", codeExchangeResponse);
      response.put("BeAuthResponse", auth);
      response.put("Config", config);

      return ResponseEntity.ok().body(response);
    } catch (Exception e) {
      System.out.println(e);

      return ResponseEntity.badRequest().build();
    }
  }

  @SuppressWarnings("null")
  public ResponseEntity<Object> logout(UUID sub) {
    Optional<Auth> authOptional = authRepository.findBySub(sub);

    if (authOptional.isPresent() && authOptional.get() != null) {
      authRepository.delete(authOptional.get());
    }

    // here will do logout from bankid

    return ResponseEntity.ok().build();
  }

  public ResponseEntity<Map<String, Object>> loginWithRefreshToken(
    String refreshTokenBankId,
    String refreshTokenWudget
  ) {
    if (refreshTokenBankId == null || refreshTokenWudget == null) {
      return ResponseEntity.badRequest().build();
    }

    Optional<Auth> auth = authRepository.findByRefreshToken(refreshTokenWudget);

    if (auth.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Optional<User> user = userRepository.findBySub(auth.get().getSub());

    if (user.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Auth newAuth = new Auth(
      user.get().getSub(),
      JWT.generateJWT(user.get(), SECRET)
    );

    authRepository.delete(auth.get());
    authRepository.save(newAuth);

    BankIdResponse bankIdResponse = bankIdRestApi.refreshTokenExchange(
      user.get().getScope(),
      refreshTokenBankId
    );

    Map<String, Object> response = new HashMap<>();
    response.put("BankIdResponse", bankIdResponse);
    response.put("BeAuthResponse", newAuth);

    return ResponseEntity.ok().body(response);
  }
}
