package com.wudget_20.wudget.service;

import com.wudget_20.wudget.model.User;
import com.wudget_20.wudget.repository.UserRepository;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public ResponseEntity<User> getUserInfo(UUID user_id) {
    Optional<User> user = userRepository.findBySub(user_id);

    System.out.println("User: ");

    if (user.isPresent()) {
      return ResponseEntity.ok(user.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
