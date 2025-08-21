package com.example.VirtualBookstore.Controller;

import com.example.VirtualBookstore.Config.UserPrincipal;
import com.example.VirtualBookstore.Model.Books;
import com.example.VirtualBookstore.Service.BookService;
import com.example.VirtualBookstore.Service.RecommendSystem.RecommendEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

//@RequestMapping("/api")
@RestController
public class BookController {

     @Autowired
     private BookService service;

     @Autowired
     private RecommendEngine rec_service;

     @GetMapping("/Books")
    public List<Books> ShowBooks(){
         return service.ShowAllBooks();
     }
     @GetMapping("/Books/{id}")
     public Books ShowBook(@PathVariable int id){
        return service.ShowBookById(id);
     }

     @PostMapping("/AddBook")
     public void AddBook(@RequestPart Books book){
         service.AddBook(book);
     }

     @PostMapping("/AddBookImage")
    public void AddBook(@RequestPart Books book ,@RequestPart MultipartFile image){
         try {
             service.BookAddorUpdate(book, image);
         } catch (IOException e) {
             throw new RuntimeException(e);
         }
     }

     @GetMapping("/Books/{id}/image")
     public byte[] getImageByBookId(@PathVariable int id){
         Books book =  service.GetBookByID(id);
         return book.getImageData();
     }
     @PutMapping("/Books/{id}")
     public void UpdateBook(@PathVariable int id, @RequestPart Books book ,@RequestPart MultipartFile image){
         book.setId(id);
         try {
             service.BookAddorUpdate(book,image);
         } catch (IOException e) {
             throw new RuntimeException(e);
         }
     }

     @DeleteMapping("/Books/{id}")
     public void DeleteBook(@PathVariable int id, Books book){
        service.DeleteBook(id,book);
     }

     @GetMapping("/Books/search")
     public List<Books> SearchBook(@RequestParam String keyword){
         return service.search(keyword);
     }

     @GetMapping("/Recommendations")
    public List<Books> Recommendations(){
         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
         UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
         int userId = userPrincipal.getId();
         return rec_service.getRecommendationsForUser(userId,2);
     }


}
