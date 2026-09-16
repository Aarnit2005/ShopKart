package com.example.ecommerceplatform.service;

import com.example.ecommerceplatform.entity.Order;
import com.example.ecommerceplatform.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.ecommerceplatform.repository.CartRepository;
import com.example.ecommerceplatform.repository.ProductRepository;
import com.example.ecommerceplatform.entity.Cart;
import com.example.ecommerceplatform.entity.Product;

import java.util.List;

@Service
public class OrderService {

    private final OrderEventProducer orderEventProducer;

    private final OrderRepository orderRepository;

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;


    public OrderService(
            OrderRepository orderRepository,
            CartRepository cartRepository,
            ProductRepository productRepository,
            OrderEventProducer orderEventProducer) {

        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.orderEventProducer = orderEventProducer;
    }

    @Transactional
    public Order createOrder(Order order) {
        List<Cart> cartItems = cartRepository.findByUserId(order.getUserId());

        double total = 0;

        for (Cart cart : cartItems) {

            Product product = productRepository
                    .findById(cart.getProductId())
                    .orElse(null);

            if (product != null) {

                if (product.getStock() < cart.getQuantity()) {
                    throw new RuntimeException(
                            "Not enough stock for product: " + product.getName()
                    );
                }

                total += product.getPrice() * cart.getQuantity();

                product.setStock(
                        product.getStock() - cart.getQuantity()
                );

                productRepository.save(product);
            }
        }

        order.setTotalAmount(total);
        order.setStatus("PLACED");

        Order savedOrder = orderRepository.save(order);

        cartRepository.deleteAll(cartItems);

        orderEventProducer.sendOrderCreatedEvent(savedOrder.getId());

        return savedOrder;
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
