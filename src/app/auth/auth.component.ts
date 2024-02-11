import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { AuthResponse } from '@supabase/supabase-js';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loading = false;

  signUpForm!: FormGroup;
  signUpResponse?: AuthResponse;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder
  ) {
    this.signUpForm = this.formBuilder.group({
      email: formBuilder.control('', [Validators.required, Validators.email]),
      password: formBuilder.control('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  async onSignUp() {
    this.supabase
      .signUp(this.signUpForm.value.email, this.signUpForm.value.password)
      .then((res) => (this.signUpResponse = res))
      .catch((err) => console.log(err));
  }
}
