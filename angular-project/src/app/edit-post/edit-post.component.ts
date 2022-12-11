import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  form = this.fb.group({
    title: [],
    text: [],
    validators: []
  })
  
  post: any = null

  constructor(private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get("postId")
    
    this.postsService.getPost(postId!).subscribe({
      next: (v) => {
        this.post = v

        this.form = this.fb.group({
          title: [this.post.title],
          text: [this.post.text],
          validators: []
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
        console.error(e)
      }
    })
  }
}
