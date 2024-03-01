package com.wudget_20.wudget.controller;

import com.wudget_20.wudget.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class testController {

  @Autowired
  private EmailService emailService;

  @RequestMapping("/hello")
  public String hello() {
    return "Hello World";
  }

  @GetMapping("/sendEmail")
  public String sendEmail() {
    emailService.sendTestEmail("moudryjan0@gmail.com", "cs_CZ");
    return "Email sent";
  }
}
