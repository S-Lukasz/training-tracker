import { EventEmitter, Injectable } from '@angular/core';
import { Training } from '../../my-data';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  onTrainingSelect: EventEmitter<Training> = new EventEmitter<Training>();

  constructor() {}

  emitTrainingSelected(training: Training): void {
    this.onTrainingSelect.emit(training);
    console.log('emitTrainingSelected: ', training);
  }
}
