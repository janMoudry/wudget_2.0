package com.wudget_20.wudget;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
@EntityScan
public class WudgetApplication {

  public static void main(String[] args) {
    SpringApplication.run(WudgetApplication.class, args);
  }
}
