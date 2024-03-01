package com.wudget_20.wudget.utils;

import com.wudget_20.wudget.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JWT {

  public static String generateJWT(User user, String SECRET) {
    Map<String, Object> claims = new HashMap<>();

    claims.put("sub", user.getSub());
    claims.put("txn", user.getTxn());
    claims.put("given_name", user.getGiven_name());
    claims.put("family_name", user.getFamily_name());
    claims.put("gender", user.getGender());
    claims.put("birthdate", user.getBirthdate());
    claims.put("zoneinfo", user.getZoneinfo());
    claims.put("locale", user.getLocale());
    claims.put("phone_number", user.getPhone_number());
    claims.put("email", user.getEmail());
    claims.put("updated_at", user.getUpdated_at());
    claims.put("name", user.getName());
    claims.put("phone_number", user.getPhone_number());

    return Jwts
      .builder()
      .addClaims(claims)
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
      .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
      .compact();
  }
}
