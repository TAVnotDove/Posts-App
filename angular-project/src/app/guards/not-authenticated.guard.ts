import { Injectable } from "@angular/core"
import { CanActivate, Router, UrlTree } from "@angular/router"
import { UserService } from "../services/user.service"

@Injectable({
    providedIn: "root"
})
export class NotAuthenticatedGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }

    canActivate(): true | UrlTree {
	    return this.checkIfLogged() || this.router.createUrlTree(["/login"])
    }

    checkIfLogged(): boolean {
        return this.userService.authenticateUser()
    }
}
