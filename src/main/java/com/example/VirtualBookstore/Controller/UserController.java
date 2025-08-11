package com.example.VirtualBookstore.Controller;


import com.example.VirtualBookstore.Model.User;
import com.example.VirtualBookstore.Service.JwtService;
import com.example.VirtualBookstore.Service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin("*")
@RestController
public class UserController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private RolesService role_service;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/Register")
    public void AddUser(@RequestBody User user){
        try {
            role_service.SaveUser(user);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @PostMapping("/Register/Admin")
    public void AddAdmin(@RequestBody User user){
        role_service.SaveAdmin(user);
    }

    @GetMapping("/Users")
    public List<User> ShowUsers(){
        return role_service.ShowUsers();
    }

    @DeleteMapping("/Users/{id}")
    public void DeleteUser(@PathVariable int id){
        role_service.DeleteUser(id);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user){

        Authentication auth = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));

//        SecurityContextHolder.getContext().setAuthentication(auth);
        if(auth.isAuthenticated())
            return jwtService.generateToken(user.getUsername());
        else
            return "login-Failed";
//        return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
    }
}
