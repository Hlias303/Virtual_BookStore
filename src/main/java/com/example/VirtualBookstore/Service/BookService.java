package com.example.VirtualBookstore.Service;
import com.example.VirtualBookstore.Model.Books;
import com.example.VirtualBookstore.Model.User;
import com.example.VirtualBookstore.Repo.BookRepo;
import com.example.VirtualBookstore.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.print.Book;
import java.io.IOException;
import java.util.List;

@Service
public class BookService {

    @Autowired
    BookRepo repo;

    public List<Books> ShowAllBooks() {
        return repo.findAll(Sort.by("id"));
    }

    public Books ShowBookById(int id){
        return repo.findById(id).orElse(new Books());
    }

    public void AddBook(Books book) {
        repo.save(book);
    }
//
//    public void BookUpdate(int id, Books book) {
//        repo.save(book);
//    }

    public void DeleteBook(int id, Books book) {
        repo.deleteById(book.getId());
    }

    public void BookAddorUpdate(Books book, MultipartFile image) throws IOException {
        book.setImageName(image.getOriginalFilename());
        book.setImageType(image.getContentType());
        book.setImageData(image.getBytes());
        repo.save(book);
    }

    public Books GetBookByID(int bookID) {
        return repo.findById(bookID).orElse(new Books());
    }

    public List<Books> search(String keyword) {
        return repo.SearchBook(keyword);

    }
}
