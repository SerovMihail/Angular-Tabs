import { Component, OnInit } from "@angular/core";
import { TabsService } from "./tabs-module/services/tabs.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {


  constructor() {}

  ngOnInit() {
  }

  public tabs = [ 1, 2 ];

  public dec() {
    this.tabs = this.tabs.slice(0, -1);
  } 

  public inc() {
    this.tabs = [ ...this.tabs, (this.tabs.length + 1) ];
  }


  
}
