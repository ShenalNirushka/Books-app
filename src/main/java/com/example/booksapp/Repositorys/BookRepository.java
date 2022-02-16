package com.example.booksapp.Repositorys;

import com.example.booksapp.Models.Book;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book,Integer> {

    @Query(value = "SELECT * FROM Book",
    nativeQuery = true)
    List<Book> findAllBooks();
}
