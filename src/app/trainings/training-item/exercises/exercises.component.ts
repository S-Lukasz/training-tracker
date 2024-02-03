import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
})
export class ExercisesComponent {
  @Input() trainingId?: number;
  @Input() exercises?: any[];
}
