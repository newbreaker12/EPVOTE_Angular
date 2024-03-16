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
  public createSubArticle(subArticle) : Observable<any> {
    return this.http.post<any>("https://localhost:44396/subarticle", subArticle, {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public updateSubArticle(subArticle) : Observable<any> {
    return this.http.put<any>("https://localhost:44396/subarticle", subArticle, {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public deleteSubArticle(id) : Observable<any> {
    return this.http.delete<any>("https://localhost:44396/subarticle/" + id, {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }

  public editArticle(article) : Observable<any> {
    return this.http.put<any>("https://localhost:44396/article", article, {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public createUser(user) : Observable<any> {
    return this.http.post<any>("https://localhost:44396/users", user, {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public editUser(user) : Observable<any> {
    return this.http.put<any>("https://localhost:44396/users", user, {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public deleteUser(id: string) {
    return this.http.delete<any>("https://localhost:44396/users/" + id, {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public getArticle(id) : Observable<any> {
    return this.http.get<any>("https://localhost:44396/article/"+id, {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public getUser(id) : Observable<any> {
    return this.http.get<any>("https://localhost:44396/users/"+id, {
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
  public getGroup(id: string) : Observable<any> {
    return this.http.get<any>("https://localhost:44396/groups/" + id, {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public getRoles() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/roles/all", {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public getUsers() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/users/all", {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public getVotes() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/vote/all", {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  getStatistics() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/subarticle/statistics", {
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
    return this.http.get("https://localhost:44396/users/login", {
      headers: new HttpHeaders ({'Authorization': username+':'+password})})
    }
    public getUserByEmail() : Observable<any>{
      return this.http.get("https://localhost:44396/users/email", {
        headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
      }


  public editGroup(group) : Observable<any> {
    return this.http.put<any>("https://localhost:44396/groups", group, {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public createGroup(group) : Observable<any> {
    return this.http.post<any>("https://localhost:44396/groups", group, {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
  public deleteGroup(id: string) : Observable<any> {
    return this.http.delete<any>("https://localhost:44396/groups/" + id, {
      headers: new HttpHeaders ({'Authorization': localStorage.getItem("username")+':'+localStorage.getItem("password")})})
  }
}
