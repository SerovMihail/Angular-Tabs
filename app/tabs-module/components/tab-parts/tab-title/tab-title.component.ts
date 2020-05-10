import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  HostListener
} from "@angular/core";
import { TabsService } from "../../../services/tabs.service";
import { BaseTabPart } from "../base-tab-part";

@Component({
  selector: "tab-title",
  templateUrl: "./tab-title.component.html",
  styleUrls: ["./tab-title.component.css"],
  host: { class: "tabs__title" }
})
export class TabTitleComponent extends BaseTabPart implements OnInit {

  @HostListener("document:click", ["$event"])
  clickout(event) {
    if (this.element.nativeElement.contains(event.target)) {
      this.tabsService.activateTabIndex(this.tabIndex);
    }
  }

  activeClass = "tabs__title--active";

  constructor(
    readonly element: ElementRef,
    readonly renderer: Renderer2,
    private readonly tabsService: TabsService
  ) {
    super(element, renderer);
  }

  ngOnInit() {}
  
}
