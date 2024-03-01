package com.wudget_20.wudget.controller;

import com.wudget_20.wudget.model.BankID;
import com.wudget_20.wudget.service.AuthService;
import java.util.Map;
import java.util.UUID;
import javax.ws.rs.QueryParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private AuthService authService;

  @GetMapping("/redirectUri")
  public ResponseEntity<String> redirectUri(
    @RequestParam("rememberMe") boolean rememberMe
  ) {
    return authService.redirectUri(rememberMe);
  }

  @PostMapping("/login")
  public ResponseEntity<Map<String, Object>> BankId(
    @RequestBody BankID bankID
  ) {
    return authService.loginViaBankId(bankID);
  }

  @GetMapping("/logout")
  public ResponseEntity<Object> logout(@QueryParam("sub") UUID clientId) {
    return authService.logout(clientId);
  }

  @GetMapping("/loginWithRefreshToken")
  public ResponseEntity<Map<String, Object>> loginWithRefreshToken(
    @RequestParam("bankId") String refreshTokenBankId,
    @RequestParam("wudget") String refreshTokenWudget
  ) {
    return authService.loginWithRefreshToken(
      refreshTokenBankId,
      refreshTokenWudget
    );
  }
}
