package com.example.VirtualBookstore.Controller;


import com.example.VirtualBookstore.Model.Books;
import com.example.VirtualBookstore.Model.UserBook;
import com.example.VirtualBookstore.Service.UserBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class  UserBookController {

    @Autowired
    UserBookService userBookService;

    @GetMapping("/UserBooks")
    public List<UserBook> getUserBooks() {
        return userBookService.ShowUserBooks();
    }

    @PostMapping("/Books/AddSentiment/{id}")
    public void AddSentiment(@RequestPart UserBook userbook, @RequestPart Books book,@PathVariable int id){
        userBookService.AddSentiment(userbook,book,id);
    }
}
