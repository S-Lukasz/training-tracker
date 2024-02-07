import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

export interface SetToAdd {
  id?: number;
  reps: number;
  weight: number;
}

@Component({
  selector: 'app-set-dialog',
  templateUrl: './set-dialog.component.html',
  styleUrl: './set-dialog.component.css',
})
export class SetDialogComponent implements OnInit {
  faXmark = faXmark;

  editSet: boolean = false;
  isSelected: boolean = false;
  isDialogValid: boolean = true;
  showDialogElement: boolean = false;

  repsToEdit?: number;
  weightToEdit?: number;
  repsSelectValue?: number;
  weightSelectValue?: number;

  reps: number[] = Array.from({ length: 99 }, (_, i) => i + 1);
  weights: number[] = Array.from({ length: 500 }, (_, i) => i + 1);

  @Input() changingDialog?: Subject<SetToAdd | undefined>;
  @Input() editedSetIndex?: number;

  @Output() onDialogActiveView: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() onSetAdd: EventEmitter<SetToAdd> = new EventEmitter<SetToAdd>();

  ngOnInit() {
    this.changingDialog?.subscribe((set) => {
      this.editSet = set !== undefined;

      this.repsSelectValue = this.editSet ? set?.reps : this.reps?.at(0);
      this.weightSelectValue = this.editSet ? set?.weight : this.weights?.at(0);
      this.setDialogView();
    });
  }

  setRepsAndWeights() {
    this.repsSelectValue = this.editSet ? this.repsToEdit : this.reps?.at(0);
    this.weightSelectValue = this.editSet
      ? this.weightToEdit
      : this.weights?.at(0);

    console.log(
      'changeSetData: ',
      this.repsSelectValue + ' repsToEdit: ',
      this.repsToEdit + ' editSet: ',
      this.editSet
    );
  }

  setDialogView() {
    this.showDialogElement = !this.showDialogElement;
  }

  onExerciseAddEmit() {
    if (!this.repsSelectValue || !this.weightSelectValue) return;

    const setToAdd: SetToAdd = {
      reps: this.repsSelectValue,
      weight: this.weightSelectValue,
    };

    console.log('onExerciseAddEmit: ', setToAdd);

    this.onSetAdd.emit(setToAdd);
  }

  getEditedSetIndex(): number {
    if (this.editedSetIndex) return this.editedSetIndex + 1;
    else return 1;
  }
}
