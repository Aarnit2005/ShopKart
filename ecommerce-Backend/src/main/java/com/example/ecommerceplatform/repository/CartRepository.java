package com.example.ecommerceplatform.repository;

import com.example.ecommerceplatform.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserId(Long userId);

    void deleteByUserId(Long userId);
}

