import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-training-view',
  templateUrl: './training-view.component.html',
  styleUrl: './training-view.component.css',
})
export class TrainingViewComponent implements OnInit {
  @Output() trainingId?: number;
  @Output() trainingData?: any;

  faTrash = faTrash;
  faPenToSquare = faPenToSquare;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.trainingId = params['trainingId'];
    });

    if (this.trainingId)
      this.supabaseService
        .getTrainingData(this.trainingId)
        .subscribe((data) => (this.trainingData = data));
  }

  onRemoveClick() {
    if (this.trainingId !== undefined)
      this.sharedService.emitTrainingToRemove(this.trainingId);
  }
}
