import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ThemesService {
    constructor(private http: HttpClient) {}

    setTheme(themeData: {theme: string}, accessToken: string) {
        return this.http.post("http://localhost:3030/data/themes",
        JSON.stringify(themeData),
        {headers: {
            "Content-Type": "application/json",
            "X-Authorization": accessToken,
        }}
    )
    }

    changeTheme(themeData: {theme: string}, accessToken: string, profileId: string) {
        return this.http.put(`http://localhost:3030/data/themes/${profileId}`,
            JSON.stringify(themeData),
            {headers: {
                "Content-Type": "application/json",
                "X-Authorization": accessToken,
            }}
        )
    }

    getThemes() {
        return this.http.get("http://localhost:3030/data/themes")
        
    }
}