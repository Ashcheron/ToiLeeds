import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment, GroundOverlay
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  mapReady: boolean = false;
  map: GoogleMap;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    console.log(this.map);

    /*this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords);
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });*/
  }
  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyA0R2Qv2t-UefOk9GzSt2uo3KCKKyt7-C8',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyA0R2Qv2t-UefOk9GzSt2uo3KCKKyt7-C8'
    });

    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = GoogleMaps.create('map_canvas', {
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

    const imageBounds = [{"lat": 53.818956, "lng": -1.584149},
    {"lat": 53.815026, "lng": -1.579083}];

    let groundOverlay = this.map.addGroundOverlay({
      'url': "../../assets/imgs/map.png",
      'bounds': imageBounds,
      'opacity': 0.5
    });



  }


}
