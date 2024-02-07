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

  muscles: any[] = [];
  equipments: any[] = [];

  muscleSelectValue?: number;
  equipmentSelectValue?: number;

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

    this.supabaseService.getMuscles().subscribe((muscles) => {
      this.muscles = muscles;
    });

    this.supabaseService.getEquipments().subscribe((equipments) => {
      this.equipments = equipments;
    });
  }

  setExerciseData(exerciseId: number): void {
    this.supabaseService.getExerciseSets(exerciseId).subscribe((data) => {
      this.setsData = data;
    });

    this.supabaseService.getExerciseData(exerciseId).subscribe((data) => {
      this.dataSetup(data);
      this.supabaseService
        .getTrainingData(this.exerciseData?.training_id)
        .subscribe((data) => {
          this.trainingData = data;
        });
    });
  }

  dataSetup(data: any) {
    this.exerciseData = data;
    this.muscleSelectValue = this.exerciseData?.muscles?.id;
    this.equipmentSelectValue = this.exerciseData?.equipments?.id;
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

  onSetEdit(setToEdit: SetToAdd) {
    if (setToEdit.id && this.exerciseId) {
      this.supabaseService
        .editSet(
          this.setsData?.at(setToEdit?.id)?.id,
          setToEdit?.reps,
          setToEdit?.weight
        )
        .subscribe((editedSet) => {
          if (setToEdit.id && this.setsData) {
            this.setsData[setToEdit?.id] = editedSet;
          }
          this.onSetDialogView();
        });
    }
  }

  onSetRemoveClick(setId: number) {
    this.supabaseService.removeSet(setId).subscribe(() => {
      this.setsData = this.setsData?.filter((set) => set.id !== setId);
    });
  }

  onMuscleEdit() {
    if (this.muscleSelectValue) {
      if (this.exerciseId) {
        this.supabaseService
          .editExerciseMuscle(this.exerciseId, this.muscleSelectValue)
          .subscribe((exercise) => {
            this.dataSetup(exercise);
          });
      }
    }
  }

  onEquipmentEdit() {
    if (this.equipmentSelectValue) {
      if (this.exerciseId) {
        this.supabaseService
          .editExerciseEquipment(this.exerciseId, this.equipmentSelectValue)
          .subscribe((exercise) => {
            this.dataSetup(exercise);
          });
      }
    }
  }
}
