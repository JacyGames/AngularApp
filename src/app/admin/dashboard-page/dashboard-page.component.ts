import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../post.service";
import {Post} from "../../common/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[]
  search = ''
  getSub: Subscription
  dlPost: Subscription

  constructor(
    public postService: PostService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getSub = this.postService.getAllPosts().subscribe((response) => {
      this.posts = response;
    })
  }

  deletePost(id: string) {
   this.dlPost = this.postService.removePost(id).subscribe(() => {
     this.alert.info('Post are deleted');
     this.posts = this.posts.filter(post => post.id !== id);
    })
  }
  ngOnDestroy() {
    if(this.getSub){
      this.getSub.unsubscribe();
    }
    if(this.dlPost) {
      this.dlPost.unsubscribe();
    }
  }
}
