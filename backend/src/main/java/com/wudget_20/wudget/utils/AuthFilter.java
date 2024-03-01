package com.wudget_20.wudget.utils;

import com.wudget_20.wudget.model.Auth;
import com.wudget_20.wudget.repository.AuthRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class AuthFilter extends OncePerRequestFilter {

  @Value("${jwt_secret}")
  private String secretKey;

  @Autowired
  private AuthRepository authRepository;

  @Override
  protected void doFilterInternal(
    @NonNull HttpServletRequest request,
    @NonNull HttpServletResponse response,
    @NonNull FilterChain filterChain
  ) throws ServletException, IOException {
    String token = request.getHeader("X-Auth-Token");

    if (token != null && token.startsWith("Bearer ")) {
      String jwt = token.substring(7);
      validateAndAuthenticateToken(jwt, response, filterChain, request);
    } else {
      filterChain.doFilter(request, response);
    }
  }

  private void validateAndAuthenticateToken(
    String jwt,
    HttpServletResponse response,
    FilterChain filterChain,
    HttpServletRequest request
  ) throws IOException, ServletException {
    Optional<Auth> authOptional = authRepository.findByAccessToken(jwt); // Implement findByAccessToken in your repository
    if (authOptional.isPresent()) {
      if (
        authOptional.get().getCreated_at() +
        (authOptional.get().getExpires_in() * 1000) <
        System.currentTimeMillis()
      ) {
        System.out.println("Token expired");

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        return;
      }

      UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
        null, // principal
        null, // credentials
        new ArrayList<>() // authorities, you might want to load these based on the authenticated user
      );
      SecurityContextHolder.getContext().setAuthentication(authentication);
      filterChain.doFilter(request, response);
    } else {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
  }
}
