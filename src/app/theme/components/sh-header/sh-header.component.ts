import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GlobalState} from "../../../global.state";

@Component({
  selector: 'app-sh-header',
  templateUrl: './sh-header.component.html',
  styleUrls: ['sh-header.component.scss']
})
export class ShHeaderComponent implements OnInit {
  viewBtn:boolean = false;

  constructor(private router: Router, private GlobalState:GlobalState) {
  }

  ngOnInit() {
    this.viewBtn = this.GlobalState.user_type == 'tj_expert';
  }

  toggleDB(){
    this.router.navigate(["/medical-exam/pages/db"]);
    return false;
  }

  toggleRA(){
    this.router.navigate(["/medical-exam/pages/ra"]);
    return false;
  }

  toggleCH(){
    this.router.navigate(["/medical-exam/pages/ch"]);
    return false;
  }
}
