import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GithubSearch, GithubUserDetail } from '../interfaces/github.interface';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private token = environment.githubToken;
  private searchUrl = 'https://api.github.com/search/users';
  private userUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }

  private searchUsers(query: string, page: number = 1, perPage: number = 10): Observable<GithubSearch> {
    const params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http.get<GithubSearch>(this.searchUrl, { ...this.getHeaders(), params });
  }

  private getUserDetails(username: string): Observable<GithubUserDetail> {
    return this.http.get<GithubUserDetail>(`${this.userUrl}/${username}`, this.getHeaders());
  }

  public searchUsersWithDetails(query: string, page: number = 1, perPage: number = 10): Observable<GithubUserDetail[]> {
    return this.searchUsers(query, page, perPage).pipe(
      switchMap(response =>
        forkJoin(
          response.items.map(user =>
            this.getUserDetails(user.login).pipe(
              map(detail => ({
                ...detail,
                score: user.score,
              }))
            )
          )
        )
      )
    );
  }
}
