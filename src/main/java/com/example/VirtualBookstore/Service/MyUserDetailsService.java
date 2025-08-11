package com.example.VirtualBookstore.Service;

import com.example.VirtualBookstore.Model.User;
import com.example.VirtualBookstore.Config.UserPrincipal;
import com.example.VirtualBookstore.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repo.findByUsername(username);

        if(user == null) {
            throw new UsernameNotFoundException("Could not find user: " + username);
        }

        return new UserPrincipal(user);
    }
}
