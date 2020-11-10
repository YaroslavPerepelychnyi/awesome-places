import { Injectable } from '@angular/core';
import { latLng, MapOptions, tileLayer } from 'leaflet';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitialMapService {
  private options: Subject<MapOptions> = new Subject<MapOptions>();

  constructor() {
    this.setInitialOptions();
  }

  public getInitialMapOptions(): Observable<MapOptions> {
    return this.options.asObservable();
  }

  private setInitialOptions(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.options.next({
        layers: [
          tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
        ],
        zoom: 10,
        center: latLng(position.coords.latitude, position.coords.longitude)
      })
    });
  }
}
