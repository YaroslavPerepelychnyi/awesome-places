import { Component } from '@angular/core';
import { LatLng, latLng, LeafletMouseEvent, Map, MapOptions, Marker, marker, tileLayer } from 'leaflet';
import { InitialMapService } from './core/map/initial-map.service';
import { PlaceModel } from './models/place.model';
import { PlacesDataService } from './core/map/places-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'awesome-places';

  private map: Map;
  private markerToCreate: Marker;
  public options: MapOptions;
  public markers = [];
  public isAddMode: boolean = false;

  constructor(
    private initialMapService: InitialMapService,
    private placesDataService: PlacesDataService
  ) {
    this.initialMapService.getInitialMapOptions().subscribe((options: MapOptions) => {
      this.options = options;
    })
  }

  public createMarker(event: LeafletMouseEvent) {
    if (!this.isAddMode) {
      this.markerToCreate = marker([event.latlng.lat, event.latlng.lng]);
      this.markers.push(this.markerToCreate);
    }
  }

  public onMapReady(event: Map) {
    this.map = event;
  }

  public addMode() {
    this.isAddMode = true;
    const userCenter = this.map.getCenter();
    this.markerToCreate = marker([userCenter.lat, userCenter.lng], { draggable: true });
    this.markers.push(this.markerToCreate);
  }

  public cancelAddPlace(): void {
    this.isAddMode = false;
  }

  public addPlace(place: PlaceModel): void {
    const placePosition: LatLng = this.markerToCreate.getLatLng();
    this.markerToCreate.remove();
    place.position = {
      lat: placePosition.lat,
      lng: placePosition.lng,
    };

    this.placesDataService.addPlace(place).subscribe((places: PlaceModel[]) => {
      this.markers = this.convertPlacesToMarker(places);
      this.isAddMode = false;
    })
  }

  private convertPlacesToMarker(places: PlaceModel[]): Marker[] {
    const markers: Marker[] = [];
    places.forEach((place: PlaceModel) => {
      const placeMarker: Marker = marker([place.position.lat, place.position.lng]);
      markers.push(placeMarker);
    });
    return markers;
  }
}
