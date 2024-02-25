package com.wudget_20.wudget.controller;

import com.wudget_20.wudget.model.User;
import com.wudget_20.wudget.service.UserService;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping("/info")
  public ResponseEntity<User> getUserInfo(
    @RequestHeader("user_id") UUID user_id
  ) {
    return userService.getUserInfo(user_id);
  }
}
