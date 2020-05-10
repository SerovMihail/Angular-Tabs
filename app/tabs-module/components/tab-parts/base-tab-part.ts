import { ElementRef, Renderer2 } from "@angular/core";

export abstract class BaseTabPart {

  tabIndex: number;

  isActive = false;

  abstract activeClass: string;

  constructor(
    readonly element: ElementRef,
    readonly renderer: Renderer2
  ) {}

  ngOnInit() {}

  activateTab() {
    this.isActive = true;
    this.renderer.addClass(this.element.nativeElement, this.activeClass);
  }

  deactivateTab() {
    this.isActive = false;
    this.renderer.removeClass(this.element.nativeElement, this.activeClass);
  }

  setTabIndex(index: number) {
    this.tabIndex = index;
  }
}
