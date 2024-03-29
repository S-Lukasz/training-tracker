import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Tables } from '../../types/supabase';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.css',
})
export class TrainingsComponent implements OnInit {
  trainings: Tables<'trainings'>[] = [];
  showAddView: boolean = false;

  // faDumbbell = faDumbbell;

  constructor(
    private supabaseService: SupabaseService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.supabaseService.getTrainings().subscribe((trainings) => {
      this.trainings = trainings;
    });

    this.sharedService.onTrainingRemove.subscribe((id) => {
      this.onRemoveTraining(id);
    });

    this.sharedService.onTrainingAdd.subscribe((name) => {
      this.onAddTraining(name);
    });

    this.sharedService.onTrainingAddView.subscribe((isViewActive) => {
      this.showAddView = isViewActive;
    });
  }

  onAddViewShow() {
    this.sharedService.emitTrainingView();
  }

  onRemoveTraining(idToRemove: number) {
    this.supabaseService.removeTraining(idToRemove).subscribe(() => {
      this.trainings = this.trainings.filter(
        (training) => training.id !== idToRemove
      );
      this.router.navigate(['/']);
    });
  }

  onAddTraining(newTrainingName: string) {
    const trainingAddedData = this.supabaseService.addTraining(newTrainingName);
    if (trainingAddedData)
      trainingAddedData.subscribe((newTraining) => {
        if (newTraining) this.trainings.push(newTraining);
      });
  }
}
