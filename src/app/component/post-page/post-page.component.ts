import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../post.service";
import {Observable} from "rxjs";
import {Post} from "../../common/interfaces";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>

  constructor(private road: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.post$ = this.road.params
      .pipe(
        switchMap((params) => {
          return this.postService.getById(params['id']);
        })
      )



  }

}
