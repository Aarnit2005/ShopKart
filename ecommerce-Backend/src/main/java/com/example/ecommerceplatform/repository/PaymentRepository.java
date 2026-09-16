package com.example.ecommerceplatform.repository;

import com.example.ecommerceplatform.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
