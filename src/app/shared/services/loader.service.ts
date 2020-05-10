import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class LoaderService {
    globalLoader = {
        isLoading$: new Subject<boolean>(),
        isBlocked: false
    }
    // show global preloader
    show() {
        if(!this.globalLoader.isBlocked)
        {
            this.globalLoader.isLoading$.next(true);
        }
    }
    // hide global preloader
    hide() {
        this.globalLoader.isLoading$.next(false);
    }
    // block global preloader
    blockGlobal() {
        this.globalLoader.isBlocked = true;
    }
    // unblock global preloader
    unblockGlobal() {
        this.globalLoader.isBlocked = false;
    }
}