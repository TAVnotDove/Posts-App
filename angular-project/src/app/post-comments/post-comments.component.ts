import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../services/comments.service';
import { dateConverter } from '../utils/date-converter.util';
import { trimmedLengthValidator } from '../validators/trimmed-length.validator';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {
  error: string | null = null
  comments: any = null
  user: any = null
  loading: boolean = true

  form = this.fb.group({
    comment: ["", [Validators.required, trimmedLengthValidator(1)]]
  })

  constructor(private fb: FormBuilder,
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute,
    private themesService: ThemesService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem("user")!);

    if (user) {
      this.user = user
    }

    this.updateComments()
  }

  updateComments(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get("postId")

    this.commentsService.getComments().subscribe({
      next: (v: any) => {
        this.loading = false

        if (v?.length === 0) {
          this.comments = null
        } else {
          const mappedComments = v.map((x: any) => {
            x._createdOn = dateConverter(x._createdOn)

            if (x._updatedOn) {
              x._updatedOn = dateConverter(x._updatedOn)
            }

            return x
          })

          const filteredComments = mappedComments.filter((x: any) => x.postId === postId);

          if (filteredComments.length === 0) {
            this.comments = null
          } else {
            this.comments = filteredComments
          }
        }
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  createComment(): void {
    const commentData = this.form.value
    const postId = this.activatedRoute.snapshot.paramMap.get("postId")

    this.commentsService.createComment({
      postId: postId!,
      comment: commentData.comment!,
      author: this.user?.username
    }, this.user?.accessToken!).subscribe({
      next: () => {
        this.form.reset()
        this.updateComments()
      },
      error: (e) => {
        if (e.status === 0) {
          this.error = "The server failed to connect."
        } else if (e.status === undefined) {
          this.error = "You need to be logged in to comment."
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
