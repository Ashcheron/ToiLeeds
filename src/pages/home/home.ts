import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  yellow : String;
  green : String;
  red : String;
  vessat: {
    ID: number;
    name: String;
    status: number;
    
  }[];

  items = ["lol", "troll", "patrol"];
  constructor(public navCtrl: NavController) {

    this.yellow = "#ffd62a";
    this.green = "#2ec95c";
    this.red = "#ff2f2f";

    this.vessat = [
      { ID: 1, name: "toilet wing B", status: 40 },
      { ID: 2, name: "toilet wing A", status: 0 },
      { ID: 3, name: "toilet wing C", status: 10 },
      { ID: 4, name: "toilet wing D", status: 5 }
    ];
  }
}
