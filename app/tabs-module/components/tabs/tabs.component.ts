import {
  Component,
  OnInit,
  ContentChildren,
  ViewChildren,
  QueryList,
  AfterContentInit,
  HostListener,
  ElementRef,
  Renderer2
} from "@angular/core";
import { TabComponent } from "../tab/tab.component";
import { tagNames, tabTitleActiveClass } from "../../config/tag-names";
import { TabsService } from "../../services/tabs.service";

@Component({
  selector: "tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.css"],
  host: { class: "tabs__titles" },
  providers: [TabsService]
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabsComponents: QueryList<TabComponent>;

  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2,
    private readonly tabsService: TabsService
  ) {}

  ngAfterContentInit() {
    this.initTabs();

    this.subscribeTabsLengthChanges();

    this.subscribeActiveTabIndexChange();
  }

  private subscribeActiveTabIndexChange() {
    this.tabsService.activeTabIndex$.subscribe(activeTabIndex => {
      this.deactivateAllTabs();

      const activeTab = this.tabsComponents.find(
        (element, index) => index === activeTabIndex
      );
      activeTab.activateTab();
    });
  }

  private subscribeTabsLengthChanges() {
    this.tabsComponents.changes.subscribe(changes => {
      const tabsComponentsArray = changes.toArray();
      if (!tabsComponentsArray.length) {
        return;
      }

      const activeTabIndex = -1;
      tabsComponentsArray.forEach((tab, index) => {
        if (tab.tabIndex === undefined || tab.tabIndex === null) {
          tab.observeActiveTabIndexChange();
        }

        tab.setTabIndex(index);

        if (tab.isActive) {
          activeTabIndex = index;
        }
      });

      if (activeTabIndex === -1) {
        this.tabsService.activeTabIndex$.next(0);
      }
    });
  }

  private initTabs() {
    const firstTabComponent = this.tabsComponents.first;
    if (!firstTabComponent) {
      return;
    }

    this.tabsComponents.forEach((tab, index) => {
      tab.deactivateTab();
      tab.setTabIndex(index);
      tab.observeActiveTabIndexChange();
    });

    firstTabComponent.activateTab();
  }

  private deactivateAllTabs() {
    this.tabsComponents.forEach(tab => tab.deactivateTab());
  }
}
