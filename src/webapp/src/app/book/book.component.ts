import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Book } from '../models/book-model';
import { BookService } from '../services/book.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @ViewChild('BookForm') private userForm!: NgForm;

  books!: Book[];

  bookForm!: FormGroup;
  closeResult = '';
  edit = true;

  constructor(
    private bookService: BookService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.getBookList();
  }

  clear() {
    this.initForm();
  }

  private initForm() {
    this.bookForm = new FormGroup({
      'id': new FormControl("", Validators.required),
      'name': new FormControl("", Validators.required),
      'isbn': new FormControl("", Validators.required),
      'genre': new FormControl("", Validators.required),
      'description': new FormControl("", Validators.required),
    })
  }

  onSubmit() {
    console.log(this.bookForm.value);
    if (!this.edit) {
      this.bookService.addBook(this.bookForm.value).subscribe(result => {
        this.getBookList();
        this.modalService.dismissAll();
        console.log("added")
      })
    } else {
      this.bookService.editBook(this.bookForm.value).subscribe(result => {
        this.getBookList();
        this.modalService.dismissAll();
      })
    }
  }

  getBookList() {
    this.bookService.getAllBooks().subscribe(result => {
      console.log(result);
      this.books = result;
    })
  }

  deleteBook(book: Book) {
    console.log(book);
    this.bookService.deleteBook(book.id).subscribe(result => {
      this.getBookList();
    })
  }

  editBook(book: Book) {
    this.edit = true;
    this.bookForm.setValue({ name: book.name, isbn: book.isbn, genre: book.genre, description: book.description, id: book.id })
  }


  open(content: any, book?: Book) {
    if (book) {
      console.log("this is an edit");
      this.editBook(book);
    } else {
      this.edit = false;
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.initForm();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
