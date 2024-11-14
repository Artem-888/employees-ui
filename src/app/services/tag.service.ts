import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Tag} from '../interfaces/tag';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  baseUrl = 'http://localhost:3000/';
  tags = new BehaviorSubject<Tag[]>([]);

  constructor(private http: HttpClient) {
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}tag`);
  }

  createTag(name: string | null): Observable<Tag[]> {
    return this.http.post<Tag[]>(`${this.baseUrl}tag`, {name});
  }

  deleteTag(id: string): Observable<Tag[]> {
    return this.http.delete<Tag[]>(`${this.baseUrl}tag/${id}`);
  }
}
