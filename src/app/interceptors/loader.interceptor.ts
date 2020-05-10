import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from '../shared/services/loader.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    //rewrite HttpInterceptor in NgModule and then when i will load something width help http i will show preloader
    constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();//show preloader
        return next.handle(req).pipe(
            finalize(() => this.loaderService.hide())//hide preloader
        );
    }
}