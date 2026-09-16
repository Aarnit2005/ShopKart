package com.example.ecommerceplatform.controller;

import com.example.ecommerceplatform.entity.User;
import com.example.ecommerceplatform.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.example.ecommerceplatform.dto.LoginRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/login")
    public boolean login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest);
    }
}
