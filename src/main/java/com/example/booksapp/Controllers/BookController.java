package com.example.booksapp.Controllers;

import com.example.booksapp.Models.Book;
import com.example.booksapp.Repositorys.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;
import java.util.List;

@Controller
@CrossOrigin
@RequestMapping( path = "/book")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @PostMapping( path = "/add")
    public ResponseEntity<Book>  addBook(@Valid @RequestBody Book book){
        try{
            bookRepository.save(book);
            System.out.println(book);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping( path = "/getAll")
    public ResponseEntity<List<Book>> getBooks(){
        try{
            System.out.println(bookRepository.findAllBooks());
            return new ResponseEntity<List<Book>>(bookRepository.findAllBooks(),HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping( path = "/delete/{bookId}")
    public ResponseEntity<Book> deleteBook(@Valid @PathVariable Integer bookId){
        try{
            bookRepository.deleteById(bookId);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception ex){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/edit")
    public ResponseEntity<Book> editBook(@Valid @RequestBody Book book){
        try{
            return new ResponseEntity<Book>(bookRepository.save(book),HttpStatus.OK);
        }catch (Exception ex) {
            return new ResponseEntity<Book>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
