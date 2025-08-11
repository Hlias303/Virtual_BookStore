package com.example.VirtualBookstore.Repo;

import com.example.VirtualBookstore.Model.Books;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepo extends JpaRepository<Books,Integer> {
    List<Books> findByIdIn(List<Integer> ids);
}
