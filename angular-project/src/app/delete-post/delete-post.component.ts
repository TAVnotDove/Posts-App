import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent {
  constructor(private router: Router,
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute){}
  
  deletePost(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get("postId")
    const user = JSON.parse(localStorage.getItem("user")!);

    this.postsService.deletePost(user.accessToken, postId!).subscribe({
      next: () => {
        this.router.navigate(["/posts"]);
      },
      error: (e) => {
        console.error(e)
      }
  })
  }
}
