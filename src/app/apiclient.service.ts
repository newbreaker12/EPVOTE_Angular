import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiclientService {

  private baseUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  public createArticle(article): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/article`, article, {});
  }

  public createSubArticle(subArticle): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/subarticle`, subArticle, {});
  }

  public updateSubArticle(subArticle): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/subarticle`, subArticle, {});
  }

  public deleteSubArticle(id): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/subarticle/` + id, {});
  }

  public editArticle(article): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/article`, article, {});
  }

  public createUser(user): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, user, {});
  }

  public editUser(user): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users`, user, {});
  }

  public deleteUser(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/users/` + id, {});
  }

  public getArticle(id): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/article/` + id, {});
  }

  public getUser(id): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/` + id, {});
  }

  public getSubArticles(articleId): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/subarticle/admin/article/` + articleId, {});
  }

  public getArticles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/article/all`);
  }

  public getGroups(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/groups/all`, {});
  }

  public getGroup(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/groups/` + id, {});
  }

  public getRoles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/roles/all`, {});
  }

  public getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/all`, {});
  }

  public getVotes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/vote/all`, {});
  }

  public getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/subarticle/statistics`, {});
  }

  public getUserStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/subarticle/statistics/users`, {});
  }

  public createVote(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/groups/create-vote`, {});
  }

  public createSession(session): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/session`, session, {});
  }

  public authenticate(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, { email: username, password });
  }

  public getUserByEmail(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/email`);
  }

  public editGroup(group): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/groups`, group, {});
  }

  public createGroup(group): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/groups`, group, {});
  }

  public deleteGroup(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/groups/` + id, {});
  }

  getPinCode() {
    return this.http.get(`${this.baseUrl}/users/pincode`);
  }
}
