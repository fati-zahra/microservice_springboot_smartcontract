package com.example.demo.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.entity.AppRole;
import com.example.demo.entity.AppUser;
import com.example.demo.services.AccountService;
import com.example.demo.utis.JWTUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;


@RestController
@RequestMapping("/login")

public class AccountRestController {
	@Autowired

    private AccountService accountService;

    public AccountRestController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping(path = "/users")
    @PostAuthorize("hasAuthority('USER')")
    public List<AppUser> appUsers() {
        return accountService.listUsers();
    }
    @PostMapping(path = " ")
    // @PostAuthorize("hasAuthority('ADMIN')")
    public List<AppUser> apUsers() {
        return accountService.listUsers();
    }
    
    @PostMapping(path = "/register")
    // @PostAuthorize("hasAuthority('ADMIN')")
     public AppUser saveUse(@RequestBody AppUser appUser) {
         return accountService.addNewUser(appUser);
     }

    @PostMapping(path = "/users")
    @PostAuthorize("hasAuthority('ADMIN')")
    public AppUser saveUser(@RequestBody AppUser appUser) {
        return accountService.addNewUser(appUser);
    }

    @PostMapping(path = "/roles")
    @PostAuthorize("hasAuthority('ADMIN')")
    public AppRole saveRole(@RequestBody AppRole appRole) {
        return accountService.addNewRole(appRole);
    }

    @PostMapping(path = "/addRoleToUser")
    @PostAuthorize("hasAuthority('ADMIN')")
    public void addRoleToUser(@RequestBody RoleUserForm roleUserForm) {
        accountService.addRoleToUser(roleUserForm.getUsername(), roleUserForm.getRoleName());
    }

    
}

@Data
class RoleUserForm {
    private String username;
    private String roleName;
}
