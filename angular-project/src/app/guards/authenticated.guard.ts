import { Injectable } from "@angular/core"
import { Router, UrlTree } from "@angular/router"
import { UserService } from "../services/user.service"

@Injectable({
    providedIn: "root"
})
export class AuthenticatedGuard  {
    constructor(private router: Router, private userService: UserService) { }

    canActivate(): true | UrlTree {
	    return this.checkIfLogged() || this.router.createUrlTree(["/posts"])
    }

    checkIfLogged(): boolean {
        return !this.userService.authenticateUser()
    }
}
