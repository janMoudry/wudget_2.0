package com.wudget_20.wudget.config;

import com.wudget_20.wudget.utils.ApiKeyFilter;
import com.wudget_20.wudget.utils.AuthFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

  @Bean
  FilterRegistrationBean<ApiKeyFilter> apiKeyFilterRegistration(
    ApiKeyFilter apiKeyFilter
  ) {
    FilterRegistrationBean<ApiKeyFilter> registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(apiKeyFilter);
    registrationBean.addUrlPatterns("/api/*");
    registrationBean.setOrder(1);
    return registrationBean;
  }

  @Bean
  FilterRegistrationBean<AuthFilter> authFilterRegistration(
    AuthFilter authFilter
  ) {
    FilterRegistrationBean<AuthFilter> registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(authFilter);
    registrationBean.addUrlPatterns("/api/*");
    registrationBean.setOrder(2);
    return registrationBean;
  }
}
