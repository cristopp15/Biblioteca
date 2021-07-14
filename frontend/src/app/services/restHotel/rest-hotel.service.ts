import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestHotelService {
  endpoint = 'http://localhost:3800/hotel/';
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

  getHotels():Observable<any>{
    return this.http.get(this.endpoint + 'findAll', this.httpOptions).pipe(map(this.extractData));
  }

  getHotel(search){
    let p = {search: search}
    let params = JSON.stringify(p);

    let httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('tokenUser')
      })
    };

    return this.http.post(this.endpoint + 'getHotel', params, httpOptionsAuth).pipe(map(this.extractData))

  }



}
