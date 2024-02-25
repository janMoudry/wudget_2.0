package com.wudget_20.wudget.repository;

import com.wudget_20.wudget.model.User;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, UUID> {
  Optional<User> findBySub(UUID sub);
}
