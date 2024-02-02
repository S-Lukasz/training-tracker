import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Tables } from '../types/supabase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  exercises: Tables<'exercises'>[] = [];
  title = 'angular-user-management';

  session = this.supabase.session;

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));

    this.supabase.getExercises().subscribe((exercises) => {
      this.exercises = exercises;

      console.log('exercises: ', this.exercises);
    });

    // (async () => {
    //   this.exercises = (await this.supabase.getExercises()).data;
    // })();
  }
}
