import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  form = this.fb.group({
    title: [],
    text: [],
    validators: []
  })

  constructor(private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router){}

  createPost(): void {
    const postData = this.form.value
    const user = JSON.parse(localStorage.getItem("user")!);

    this.postsService.createPost({
      title: postData.title!,
      text: postData.text!,
      username: user.username
    }, user.accessToken!).subscribe({
        next: () => {
          this.router.navigate(["/posts"]);
        },
        error: (e) => {
          console.error(e)
        }
    })
  }
}
