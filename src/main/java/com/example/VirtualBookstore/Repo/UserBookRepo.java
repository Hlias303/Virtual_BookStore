package com.example.VirtualBookstore.Repo;

import com.example.VirtualBookstore.Model.User;
import com.example.VirtualBookstore.Model.UserBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.awt.print.Book;
import java.util.List;

public interface UserBookRepo extends JpaRepository<UserBook, Integer> {
    UserBook user(User user);

    @Query("SELECT DISTINCT ub.book.id FROM UserBook ub")
    List<Integer> findAllBookIds();

    List<UserBook> findByUserId(Integer userId);
}
