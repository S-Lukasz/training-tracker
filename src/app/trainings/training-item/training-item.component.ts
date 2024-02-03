import { Component, Input, Output, input } from '@angular/core';
import { Tables } from '../../../types/supabase';
import { SupabaseService } from '../../supabase.service';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-training-item',
  templateUrl: './training-item.component.html',
  styleUrl: './training-item.component.css',
})
export class TrainingItemComponent {
  @Input() training?: Tables<'trainings'>;
  @Input() trainingData?: any;

  faAngleRight = faAngleRight;

  constructor(private supabaseService: SupabaseService) {}

  onTrainingSelect() {}

  ngOnInit(): void {
    if (this.training?.id) {
      this.supabaseService
        .getTrainingData(this.training?.id)
        .subscribe((data) => (this.trainingData = data));
    }
  }
}
