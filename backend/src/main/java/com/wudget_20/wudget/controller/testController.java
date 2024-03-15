package com.wudget_20.wudget.controller;

import com.wudget_20.wudget.model.UserContacts;
import com.wudget_20.wudget.repositoryMongoDB.UserContactRepository;
import com.wudget_20.wudget.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class testController {

  @Autowired
  private EmailService emailService;

  @Autowired
  private UserContactRepository userContactRepository;

  @RequestMapping("/hello")
  public String hello() {
    return "Hello World";
  }

  @GetMapping("/sendEmail")
  public String sendEmail() {
    emailService.sendTestEmail("moudryjan0@gmail.com", "cs_CZ");
    return "Email sent";
  }

  @GetMapping("/subscribe")
  public String subscribe(@RequestParam("email") String email) {
    emailService.subscribe(email, "cs_CZ");

    UserContacts userContact = new UserContacts();

    userContact.setEmail(email);
    userContact.setCreated(new java.sql.Date(System.currentTimeMillis()));

    userContactRepository.save(userContact);

    return "Subscribed";
  }
}
