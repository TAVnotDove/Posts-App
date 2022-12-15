import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.css']
})
export class DeleteCommentComponent implements OnInit {
  comment: any = null

  constructor(private router: Router,
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    const commentId = this.activatedRoute.snapshot.paramMap.get("commentId")
    
    this.commentsService.getComment(commentId!).subscribe({
      next: (v: any) => {
        this.comment = v
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  deleteComment(): void {
    const commentId = this.activatedRoute.snapshot.paramMap.get("commentId")
    const user = JSON.parse(localStorage.getItem("user")!);

    this.commentsService.deleteComment(user.accessToken, commentId!).subscribe({
      next: () => {
        this.router.navigate([`/post/details/${this.comment.postId}`]);
      },
      error: (e) => {
        console.error(e)
      }
    })
  }
}
