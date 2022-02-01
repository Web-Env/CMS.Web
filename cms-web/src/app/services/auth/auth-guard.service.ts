import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route,
         CanActivate, CanActivateChild, CanLoad } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

    constructor(private authService: AuthService,
                private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.checkLoggedInAsync(state.url);
    }

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.checkLoggedInAsync(state.url);
    }

    public canLoad(route: Route): Promise<boolean> {
        return this.checkLoggedInAsync(route?.path);
    }

    public async checkLoggedInAsync(url: string | undefined): Promise<boolean> {
        let isLoggedIn = this.authService.isLoggedIn();
        
        if (isLoggedIn) {
            return true;
        }

        if (url != null) {
            this.authService.redirectUrl = url;
        }

        this.router.navigate(['/login']);
        return false;
    }
}