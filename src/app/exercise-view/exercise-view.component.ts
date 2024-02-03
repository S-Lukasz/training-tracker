import { Component, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-exercise-view',
  templateUrl: './exercise-view.component.html',
  styleUrl: './exercise-view.component.css',
})
export class ExerciseViewComponent {
  @Output() exerciseId?: number;
  @Output() exerciseData?: any;
  @Output() setsData?: any;

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
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
    });
  }
}
