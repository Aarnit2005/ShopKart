package com.example.ecommerceplatform.repository;

import com.example.ecommerceplatform.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
