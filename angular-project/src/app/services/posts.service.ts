import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class PostsService {
    constructor(private http: HttpClient) {}

    createPost(createData: {title: string, text: string, username: string}, accessToken: string) {
        return this.http.post("http://localhost:3030/data/posts",
            JSON.stringify(createData),
            {headers: {
                "Content-Type": "application/json",
                "X-Authorization": accessToken,
            }}
        )
    }

    editPost(editData: {title: string, text: string, username: string}, accessToken: string, postId: string) {
        return this.http.put(`http://localhost:3030/data/posts/${postId}`,
            JSON.stringify(editData),
            {headers: {
                "Content-Type": "application/json",
                "X-Authorization": accessToken,
            }}
        )
    }
    
    getPost(postId: string) {
        return this.http.get(`http://localhost:3030/data/posts/${postId}`)
    }

    getPosts() {
        return this.http.get("http://localhost:3030/data/posts")
    }
}
