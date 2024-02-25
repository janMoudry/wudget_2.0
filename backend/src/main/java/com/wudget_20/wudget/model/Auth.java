package com.wudget_20.wudget.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "auth")
public class Auth {

  @Id
  @Column(name = "sub")
  private UUID sub;

  @Column(name = "access_token")
  private String access_token;

  @Column(name = "token_type")
  private String token_type = "Bearer";

  @Column(name = "expires_in")
  private int expires_in;

  @Column(name = "refresh_token")
  private String refresh_token;

  @Column(name = "created_at")
  private long created_at;

  public Auth(UUID sub, String token) {
    this.sub = sub;
    this.access_token = token;
    this.expires_in = 3600;
    this.refresh_token = UUID.randomUUID().toString();
    this.created_at = System.currentTimeMillis();
  }
}
