import { Component, EventEmitter, Output } from '@angular/core';
import { PlaceModel } from '../models/place.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent {
  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onAdd: EventEmitter<PlaceModel> = new EventEmitter();

  public placeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    rate: new FormControl(7)
  });

  public cancel(): void {
    this.onCancel.emit();
  }

  public add(): void {
    const place: PlaceModel = this.placeForm.getRawValue();
    this.onAdd.emit(place);
  }
}
