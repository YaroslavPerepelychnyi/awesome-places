import { Injectable } from '@angular/core';
import { PlaceModel } from '../../models/place.model';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesDataService {
  private places: PlaceModel[] = [];

  public addPlace(place: PlaceModel): Observable<PlaceModel[]> {
    place.id = new Date().toTimeString();
    this.places.push(place);
    return of(this.places);
  }
}
