import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  endpoint = 'http://localhost:4000/user/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }


  constructor(private http: HttpClient) { }

  register(dataUser){
    let params = JSON.stringify(dataUser);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenUser')
    });
    return this.http.post(this.endpoint + 'register', params, {headers: headers}).pipe(
      map(this.extractData)
    );
  }

  login(dataUser){
    let params = JSON.stringify(dataUser);
    return this.http.post(this.endpoint + 'login', params, this.httpOptions).pipe(
      map(this.extractData)
    );
  }

  updateUser(id: string, cui: string, name: string, username: string, email:string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenUser')
    });
    return this.http.put(this.endpoint + 'updateUser/' + id, {cui, name, username, email}, {headers: headers}).pipe(map(this.extractData))
  }

  deleteUser(id: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenUser')
    });
    
    return this.http.delete(this.endpoint + 'deleteUser/' + id, {headers: headers}).pipe(map(this.extractData))
  }

  getUsers():Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenUser')
    });
    return this.http.get(this.endpoint + 'users', {headers: headers}).pipe(map(this.extractData));
  }

  getUser(id: any):Observable<any>{
    return this.http.get(this.endpoint + 'getUser/' + id).pipe(map(this.extractData));

  }

  editUser(id, dataUser){
    let params = JSON.stringify(dataUser);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenUser')
    });
    return this.http.put(this.endpoint + 'updateUser/' + id, params, {headers: headers}).pipe(map(this.extractData))

  }



}

