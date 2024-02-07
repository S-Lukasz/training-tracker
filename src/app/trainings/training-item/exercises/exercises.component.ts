import { Component, Input, OnInit } from '@angular/core';
import { SupabaseService } from '../../../supabase.service';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { ExerciseToAdd } from '../../../dialog-box/dialog-box.component';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
})
export class ExercisesComponent implements OnInit {
  @Input() exercises?: any[];
  @Input() trainingId?: number;

  showDialogElement: boolean = false;

  faAngleLeft = faAngleLeft;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {}

  onExerciseDialogEmit() {
    this.showDialogElement = !this.showDialogElement;
  }

  onExerciseRemoveSubmit(exerciseId: number) {
    this.supabaseService.removeExercise(exerciseId).subscribe(() => {
      this.exercises = this.exercises?.filter(
        (exercises) => exercises.id !== exerciseId
      );
    });
  }

  onExerciseAddSubmit(exerciseToAdd: ExerciseToAdd) {
    this.supabaseService
      .addExercise(
        exerciseToAdd?.muscleId,
        exerciseToAdd?.equipmentId,
        exerciseToAdd?.trainingId
      )
      .subscribe((newExercise) => {
        this.exercises?.push(newExercise);
        this.onExerciseDialogEmit();
      });
  }
}
