import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { SupabaseService } from '../supabase.service';
import { ActivatedRoute } from '@angular/router';

export interface ExerciseToAdd {
  muscleId: number;
  equipmentId: number;
  trainingId: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css',
})
export class DialogBoxComponent implements OnInit {
  trainingId?: number;

  faXmark = faXmark;
  isSelected: boolean = false;
  isDialogValid: boolean = true;

  muscleSelectValue?: number;
  equipmentSelectValue?: number;

  muscles: any[] = [];
  equipments: any[] = [];

  @Input() showDialogElement: boolean = false;

  @Output() onDialogActiveView: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() onExerciseAdd: EventEmitter<ExerciseToAdd> =
    new EventEmitter<ExerciseToAdd>();

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.trainingId = params['trainingId'];
    });

    this.supabaseService.getMuscles().subscribe((muscles) => {
      this.muscles = muscles;
      this.muscleSelectValue = muscles?.at(0)?.id;
    });

    this.supabaseService.getEquipments().subscribe((equipments) => {
      this.equipments = equipments;
      this.equipmentSelectValue = equipments?.at(0)?.id;
    });
  }

  setDialogView() {
    this.showDialogElement = !this.showDialogElement;
  }

  onExerciseAddEmit() {
    if (
      !this.muscleSelectValue ||
      !this.equipmentSelectValue ||
      !this.trainingId
    )
      return;

    const exerciseToAdd: ExerciseToAdd = {
      muscleId: this.muscleSelectValue,
      equipmentId: this.equipmentSelectValue,
      trainingId: this.trainingId,
    };

    this.onExerciseAdd.emit(exerciseToAdd);
  }
}
