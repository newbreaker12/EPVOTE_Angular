import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiclientService {

  constructor(public http: HttpClient) { }

  public getArticles() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/article/all", {                                                                                                                                                                                 
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }

  public authenticate(username : string, password : string) : Observable<any>{
    return this.http.get("https://localhost:44396/users/login")
    }
}