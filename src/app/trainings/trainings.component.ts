import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Tables } from '../../types/supabase';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.css',
})
export class TrainingsComponent implements OnInit {
  trainings: Tables<'trainings'>[] = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.supabaseService.getTrainings().subscribe((trainings) => {
      this.trainings = trainings;
    });
  }
}
