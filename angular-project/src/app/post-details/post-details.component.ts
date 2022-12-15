import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {
  post: any = null
  isOwner: boolean = false

  constructor(private postsService: PostsService, private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get("postId")
    const user = JSON.parse(localStorage.getItem("user")!);
    
    this.postsService.getPost(postId!).subscribe({
      next: (v: any) => {
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
}
