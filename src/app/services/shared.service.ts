import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  onTrainingAddView: EventEmitter<boolean> = new EventEmitter<boolean>();
  onTrainingAdd: EventEmitter<string> = new EventEmitter<string>();
  onTrainingRemove: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  isViewActive: boolean = false;

  emitTrainingView(): void {
    this.isViewActive = !this.isViewActive;
    this.onTrainingAddView.emit(this.isViewActive);
  }

  emitTrainingToRemove(id: number): void {
    this.onTrainingRemove.emit(id);
  }

  emitTrainingToAdd(name: string): void {
    this.onTrainingAdd.emit(name);
  }
}
