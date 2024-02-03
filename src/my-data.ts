export interface Training {
  id?: number;
  name: string;
  date: string;
  exercises: Exercise[];
}

export interface Exercise {
  id?: number;
  muscle: string;
  equipment: string;
  sets: Set[];
}

export interface Set {
  exerciseId?: number;
  reps: number;
}
