import { Component, Input, OnInit, Output } from '@angular/core';
import { SupabaseService } from '../../../../supabase.service';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrl: './exercise-item.component.css',
})
export class ExerciseItemComponent implements OnInit {
  @Input() index!: number;
  @Input() exercise?: any;
  @Input() trainingId?: number;
  @Output() exerciseSets!: any[];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    if (this.exercise?.id) {
      this.supabaseService
        .getExerciseSets(this.exercise?.id)
        .subscribe((sets) => (this.exerciseSets = sets));
    }
  }
}
