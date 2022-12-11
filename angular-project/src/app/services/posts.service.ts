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
    
    getPosts() {
        return this.http.get("http://localhost:3030/data/posts")
    }
}
