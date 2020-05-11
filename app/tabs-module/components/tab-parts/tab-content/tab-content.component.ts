import {
  Component,
  ElementRef,
  Renderer2,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  TemplateRef,
  ContentChild,
  ViewContainerRef,
  ContentChildren,
  QueryList,
  ViewChildren,
  AfterContentInit
} from "@angular/core";
import { TabsService } from "../../../services/tabs.service";
import { BaseTabPart } from "../base-tab-part";
import { TabContent } from "../../../directives/content.directive";

@Component({
  selector: "tab-content",
  templateUrl: "./tab-content.component.html",
  styleUrls: ["./tab-content.component.css"]
})
export class TabContentComponent extends BaseTabPart {
  @ContentChild(TabContent, { read: TemplateRef, static: true })
  _explicitContent: TemplateRef<any>;

  activeClass = "tabs__content--active";

  constructor(
    readonly element: ElementRef,
    readonly renderer: Renderer2,
    private readonly tabsService: TabsService,
    private readonly viewContainer: ViewContainerRef
  ) {
    super(element, renderer);
  }

  observeActiveTabIndexChange() {
    this.tabsService.activeTabIndex$.subscribe(activeTabIndex => {

      this.viewContainer.clear();

      if (this.tabIndex === activeTabIndex) {
        setTimeout(() => {
          this.viewContainer.createEmbeddedView(this._explicitContent);
        })
      }
    });
  }
}
