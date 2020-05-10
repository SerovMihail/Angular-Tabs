import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class TabsService {
  activeTabIndex$ = new BehaviorSubject<number>(0);

  constructor() {}

  activateTabIndex(index: number) {
    this.activeTabIndex$.next(index);
  }
}
