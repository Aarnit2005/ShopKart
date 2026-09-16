package com.example.ecommerceplatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class EcommercePlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommercePlatformApplication.class, args);
    }
}
