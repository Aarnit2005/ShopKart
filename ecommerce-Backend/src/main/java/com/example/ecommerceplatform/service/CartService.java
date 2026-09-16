package com.example.ecommerceplatform.service;

import com.example.ecommerceplatform.entity.Cart;
import com.example.ecommerceplatform.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> getUserCart(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void removeFromCart(Long id) {
        cartRepository.deleteById(id);
    }
}