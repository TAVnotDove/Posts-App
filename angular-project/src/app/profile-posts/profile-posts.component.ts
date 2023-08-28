import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent {
  error: string | null = null
  posts: any = null

  constructor(private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private themesService: ThemesService) { }

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get("profileId")

    this.postsService.getPosts().subscribe({
      next: (v: any) => {
        if (v?.length === 0) {
          this.posts = null
        } else {
          const filteredPosts = v.filter((x: any) => x._ownerId === profileId);

          if (filteredPosts.length === 0) {
            this.posts = null
          } else {
            this.posts = filteredPosts
          }
        }
      },
      error: (e) => {
        if (e.status === 0) this.error = "The server failed to connect."

        console.error(e)
      }
    })
  }

  getTheme(): string {
    return this.themesService.getTheme()
  }
}
