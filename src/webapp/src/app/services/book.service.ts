import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://localhost:8080/book'

  header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${this.baseUrl}/add`, book, this.header);
  }

  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.baseUrl}/getAll`, this.header);
  }

  deleteBook(bookId: any): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete/${bookId}`);
  }

  editBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.baseUrl}/edit`, book, this.header);
  }
}
