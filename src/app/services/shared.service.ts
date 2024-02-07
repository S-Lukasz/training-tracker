import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  onTrainingAdd: EventEmitter<string> = new EventEmitter<string>();
  onTrainingRemove: EventEmitter<number> = new EventEmitter<number>();
  onTrainingAddView: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  currentTrainingId?: number;
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
