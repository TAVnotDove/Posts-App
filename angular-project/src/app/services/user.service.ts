import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private http: HttpClient) {}

    registerUser(registerData: {username: string, email: string, password: string}) {
        return this.http.post("http://localhost:3030/users/register",
            JSON.stringify(registerData),
            {headers: {
                "Content-Type": "application/json",
            }}
        )
    }

    loginUser(userData: {email: string, password: string}) {
        return this.http.post("http://localhost:3030/users/login",
            JSON.stringify(userData),
            {headers: {
                "Content-Type": "application/json",
            }}    
        )
    }

    authenticateUser(): boolean {
        if (JSON.parse(localStorage.getItem("user")!)) return true

        return false
    }
}