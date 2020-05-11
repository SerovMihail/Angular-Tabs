import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ContentChild
} from "@angular/core";
import { TabTitleComponent } from "../tab-parts/tab-title/tab-title.component";
import { TabContentComponent } from "../tab-parts/tab-content/tab-content.component";

@Component({
  selector: "tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"]
})
export class TabComponent implements OnInit {
  @ContentChild(TabTitleComponent, { static: true })
  tabTitle: TabTitleComponent;

  @ContentChild(TabContentComponent, { static: true })
  tabContent: TabContentComponent;

  isActive: boolean;
  tabIndex: number;

  constructor() {}

  ngOnInit() {}

  activateTab() {
    this.isActive = true;
    this.tabTitle.activateTab();
    this.tabContent.activateTab();
  }

  deactivateTab() {
    this.isActive = false;
    this.tabTitle.deactivateTab();
    this.tabContent.deactivateTab();
  }

  setTabIndex(index: number) {
    this.tabIndex = index;
    this.tabTitle.setTabIndex(index);
    this.tabContent.setTabIndex(index);
  }

  observeActiveTabIndexChange() {
    this.tabContent.observeActiveTabIndexChange();
  }
}
