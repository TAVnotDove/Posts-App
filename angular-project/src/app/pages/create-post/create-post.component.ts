import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { trimmedLengthValidator } from '../../validators/trimmed-length.validator';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  error: string | null = null
  
  form = this.fb.group({
    title: ["", [Validators.required, trimmedLengthValidator(1)]],
    text: ["", [Validators.required, trimmedLengthValidator(1)]]
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
          if (e.status === 0) {
            this.error = "The server failed to connect."
          } else if (e.status === 403) {
            this.error = "Session timed out."
          } else {
            console.error(e)
          }
        }
    })
  }
}
