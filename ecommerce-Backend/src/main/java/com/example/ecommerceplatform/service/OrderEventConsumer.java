package com.example.ecommerceplatform.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderEventConsumer {

    @KafkaListener(
            topics = "order-created",
            groupId = "ecommerce-group"
    )
    public void consumeOrderCreatedEvent(String message) {

        System.out.println(
                "Kafka Event Received: " + message
        );
    }
}