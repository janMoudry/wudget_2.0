package com.wudget_20.wudget.repository;

import com.wudget_20.wudget.model.Auth;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepository extends JpaRepository<Auth, UUID> {
  Optional<Auth> findByAccessToken(String accessToken);

  Optional<Auth> findBySub(UUID sub);

  Optional<Auth> findByRefreshToken(String refreshToken);
}
