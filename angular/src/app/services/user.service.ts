import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {User} from "../User.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'http://localhost:8080/'


  constructor(private http: HttpClient) {
  }

  getCount(): Observable<any>{
    return this.http.get(this.api)
  }

  add(user: User): Observable<any>{
    return this.http.post(this.api + 'add' , user)
  }

  sign(user: User): Observable<any>{
    return this.http.post(this.api + 'getOne', user)
  }

  getUsers(id: string | null): Observable<any>{
    return this.http.get(this.api + id)
  }

  getUserById(id: string | null): Observable<any>{
    return this.http.get(this.api + 'find/' + id)
  }

  delete(id: string | null): Observable<any>{
    return this.http.delete(this.api + 'delete/' + id)
  }

  update(id: string | null, user: User): Observable<any>{
    return this.http.put(this.api + 'update/' + id, user)
  }

  isLogged(){
    return !!localStorage.getItem("userId");
  }

}
