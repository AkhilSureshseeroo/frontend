import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Users } from './users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiURL="http://localhost:3000/users/";

  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})}

  constructor(private httpClient:HttpClient) { }
  getAll(): Observable<Users[]>{
    return this.httpClient.get<Users[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(user:any): Observable<Users>{
    return this.httpClient.post<Users>(this.apiURL +'/createuser/',JSON.stringify(user),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id:number):Observable<Users>{
    return this.httpClient.get<Users>(this.apiURL  + id,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id:any,user:any):Observable<Users>{
    return this.httpClient.patch<Users>(this.apiURL+ '/update/'+ id,JSON.stringify(user),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id:any):Observable<Users>{
    return this.httpClient.delete<Users>(this.apiURL + '/delete/'+ id,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}

