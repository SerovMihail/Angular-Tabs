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
  ViewChildren
} from "@angular/core";
import { TabsService } from "../../../services/tabs.service";
import { BaseTabPart } from "../base-tab-part";
import { TabContent } from "../../../directives/content.directive";

@Component({
  selector: "tab-content",
  templateUrl: "./tab-content.component.html",
  styleUrls: ["./tab-content.component.css"]
})
export class TabContentComponent extends BaseTabPart implements OnInit {
  @ContentChild(TabContent, { read: TemplateRef, static: true })
  _explicitContent: TemplateRef<any>;

  // @ContentChildren(TabContent, { read: TemplateRef  }) _explicitContent: QueryList<TemplateRef<any>>;

  activeClass = "tabs__content--active";

  activeTabIndex: number;

  constructor(
    readonly element: ElementRef,
    readonly renderer: Renderer2,
    private readonly tabsService: TabsService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly viewContainer: ViewContainerRef
  ) {
    super(element, renderer);
  }

  ngOnInit() {
    this.tabsService.activeTabIndex$.subscribe(activeTabIndex => {
      this.activeTabIndex = activeTabIndex;
      // this.changeDetector.detectChanges();
      // this.viewContainer.clear();
      debugger;

      this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this._explicitContent);
    });
  }

  get showContent() {
    console.log(`${this.activeTabIndex} ${this.tabIndex}`);
    return this.activeTabIndex === this.tabIndex;
  }
}
