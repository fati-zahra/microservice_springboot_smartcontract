package com.example.demo;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.entity.AppRole;
import com.example.demo.entity.AppUser;
import com.example.demo.services.AccountService;



@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class AuthServiceApplication {

 public static void main(String[] args) {
     SpringApplication.run(AuthServiceApplication.class, args);
 }

 @Bean
 PasswordEncoder passwordEncoder() {
     
     return new BCryptPasswordEncoder();
 }

 @Bean
 CommandLineRunner  start(AccountService accountService) {
     return args -> {
         // ROLES
         accountService.addNewRole(new AppRole(null, "USER"));
         accountService.addNewRole(new AppRole(null, "ADMIN"));
       
         // USERS
         accountService.addNewUser(new AppUser(null, "user1", "amal@gmail.com", "1234", new ArrayList<>()));
         accountService.addNewUser(new AppUser(null, "admin",  "fati@gmail.com", "1234", new ArrayList<>()));
         accountService.addNewUser(new AppUser(null, "user2",  "oma@gmail.com", "1234", new ArrayList<>()));
         
         // MAPPING ROLE-USER
         accountService.addRoleToUser("user1", "USER");
         accountService.addRoleToUser("admin", "ADMIN");
         accountService.addRoleToUser("user2", "USER");
        

     };
 }
}
