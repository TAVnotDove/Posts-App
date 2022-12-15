import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit  {
  comment: any = null

  form = this.fb.group({
    comment: [],
    validators: []
  })

  constructor(private fb: FormBuilder,
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    const commentId = this.activatedRoute.snapshot.paramMap.get("commentId")
    
    this.commentsService.getComment(commentId!).subscribe({
      next: (v: any) => {
        this.comment = v
        
        this.form = this.fb.group({
          comment: [v.comment],
          validators: []
        })
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  editComment():void {
    const commentData = this.form.value
    const user = JSON.parse(localStorage.getItem("user")!);

    this.commentsService.editComment(
      this.comment._id,
      {
        postId: this.comment.postId,
        author: user.username,
        comment: commentData.comment!,
      },
      user.accessToken).subscribe({
      next: () => {
        this.router.navigate([`/post/details/${this.comment.postId}`])
      },
      error: (e) => {
        console.error(e)
      }
    })
  }
}
