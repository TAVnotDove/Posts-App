import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { ThemesService } from '../../services/themes.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent {
  error: string | null = null

  constructor(private router: Router,
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private themesService: ThemesService){}
  
  deletePost(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get("postId")
    const user = JSON.parse(localStorage.getItem("user")!);

    this.postsService.deletePost(user.accessToken, postId!).subscribe({
      next: () => {
        this.router.navigate(["/posts"]);
      },
      error: (e) => {
        if (e.status === 0) {
          this.error = "The server failed to connect."
        } else if (e.status === 403) {
          this.error = "Deleting isn't authorized."
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
