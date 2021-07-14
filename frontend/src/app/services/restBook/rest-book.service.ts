import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { BookModel } from 'src/app/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class RestBookService {
  endpoint = 'http://localhost:4000/book/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

    private extractData(res: Response){
      let body = res;
      return body || [] || {}
  }

  getBooks():Observable<any>{

    return this.http.get(this.endpoint + 'Books', this.httpOptions).pipe(map(this.extractData));
  }

  updateBook(id){

  }
  

  createBook(dataBook){
    let params = JSON.stringify(dataBook);
    return this.http.post(this.endpoint + 'createBook', params, this.httpOptions).pipe(
      map(this.extractData)
    )
  }

  getBook(id: any):Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenUser')
    });
    return this.http.get(this.endpoint + 'showBook/' + id, {headers: headers}).pipe(map(this.extractData));

  }

  deleteBook(id: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenUser')
    });
    
    return this.http.delete(this.endpoint + 'deleteBook/' + id, {headers: headers}).pipe(map(this.extractData))
  }

  editBook(id, dataBook){
    let params = JSON.stringify(dataBook);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenUser')
    });
    return this.http.put(this.endpoint + 'updateBook/' + id, params, {headers: headers}).pipe(map(this.extractData))

  }

  

}
