import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from 'src/app/models/post-model';
const POST_URL = 'http://localhost:7501/posts/thisIsIt';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<any> {
    return this.http.get(POST_URL+"/thisIsIt")
  }
}