import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { MagazineModel } from 'src/app/models/magazine.model';


@Injectable({
  providedIn: 'root'
})
export class RestMagazineService {
  endpoint = 'http://localhost:4000/magazine/';
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

  getMagazines():Observable<any>{

    return this.http.get(this.endpoint + 'listMagazines', this.httpOptions).pipe(map(this.extractData));
  }

  getMagazine(id: any):Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenUser')
    });
    return this.http.get(this.endpoint + 'showMagazine/' + id, {headers: headers}).pipe(map(this.extractData));

  }

  createMagazine(dataMagazine){
    let params = JSON.stringify(dataMagazine);
    return this.http.post(this.endpoint + 'createMagazine', params, this.httpOptions).pipe(
      map(this.extractData)
    )
  }

  editMagazine(id, dataMagazine){
    let params = JSON.stringify(dataMagazine);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenUser')
    });
    return this.http.put(this.endpoint + 'updateMagazine/' + id, params, {headers: headers}).pipe(map(this.extractData))
  }

  deleteMagazine(id: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenUser')
    });
    return this.http.delete(this.endpoint + 'deleteMagazine/' + id, {headers: headers}).pipe(map(this.extractData))
  }

  

}
