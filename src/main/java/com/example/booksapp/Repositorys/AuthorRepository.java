package com.example.booksapp.Repositorys;

import com.example.booksapp.Models.Author;
import org.springframework.data.repository.CrudRepository;

public interface AuthorRepository extends CrudRepository<Author,Integer> {
}
