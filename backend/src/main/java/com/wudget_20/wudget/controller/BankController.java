package com.wudget_20.wudget.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ban")
public class BankController {

  @GetMapping("/accounts")
  public String getAccount(@RequestParam("User_id") String id) {
    return "Account: " + id;
  }
}
