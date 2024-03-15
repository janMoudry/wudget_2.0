package com.wudget_20.wudget.config;

import com.wudget_20.wudget.utils.AuthFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

  @Autowired
  private AuthFilter authFilter;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(requests ->
        requests
          .requestMatchers(
            "/api/auth/redirectUri",
            "/api/auth/login",
            "/api/auth/loginWithRefreshToken",
            "/test/sendEmail",
            "/api/test/subscribe"
          )
          .permitAll()
          .anyRequest()
          .authenticated()
      )
      .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
      .exceptionHandling(handling ->
        handling.authenticationEntryPoint((request, response, authException) ->
          response.sendError(HttpServletResponse.SC_UNAUTHORIZED)
        )
      );

    return http.build();
  }
}
