export class PlaceModel {
  name: string;
  description: string;
  rate: number;
  images?: string[];
  id?: string;
  position?: {
    lat: number;
    lng: number;
  }
}
