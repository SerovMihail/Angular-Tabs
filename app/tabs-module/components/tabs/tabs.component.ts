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
export class TabsComponent implements OnInit, AfterContentInit {
  
  @ContentChildren(TabComponent) tabsComponents: QueryList<TabComponent>;


  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2,
    private readonly tabsService: TabsService
  ) {}

  ngOnInit() {}

  ngAfterContentInit() {
    this.initTabs();

    this.subscribeTabsLengthChanges();

    this.subscribeActiveTabIndexChange();
  }

  private subscribeActiveTabIndexChange() {
    this.tabsService.activeTabIndex$.subscribe(activeTabIndex => {

      debugger;

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
        tab.setTabIndex(index);

        if (tab.isActive) {
          activeTabIndex = index;
        }
      });

      if (activeTabIndex === -1) {
        this.tabsComponents.first.activateTab();
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
    });

    firstTabComponent.activateTab();
  }

  private deactivateAllTabs() {
    this.tabsComponents.forEach(tab => tab.deactivateTab());
  }
}
