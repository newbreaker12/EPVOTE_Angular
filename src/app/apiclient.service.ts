import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiclientService {

  constructor(public http: HttpClient) { }

  public createArticle(article) : Observable<any> {
    return this.http.post<any>("https://localhost:44396/article", article, {                                                                                                                                                                                 
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }

  public editArticle(article) : Observable<any> {
    return this.http.put<any>("https://localhost:44396/article", article, {                                                                                                                                                                                 
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }

  public getArticle(id) : Observable<any> {
    return this.http.get<any>("https://localhost:44396/article/"+id, {                                                                                                                                                                                 
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public getSubArticles(articleId) : Observable<any> {
    return this.http.get<any>("https://localhost:44396/subarticle/admin/article/"+articleId, {                                                                                                                                                                                 
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public getArticles() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/article/all", {                                                                                                                                                                                 
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public getGroups() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/groups/all", {                                                                                                                                                                                 
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public createVote() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/groups/create-vote", {                                                                                                                                                                                 
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public createSession(session) : Observable<any> {
    return this.http.post<any>("https://localhost:44396/session", session, {                                                                                                                                                                                 
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }

  public authenticate(username : string, password : string) : Observable<any>{
    return this.http.get("https://localhost:44396/users/login")
    }
}