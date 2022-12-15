import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class CommentsService {
    constructor(private http: HttpClient) {}

    createComment(createData: {postId: string, author: string, comment: string}, accessToken: string) {
        return this.http.post("http://localhost:3030/data/comments",
            JSON.stringify(createData),
            {headers: {
                "Content-Type": "application/json",
                "X-Authorization": accessToken,
            }}
        )
    }

    editComment(commentId: string, editData: {postId: string, author: string, comment: string}, accessToken: string) {
        return this.http.put(`http://localhost:3030/data/comments/${commentId}`,
            JSON.stringify(editData),
            {headers: {
                "Content-Type": "application/json",
                "X-Authorization": accessToken,
            }}
        )
    }

    deleteComment(accessToken: string, commentId: string) {
        return this.http.delete(`http://localhost:3030/data/comments/${commentId}`,
            {headers: {
                "X-Authorization": accessToken,
            }}
        )
    }
    
    getComment(commentId: string) {
        return this.http.get(`http://localhost:3030/data/comments/${commentId}`)
    }

    getComments() {
        return this.http.get("http://localhost:3030/data/comments")
    }
}
