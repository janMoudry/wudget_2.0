package com.wudget_20.wudget.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "users")
public class User {

  @Id
  @Column(name = "sub")
  private UUID sub;

  @Column(name = "txn")
  private String txn;

  @Column(name = "given_name")
  private String given_name;

  @Column(name = "family_name")
  private String family_name;

  @Column(name = "gender")
  private String gender;

  @Column(name = "birthdate")
  private String birthdate;

  @Column(name = "zoneinfo")
  private String zoneinfo;

  @Column(name = "locale")
  private String locale;

  @Column(name = "phone_number")
  private String phone_number;

  @Column(name = "updated_at")
  private long updated_at;

  @Column(name = "name")
  private String name;

  @Column(name = "email")
  private String email;

  @Column(name = "scope")
  private String scope;
}
