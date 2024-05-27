import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { JwtPayload, jwtDecode } from "jwt-decode";

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
        // Get the required role from the route data
        const requiredRole = route.data['role'];
        return this.authService.userBackend?.pipe(
            take(1),
            map(user => {
                //console.log(user.role);

                const isAuth = !!user;
                console.log(isAuth);

                const token = user?.token;
                if (token) {


                    let decoded: any;
                    decoded = jwtDecode(token);
                    const newdecoded = jwtDecode<JwtPayload>(token);
                    console.log(newdecoded);

                    const groups = decoded.groups;
                    console.log(groups);


                    console.log(decoded);

                    console.log(JSON.stringify(decoded))
                    let updecoded = JSON.stringify(decoded);

                    // console.log(updecoded.groups);


                    const requiredRoles = route.data['role'] as string[]; // Get required roles from route data

                    if (isAuth) {
                        //if (user.role === requiredRole) {

                        if (requiredRoles && requiredRoles.length > 0) {
                            const userRoles = groups as string[]; // Get user's roles from the user object

                            // Check if the user has at least one of the required roles
                            const hasRequiredRole = userRoles.some(role => requiredRoles.includes(role));
                            return true;
                        }
                        else {
                            alert('You do not have permission to access this page.');
                        }
                        return true;

                    }
                }
                
                return this.router.createUrlTree(['/auth']);
                // }

            })

        );
    }

}




