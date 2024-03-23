import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiclientService {

  constructor(public http: HttpClient) { }

  public createArticle(article) : Observable<any> {
    return this.http.post<any>("https://localhost:44396/article", article, {})
  }
  public createSubArticle(subArticle) : Observable<any> {
    return this.http.post<any>("https://localhost:44396/subarticle", subArticle, {})
  }
  public updateSubArticle(subArticle) : Observable<any> {
    return this.http.put<any>("https://localhost:44396/subarticle", subArticle, {})
  }
  public deleteSubArticle(id) : Observable<any> {
    return this.http.delete<any>("https://localhost:44396/subarticle/" + id, {})
  }

  public editArticle(article) : Observable<any> {
    return this.http.put<any>("https://localhost:44396/article", article, {})
  }
  public createUser(user) : Observable<any> {
    return this.http.post<any>("https://localhost:44396/users", user, {})
  }
  public editUser(user) : Observable<any> {
    return this.http.put<any>("https://localhost:44396/users", user, {})
  }
  public deleteUser(id: string) {
    return this.http.delete<any>("https://localhost:44396/users/" + id, {})
  }
  public getArticle(id) : Observable<any> {
    return this.http.get<any>("https://localhost:44396/article/"+id, {})
  }
  public getUser(id) : Observable<any> {
    return this.http.get<any>("https://localhost:44396/users/"+id, {})
  }
  public getSubArticles(articleId) : Observable<any> {
    return this.http.get<any>("https://localhost:44396/subarticle/admin/article/"+articleId, {})
  }
  public getArticles() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/article/all")
  }
  public getGroups() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/groups/all", {})
  }
  public getGroup(id: string) : Observable<any> {
    return this.http.get<any>("https://localhost:44396/groups/" + id, {})
  }
  public getRoles() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/roles/all", {})
  }
  public getUsers() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/users/all", {})
  }
  public getVotes() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/vote/all", {})
  }
  getStatistics() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/subarticle/statistics", {})
  }
  public createVote() : Observable<any> {
    return this.http.get<any>("https://localhost:44396/groups/create-vote", {})
  }
  public createSession(session) : Observable<any> {
    return this.http.post<any>("https://localhost:44396/session", session, {})
  }

  public authenticate(username : string, password : string) : Observable<any>{
    return this.http.get("https://localhost:44396/users/login", {
      headers: new HttpHeaders ({'Authorization': username+':'+password})})
    }
    public getUserByEmail() : Observable<any>{
      return this.http.get("https://localhost:44396/users/email", {})
      }


  public editGroup(group) : Observable<any> {
    return this.http.put<any>("https://localhost:44396/groups", group, {})
  }
  public createGroup(group) : Observable<any> {
    return this.http.post<any>("https://localhost:44396/groups", group, {})
  }
  public deleteGroup(id: string) : Observable<any> {
    return this.http.delete<any>("https://localhost:44396/groups/" + id, {})
  }
}
