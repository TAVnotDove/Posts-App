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

  constructor(private postsService: PostsService, private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get("postId")
    
    this.postsService.getPost(postId!).subscribe({
      next: (v: any) => {
        this.post = v
      },
      error: (e) => {
        console.error(e)
      }
    })
  }
}
