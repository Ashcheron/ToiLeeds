import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items = ["lol", "troll", "patrol"];
  constructor(public navCtrl: NavController) {

  }

}
