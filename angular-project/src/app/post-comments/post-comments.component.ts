import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {
  comments: any = null
  isOwner: boolean = false

  form = this.fb.group({
    comment: [],
    validators: []
  })
  
  constructor(private fb: FormBuilder,
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.updateComments()
  }

  updateComments(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get("postId")

    this.commentsService.getComments().subscribe({
        next: (v: any) => {
          this.comments = v.filter((x: any) => x.postId === postId);
        },
        error: (e) => {
          console.error(e)
        }
    })
  }
  
  createComment(): void {
    const commentData = this.form.value
    const postId = this.activatedRoute.snapshot.paramMap.get("postId")
    const user = JSON.parse(localStorage.getItem("user")!);

    this.commentsService.createComment({
      postId: postId!,
      comment: commentData.comment!,
      author: user.username
    }, user.accessToken!).subscribe({
        next: () => {
          this.updateComments()
        },
        error: (e) => {
          console.error(e)
        }
    })
  }
}
