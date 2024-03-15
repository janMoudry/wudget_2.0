package com.wudget_20.wudget.service;

import com.wudget_20.wudget.utils.EmailSender;
import java.nio.charset.StandardCharsets;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

@Service
public class EmailService {

  private final EmailSender emailSender;

  public EmailService(EmailSender emailSender) {
    this.emailSender = emailSender;
  }

  public void sendTestEmail(String to, String lang) {
    String subject;

    switch (lang) {
      case "en_ENG":
        subject = "Test email";
        break;
      case "cs_CZ":
        subject = "Testovací email";
        break;
      default:
        subject = "Test email";
    }

    emailSender.sendEmail(to, subject, "asd", false, lang);
  }

  public void sendAccountCreatedEmail(String to, String lang) {
    String subject;

    switch (lang) {
      case "en_ENG":
        subject = "Account created";
        break;
      case "cs_CZ":
        subject = "Účet vytvořen";
        break;
      default:
        subject = "Account created";
    }

    String htmlContent = loadHtmlTemplate("account-created", lang);

    if (htmlContent != null) {
      emailSender.sendEmail(to, subject, htmlContent, true, lang);
    }
  }

  public void subscribe(String email, String lang) {
    String subject;

    switch (lang) {
      case "en_ENG":
        subject = "Subscribed";
        break;
      case "cs_CZ":
        subject = "Přihlášen";
        break;
      default:
        subject = "Subscribed";
    }

    String htmlContent = loadHtmlTemplate("subscribe", lang);

    if (htmlContent != null) {
      emailSender.sendEmail(email, subject, htmlContent, true, lang);
    }
  }

  private String loadHtmlTemplate(String templateName, String lang) {
    String basePath = "email-templates/"; // Path relative to src/main/resources

    String fullPath = basePath + lang + "/" + templateName + ".html";
    System.out.println("Loading template: " + fullPath);

    ClassPathResource resource = new ClassPathResource(fullPath);

    try {
      String content = StreamUtils.copyToString(
        resource.getInputStream(),
        StandardCharsets.UTF_8
      );
      System.out.println("Template loaded successfully.");
      return content;
    } catch (Exception e) {
      System.out.println("Error loading template: " + fullPath);
      e.printStackTrace();
      return null;
    }
  }
}
