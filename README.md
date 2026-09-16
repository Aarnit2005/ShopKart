# 🛒 ShopKart – Distributed E-Commerce & Order Management Platform

A full-stack e-commerce and order management platform built using **Java Spring Boot and React**. The system demonstrates core e-commerce workflows including user management, product management, shopping cart operations, order processing, payments, and event-driven order handling.

---

## 📌 Project Overview

**ShopKart** is a full-stack e-commerce application designed to simulate a modern online shopping platform.

The application consists of:

- A **Java Spring Boot backend** responsible for business logic, REST APIs, data management, order processing, and payment operations.
- A **React frontend** providing the user interface for browsing products, managing carts, placing orders, and interacting with the platform.

The project follows a layered backend architecture and demonstrates concepts commonly used in production-oriented software applications.

---

## 🚀 Key Features

### 👤 User Management

- User registration
- User authentication
- User profile management
- User-specific operations

### 📦 Product Management

- Product creation and management
- Product listing
- Product retrieval
- Product information management

### 🛒 Shopping Cart

- Add products to cart
- Update cart items
- Remove products from cart
- View cart contents
- Calculate order totals

### 📋 Order Management

- Create orders
- View orders
- Process order information
- Track order-related operations
- Manage order lifecycle

### 💳 Payment Processing

- Payment service integration
- Payment processing workflow
- Payment status handling
- Order-payment interaction

### ⚡ Event-Driven Order Processing

The backend includes order event producer and consumer components to demonstrate asynchronous event processing.

```text
Order Created
      ↓
Order Event
      ↓
Event Producer
      ↓
Message/Event System
      ↓
Event Consumer
      ↓
Order Processing
