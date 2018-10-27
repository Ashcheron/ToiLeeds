import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Geolocation } from "@ionic-native/geolocation";
import { Events } from "ionic-angular";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  GroundOverlay
} from "@ionic-native/google-maps";

interface Vessa {
  id: number;
  count: number;
  name: String;
  gps: String;
  timestamp: String;
  type: number;
}

@Component({
  selector: "page-about",
  templateUrl: "about.html"
})
export class AboutPage {
  mapReady: boolean = false;
  map: GoogleMap;
  public toilets = [];
  public stands = [];

  public locations = [
    { name: "Fanzone ", type: "Beer", lat: 53.817250, lng: -1.583240 },
    { name: "Fanzone", type: "Beer", lat: 53.817220, lng: -1.583226 },
    { name: "Fanzone", type: "Toilet", lat: 53.817225, lng: -1.583224 },
    { name: "Enclosure", type: "Beer", lat: 53.818077, lng: -1.583143 },
    { name: "Enclosure", type: "Toilet", lat: 53.818057, lng: -1.583173 },
    { name: "Live-Beer", type: "", lat: 53.818118, lng: -1.581082 }
  ];

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private http: HttpClient,
    public events: Events
  ) {
    events.subscribe("user:created", LatLng => {
      console.log(LatLng);
    });
  }
  ionViewDidLoad() {
    this.getData().then(this.loadMap());
  }

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyA0R2Qv2t-UefOk9GzSt2uo3KCKKyt7-C8",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyA0R2Qv2t-UefOk9GzSt2uo3KCKKyt7-C8"
    });

    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = GoogleMaps.create("map_canvas", {
      camera: {
        target: {
          lat: 53.817531,
          lng: -1.5819319
        },
        zoom: 17.22
      }
    });

    // Wait the maps plugin is ready until the MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
    });

    const imageBounds = [
      { lat: 53.818956, lng: -1.584891 },
      { lat: 53.814849, lng: -1.578593 }
    ];

    let groundOverlay = this.map.addGroundOverlay({
      url: "../../assets/imgs/map.png",
      bounds: imageBounds,
      opacity: 1
    });

    this.drawMarkers();
    
    let circle = this.map.addCircleSync({
      'center': { 'lat': 53.818488, 'lng': -1.582416 },
      'radius': 5,
      'strokeColor' : '#880000',
      'strokeWidth': 5,
      'fillColor' : '#880000',
      'clickable' : true   // default = false
    });
  }

  drawMarkers() {
    this.locations.map(item => {
      var LatLng = {
        lat: item.lat,
        lng: item.lng
      };
      var marker = this.map.addMarker({
        position: LatLng,

        title: item.name + " " + item.type
      });
    });
  }

  getData(): any {
    this.getToilets().subscribe(data => (this.toilets = data));

    this.getStands().subscribe(data => (this.stands = data));

    return 0;
  }
  getToilets(): Observable<Vessa[]> {
    var temp = this.http.get<Vessa[]>("http://10.8.0.4:3000/toilet");

    return temp;
  }

  getStands(): Observable<Vessa[]> {
    return this.http.get<Vessa[]>("http://10.8.0.4:3000/beer");
  }
}
