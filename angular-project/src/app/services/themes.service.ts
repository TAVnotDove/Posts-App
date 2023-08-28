import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ThemesService {
    private currentTheme: string = localStorage.getItem("theme") || "dark"

    changeTheme() {
        const newTheme = this.currentTheme === "dark" ? "light" : "dark"

        localStorage.setItem("theme", newTheme)

        this.currentTheme = newTheme
    }

    getTheme(): string {
        return this.currentTheme
    }
}