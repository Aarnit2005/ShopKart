package com.example.ecommerceplatform.service;

import com.example.ecommerceplatform.entity.Payment;
import com.example.ecommerceplatform.repository.PaymentRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Payment processPayment(Payment payment) {

        payment.setStatus("SUCCESS");

        return paymentRepository.save(payment);
    }
}
