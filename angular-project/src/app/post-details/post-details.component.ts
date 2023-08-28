import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { dateConverter } from '../utils/date-converter.util';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {
  post: any = null
  isOwner: boolean = false

  constructor(private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private themesService: ThemesService) { }

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get("postId")
    const user = JSON.parse(localStorage.getItem("user")!);

    this.postsService.getPost(postId!).subscribe({
      next: (v: any) => {
        v._createdOn = dateConverter(v._createdOn)

        if (v._updatedOn) {
          v._updatedOn = dateConverter(v._updatedOn)
        }

        this.post = v

        if (user) {
          if (v._ownerId === user._id) {
            this.isOwner = true
          }
        }
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  getTheme(): string {
    return this.themesService.getTheme()
  }
}
