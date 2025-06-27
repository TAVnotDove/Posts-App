import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../../services/comments.service';
import { trimmedLengthValidator } from '../../validators/trimmed-length.validator';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit  {
  error: string | null = null
  comment: any = null
  loading: boolean = true

  form = this.fb.group({
    comment: ["", [Validators.required, trimmedLengthValidator(1)]]
  })

  constructor(private fb: FormBuilder,
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    const commentId = this.activatedRoute.snapshot.paramMap.get("commentId")
    
    this.commentsService.getComment(commentId!).subscribe({
      next: (v: any) => {
        this.loading = false
        this.comment = v
        
        this.form = this.fb.group({
          comment: [v.comment, [Validators.required, trimmedLengthValidator(1)]],
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
      this.comment?._id,
      {
        postId: this.comment?.postId,
        author: user?.username,
        comment: commentData.comment!,
      },
      user?.accessToken).subscribe({
      next: () => {
        this.router.navigate([`/post/details/${this.comment.postId}`])
      },
      error: (e) => {
        if (e.status === 0) {
          this.error = "The server failed to connect."
        } else if (e.status === 403) {
          this.error = "Editing isn't authorized."
        } else if (e.status === undefined) {
          this.error = "You need to be logged in to comment."
        } else {
          console.error(e)
        }
      }
    })
  }
}
