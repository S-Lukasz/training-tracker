import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  QueryData,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { Database, Tables } from '../types/supabase';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient<Database>;
  _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    //@ts-ignore
    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  getTrainingData(trainingId: number) {
    const request = this.supabase
      .from('trainings')
      .select(
        `name, 
        date, 
        exercises(
          id, 
          muscle_id, 
          equipment_id, 
          muscles(name), 
          equipments(name)
        )`
      )
      .eq('id', trainingId)
      .limit(1)
      .single();

    type TrainingData = QueryData<typeof request>;

    const response = new Observable<TrainingData>((observer) => {
      request.then(({ data }) => observer.next(data as any));
    });

    return response;
  }

  getExerciseData(exerciseId: number) {
    const request = this.supabase
      .from('exercises')
      .select(
        `id, 
        muscle_id, 
        equipment_id, 
        training_id,
        muscles(name), 
        equipments(name)`
      )
      .eq('id', exerciseId)
      .limit(1)
      .single();

    type ExerciseData = QueryData<typeof request>;

    const response = new Observable<ExerciseData>((observer) => {
      request.then(({ data }) => observer.next(data as any));
    });

    return response;
  }

  getExerciseSets(exerciseId: number) {
    const request = this.supabase
      .from('sets')
      .select(`id, reps, weight`)
      .eq('exercise_id', exerciseId);

    type ExerciseSetsData = QueryData<typeof request>;

    const response = new Observable<ExerciseSetsData>((observer) => {
      request.then(({ data }) => observer.next(data as any));
    });

    return response;
  }

  getMuscles() {
    const request = this.supabase.from('muscles').select(`id, name`);

    type ExerciseSetsData = QueryData<typeof request>;

    const response = new Observable<ExerciseSetsData>((observer) => {
      request.then(({ data }) => observer.next(data as any));
    });

    return response;
  }

  getEquipments() {
    const request = this.supabase.from('equipments').select(`id, name`);

    type ExerciseSetsData = QueryData<typeof request>;

    const response = new Observable<ExerciseSetsData>((observer) => {
      request.then(({ data }) => observer.next(data as any));
    });

    return response;
  }

  getTrainings() {
    const response = new Observable<Tables<'trainings'>[]>((observer) => {
      this.supabase
        .from('trainings')
        .select()
        .then(({ data }) => observer.next(data as any));
    });

    return response;
  }

  addTraining(name: string): Observable<Tables<'trainings'>> {
    const request = this.supabase
      .from('trainings')
      .insert([
        {
          name: name,
          date: new Date().toDateString(),
        },
      ])
      .select()
      .limit(1)
      .single();

    const response = new Observable<Tables<'trainings'>>((observer) => {
      request.then(({ data }) => observer.next(data as any));
    });

    return response;
  }

  removeTraining(id: number): Observable<Tables<'trainings'>> {
    const request = this.supabase.from('trainings').delete().eq('id', id);

    const response = new Observable<Tables<'trainings'>>((observer) => {
      request.then(({ data }) => observer.next(data as any));
    });

    return response;
  }

  removeSet(id: number): Observable<Tables<'sets'>> {
    console.log('removeSet: ', id);
    const request = this.supabase.from('sets').delete().eq('id', id);

    const response = new Observable<Tables<'sets'>>((observer) => {
      request.then(({ data }) => observer.next(data as any));
    });

    return response;
  }

  addExercise(muscleId?: number, equipmentId?: number, trainingId?: number) {
    const request = this.supabase
      .from('exercises')
      .insert({
        muscle_id: muscleId,
        equipment_id: equipmentId,
        training_id: trainingId,
      })
      .select(
        `id, 
        muscle_id, 
        equipment_id, 
        training_id,
        muscles(name), 
        equipments(name)`
      )
      .limit(1)
      .single();

    type ExerciseData = QueryData<typeof request>;

    const response = new Observable<ExerciseData>((observer) => {
      request.then(({ data }) => observer.next(data as any));
    });

    return response;
  }

  addSet(reps: number, weight: number, exerciseId: number) {
    const request = this.supabase
      .from('sets')
      .insert({
        reps: reps,
        weight: weight,
        exercise_id: exerciseId,
      })
      .select(
        `reps, 
        weight, 
        exercise_id
        `
      )
      .limit(1)
      .single();

    type SetsData = QueryData<typeof request>;

    const response = new Observable<SetsData>((observer) => {
      request.then(({ data }) => observer.next(data as any));
    });

    return response;
  }

  removeExercise(id: number): Observable<Tables<'exercises'>> {
    const request = this.supabase.from('exercises').delete().eq('id', id);

    const response = new Observable<Tables<'exercises'>>((observer) => {
      request.then(({ data }) => observer.next(data as any));
    });

    return response;
  }
}
