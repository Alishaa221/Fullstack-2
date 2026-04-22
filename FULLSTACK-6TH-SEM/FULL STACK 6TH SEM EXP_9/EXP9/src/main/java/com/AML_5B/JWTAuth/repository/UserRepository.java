package com.AML_5B.JWTAuth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AML_5B.JWTAuth.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

}