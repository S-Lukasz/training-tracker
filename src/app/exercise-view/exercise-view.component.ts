import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import {
  faAngleLeft,
  faAngleRight,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { SetToAdd } from '../set-dialog/set-dialog.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-exercise-view',
  templateUrl: './exercise-view.component.html',
  styleUrl: './exercise-view.component.css',
})
export class ExerciseViewComponent {
  index: number = 0;
  exerciseId?: number;
  exerciseData?: any;
  trainingData?: any;
  setsData?: any[];

  faTrash = faTrash;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  changingDialogActive: Subject<SetToAdd | undefined> = new Subject();

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.index = Number(params['exerciseIndex']);
      this.exerciseId = params['exerciseId'];
      if (this.exerciseId) this.setExerciseData(this.exerciseId);
    });
  }

  setExerciseData(exerciseId: number): void {
    this.supabaseService.getExerciseSets(exerciseId).subscribe((data) => {
      this.setsData = data;
    });

    this.supabaseService.getExerciseData(exerciseId).subscribe((data) => {
      this.exerciseData = data;
      this.supabaseService
        .getTrainingData(this.exerciseData?.training_id)
        .subscribe((data) => {
          this.trainingData = data;
        });
    });
  }

  onEditSetSelect(setIndex: number) {
    const setToAdd: SetToAdd = {
      id: setIndex,
      reps: this.setsData?.at(setIndex)?.reps,
      weight: this.setsData?.at(setIndex)?.weight,
    };

    this.changingDialogActive.next(setToAdd);
  }

  onSetDialogView() {
    this.changingDialogActive.next(undefined);
  }

  onSetAdd(setToAdd: SetToAdd) {
    if (this.exerciseId)
      this.supabaseService
        .addSet(setToAdd?.reps, setToAdd?.weight, this.exerciseId)
        .subscribe((newSet) => {
          this.setsData?.push(newSet);
          this.onSetDialogView();
        });
  }

  onSetRemoveClick(setIndex: number) {
    this.supabaseService
      .removeSet(this.setsData?.at(setIndex)?.id)
      .subscribe((removedSet) => {
        this.setsData = this.setsData?.filter(
          (set) => set.id !== removedSet.id
        );
        console.log('onSetRemoveClick:', removedSet.id);
      });
  }
}
