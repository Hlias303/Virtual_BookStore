package com.example.VirtualBookstore.Repo;

import com.example.VirtualBookstore.Model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface RolesRepo extends JpaRepository<Roles, Integer> {

    Set<Roles> findByName(String name);
}
