import { Directive, ViewContainerRef } from "@angular/core";

@Directive({ selector: "[tabContent]" })
export class TabContent {
  constructor(public viewContainer: ViewContainerRef) {}
}
