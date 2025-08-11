package com.example.VirtualBookstore.Service;

import com.example.VirtualBookstore.Model.Books;
import com.example.VirtualBookstore.Model.User;
import com.example.VirtualBookstore.Model.UserBook;
import com.example.VirtualBookstore.Repo.BookRepo;
import com.example.VirtualBookstore.Repo.UserBookRepo;
import com.example.VirtualBookstore.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserBookService {

    @Autowired
    private UserBookRepo repo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BookRepo bookRepo;


    public List<UserBook> ShowUserBooks() {
        return repo.findAll();
    }

    public void AddSentiment(UserBook userbook, Books book, int id) {
         book = bookRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

         //We use Authentication to get the current user object that want to review
         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
         String name = auth.getName();

         User user = userRepo.findByUsername(name);
         userbook.setBook(book);
         userbook.setUser(user);
         repo.save(userbook);
    }
}
