import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FbResponse, Post} from "./common/interfaces";
import {environment} from "../environments/environment";
import {map} from "rxjs/operators";

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {
  }

  sendPost(post : Post): Observable<Post>{
    return this.http.post<Post>(`${environment.FBdataBase}/posts.json`, post).
      pipe(
        map((response: FbResponse) => {
          return {
            id: response.name,
            name: post.name,
            content: post.content,
            author: post.author,
            date: new Date(post.date)
          }
        })
    )

  }
  getAllPosts() {
    return this.http.get(`${environment.FBdataBase}/posts.json`)
      .pipe(
        map((obj) => {
         return Object.keys(obj)
           .map(key => {
             return {
               ...obj[key],
               id: key,
               date: new Date(obj[key].date)
             }
           });
        })
      )
  }
  removePost(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.FBdataBase}/posts/${id}.json`)
  }
  getById(id: string): Observable<Post>{
    return this.http.get<Post>(`${environment.FBdataBase}/posts/${id}.json`)
      .pipe(
        map((response: Post) => {
          return {
            ...response,
            date: new Date(response.date),
            id
          }
        })
      )
  }
  updatePost(post: Post): Observable<Post>{
    return this.http.patch<Post>(`${environment.FBdataBase}/posts/${post.id}.json`, post)
  }
}

