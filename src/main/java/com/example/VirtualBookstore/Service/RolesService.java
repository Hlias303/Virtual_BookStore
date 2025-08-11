package com.example.VirtualBookstore.Service;

import com.example.VirtualBookstore.Model.User;
import com.example.VirtualBookstore.Repo.RolesRepo;
import com.example.VirtualBookstore.Repo.UserRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesService {
    @Autowired
    RolesRepo roles_repo;
    @Autowired
    UserRepo user_repo;


    public void SaveUser(User user) throws Exception{
        user.setPassword(user.getPassword());
        user.setUsername(user.getUsername());


        if(user_repo.existsByusername(user.getUsername())){
            throw new Exception("Username Already Exists");
        }
        else {
            user.setRoles(roles_repo.findByName("USER"));
            user_repo.save(user);
        }
    }

    public void DeleteUser(int id) {
        user_repo.deleteById(id);
    }

    public List<User> ShowUsers() {
        return user_repo.findAll();
    }

    public void SaveAdmin(User user){
        user.setPassword(user.getPassword());
        user.setUsername(user.getUsername());
        user.setRoles(roles_repo.findByName("ADMIN"));
        user_repo.save(user);
    }



}
