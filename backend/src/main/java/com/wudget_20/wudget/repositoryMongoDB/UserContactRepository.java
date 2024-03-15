package com.wudget_20.wudget.repositoryMongoDB;

import com.wudget_20.wudget.model.UserContacts;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserContactRepository
  extends MongoRepository<UserContacts, String> {}
