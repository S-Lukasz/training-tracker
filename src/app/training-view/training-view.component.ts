import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-training-view',
  templateUrl: './training-view.component.html',
  styleUrl: './training-view.component.css',
})
export class TrainingViewComponent implements OnInit {
  @Output() trainingId?: number;
  @Output() trainingData?: any;

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.trainingId = params['trainingId'];
    });

    if (this.trainingId)
      this.supabaseService
        .getTrainingData(this.trainingId)
        .subscribe((data) => (this.trainingData = data));
  }
}
