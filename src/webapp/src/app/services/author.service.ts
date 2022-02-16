import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author-model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://localhost:8080/author'

  header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  addAuthor(author: Author): Observable<Author> {
    return this.httpClient.post<Author>(`${this.baseUrl}/add`, author, this.header);
  }

  getAllAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(`${this.baseUrl}/getAll`, this.header);
  }

  deleteAuthor(authorId: any): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete/${authorId}`);
  }

  editAuthor(author: Author): Observable<Author> {
    return this.httpClient.put<Author>(`${this.baseUrl}/edit`, author, this.header);
  }
}
