import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trimmedLengthValidator } from '../validators/trimmed-length.validator';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  error: string | null = null

  form = this.fb.group({
    title: ["", [Validators.required, trimmedLengthValidator(1)]],
    text: ["", [Validators.required, trimmedLengthValidator(1)]]
  })
  
  post: any = null

  constructor(private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private themesService: ThemesService){}

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get("postId")
    
    this.postsService.getPost(postId!).subscribe({
      next: (v) => {
        this.post = v

        this.form = this.fb.group({
          title: [this.post.title, [Validators.required, trimmedLengthValidator(1)]],
          text: [this.post.text, [Validators.required, trimmedLengthValidator(1)]]
        })
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  editPost():void {
    const postData = this.form.value
    const user = JSON.parse(localStorage.getItem("user")!);

    this.postsService.editPost({
      title: postData.title!,
      text: postData.text!,
      username: this.post.username,
    },
    user.accessToken,
    this.post._id).subscribe({
      next: () => {
        this.router.navigate([`/posts`])
      },
      error: (e) => {
        if (e.status === 0) {
          this.error = "The server failed to connect."
        } else if (e.status === 403) {
          this.error = "Editing isn't authorized."
        } else {
          console.error(e)
        }
      }
    })
  }

  getTheme(): string {
    return this.themesService.getTheme()
  }
}
