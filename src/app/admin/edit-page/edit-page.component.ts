import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../post.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {Post} from "../../common/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  formMine: FormGroup
  post: Post
  upSub: Subscription
  submitting = false

  constructor(public road: ActivatedRoute,
              public postService: PostService,
              private alert: AlertService
              ) { }

  ngOnInit(): void {
    this.road.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.formMine = new FormGroup({
          name: new FormControl(post.name, Validators.required),
          text: new FormControl(post.content, [Validators.required])
      })
    });
  }

  submit() {
    this.submitting = true;
   this.upSub = this.postService.updatePost({
      ...this.post,
      name: this.formMine.value.name,
      content: this.formMine.value.text
    }).subscribe(() => {
     this.submitting = false;
     this.alert.success('Post updated successfully');
   })

  }
  ngOnDestroy() {
    if(this.upSub){
      this.upSub.unsubscribe();
    }
  }
}
