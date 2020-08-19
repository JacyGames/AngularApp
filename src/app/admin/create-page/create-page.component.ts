import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../common/interfaces";
import {PostService} from "../../post.service";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup
  constructor(
    public postMaker: PostService,
    private alert: AlertService
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required])
    })
  }

  submit() {
    const post: Post = {
      name: this.form.value.name,
      content: this.form.value.content,
      author: this.form.value.author,
      date: new Date()
    }
    this.postMaker.sendPost(post).subscribe(response => {
      this.form.reset();
      this.alert.success('Post was created!');
    })
      }
}
