package com.wudget_20.wudget.utils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailSender {

  @Value("${spring.mail.username}")
  private String from;

  private final JavaMailSender mailSender;

  public EmailSender(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  public void sendEmail(
    String to,
    String subject,
    String htmlContent,
    boolean isHtml,
    String locale
  ) {
    MimeMessage message = mailSender.createMimeMessage();

    try {
      MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
      if (
        from != null &&
        to != null &&
        subject != null &&
        htmlContent != null &&
        locale != null
      ) {
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, isHtml);

        mailSender.send(message);
      }
    } catch (MessagingException e) {
      e.printStackTrace();
    }
  }
}
