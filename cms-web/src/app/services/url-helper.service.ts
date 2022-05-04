import { Injectable } from "@angular/core";
import { Params } from "@angular/router";

@Injectable()
export class UrlHelperService {
    public isRouteParamObjectValid(routeParams: Params): boolean {
        if (routeParams && Object.keys(routeParams).length !== 0 && routeParams.constructor === Object) {
            return true;
        }

        return false;
    }

    public isRouteParamValid(routeParam: string): boolean {
        if (routeParam == null ||  routeParam === '') {
            return false;
        }

        return true;
    }
}