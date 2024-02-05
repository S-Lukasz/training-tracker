import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AccountComponent } from './account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './avatar/avatar.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TrainingsComponent } from './trainings/trainings.component';
import { TrainingItemComponent } from './trainings/training-item/training-item.component';
import { ExercisesComponent } from './trainings/training-item/exercises/exercises.component';
import { ExerciseItemComponent } from './trainings/training-item/exercises/exercise-item/exercise-item.component';
import { TrainingViewComponent } from './training-view/training-view.component';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseViewComponent } from './exercise-view/exercise-view.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTrainingComponent } from './add-training/add-training.component';

const appRoutes: Routes = [
  { path: '', component: TrainingsComponent },
  { path: 'training-view', component: TrainingViewComponent },
  { path: 'exercise-view', component: ExerciseViewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AccountComponent,
    AvatarComponent,
    TrainingsComponent,
    TrainingItemComponent,
    ExercisesComponent,
    ExerciseItemComponent,
    TrainingViewComponent,
    ExerciseViewComponent,
    HeaderComponent,
    AddTrainingComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
