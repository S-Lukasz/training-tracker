import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SupabaseService } from '../../../../supabase.service';
import { faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrl: './exercise-item.component.css',
})
export class ExerciseItemComponent implements OnInit {
  exerciseSets?: any[];

  @Input() index!: number;
  @Input() exercise?: any;

  @Output() onExerciseRemove: EventEmitter<number> = new EventEmitter<number>();

  faTrash = faTrash;
  faChevronRight = faChevronRight;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    if (this.exercise?.id) {
      this.supabaseService
        .getExerciseSets(this.exercise?.id)
        .subscribe((sets) => (this.exerciseSets = sets));
    }
  }

  onExerciseRemoveClick() {
    this.onExerciseRemove.emit(this.exercise?.id);
  }
}
