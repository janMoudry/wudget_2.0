package com.wudget_20.wudget.gateways;

import com.wudget_20.wudget.model.BankID;
import com.wudget_20.wudget.model.BankIdResponse;
import com.wudget_20.wudget.model.User;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class BankIdRestApi {

  private final RestTemplate restTemplate;

  @Value("${client_id}")
  private String clientId;

  @Value("${client_secret}")
  private String clientSecret;

  public BankIdRestApi(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public BankIdResponse tokenExchange(BankID bankId) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
    map.add("grant_type", "authorization_code");
    map.add("code", bankId.getCode());
    map.add("client_id", clientId);
    map.add("client_secret", clientSecret);
    map.add("redirect_uri", "https://wudget.cz/bankid");

    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(
      map,
      headers
    );

    String url = "https://oidc.sandbox.bankid.cz/token";
    ResponseEntity<BankIdResponse> response = restTemplate.postForEntity(
      url,
      request,
      BankIdResponse.class
    );
    BankIdResponse body = response.getBody();

    return body;
  }

  public User getUserInfo(String accessToken) {
    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(Objects.requireNonNull(accessToken));

    HttpEntity<String> request = new HttpEntity<>(headers);

    String url = "https://oidc.sandbox.bankid.cz/userinfo";
    ResponseEntity<User> response = restTemplate.postForEntity(
      url,
      request,
      User.class
    );

    User body = response.getBody();

    return body;
  }
}
