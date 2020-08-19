import { Component, OnInit } from '@angular/core';
import {PostService} from "../../post.service";
import {Observable} from "rxjs";
import {Post} from "../../common/interfaces";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$: Observable<Post[]>

  constructor(public postServer: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postServer.getAllPosts();
  }

}
