import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class MenutoggleService {
    menu = new BehaviorSubject('close');

    constructor() {

    }

    setMenu(x: any) {
        this.menu.next(x);
    }

    getMenu(): Observable<any> {
        return this.menu.asObservable();
    }

}
