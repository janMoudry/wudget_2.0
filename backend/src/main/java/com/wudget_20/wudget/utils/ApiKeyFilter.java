package com.wudget_20.wudget.utils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class ApiKeyFilter extends OncePerRequestFilter {

  @Value("${app.api.key}")
  private String apiKey;

  @SuppressWarnings("null")
  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain filterChain
  ) throws ServletException, IOException {
    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
      filterChain.doFilter(request, response);
    } else {
      String requestApiKey = request.getHeader("X-API-KEY");
      if (this.apiKey.equals(requestApiKey)) {
        filterChain.doFilter(request, response);
      } else {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
      }
    }
  }
}
