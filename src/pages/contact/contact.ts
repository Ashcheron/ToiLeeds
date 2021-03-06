import { Component, OnInit } from "@angular/core";
import {Injectable} from '@angular/core'
import { NavController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { HttpClient} from "@angular/common/http";
import * as _ from "lodash";
import "rxjs/Rx";

interface Kalja {
  id: number;
  count: number;
  name: String;
  gps: String;
  timestamp: String;
  type: number;
}

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit{
  yellow: String;
  green: String;
  red: String;

  public stands = []; 

  private _url = "http://10.8.0.4:3000/beer";

  constructor(public navCtrl: NavController, private http: HttpClient) {
    this.yellow = "#ffd62a";
    this.green = "#2ec95c";
    this.red = "#ff2f2f";

    this.getData();

    console.log(this.stands)
  }

  ngOnInit() {
    this.getData()
    .subscribe(data => this.stands = data);
  }

  getData(): Observable<Kalja[]> {
    return this.http.get<Kalja[]>("http://10.8.0.4:3000/beer");
    
    //console.log(test)
      //this.test$.subscribe(elt => console.log(elt));
  }
}

