import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  error: string | null = null
  posts: any = null
  loading: boolean = true

  constructor(private postsService: PostsService, private themesService: ThemesService) { }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe({
      next: (v: any) => {
        this.loading = false
        
        if (v?.length === 0) {
          this.posts = null
        } else {
          this.posts = v
        }
      },
      error: (e) => {
        if (e.status === 0) this.error = "The server failed to connect."
        
        if (e.status === 404) this.loading = false

        console.error(e)
      }
    })
  }

  getTheme(): string {
    return this.themesService.getTheme()
  }
}
