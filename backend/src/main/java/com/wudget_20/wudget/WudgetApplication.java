package com.wudget_20.wudget;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

// wudgetAdmin
// cC8XpEaeNTeiOj54
// mongodb+srv://wudgetAdmin:cC8XpEaeNTeiOj54@wudget.dbkzplq.mongodb.net/?retryWrites=true&w=majority&appName=wudget

@SpringBootApplication
@ComponentScan
@EntityScan
@EnableMongoRepositories
public class WudgetApplication {

  public static void main(String[] args) {
    SpringApplication.run(WudgetApplication.class, args);
  }
}
