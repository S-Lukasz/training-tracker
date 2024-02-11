import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading = false;

  signInForm!: FormGroup;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder
  ) {
    this.signInForm = this.formBuilder.group({
      email: formBuilder.control('', [Validators.required, Validators.email]),
      password: formBuilder.control('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  async onSignIn() {
    this.supabase
      .signIn(this.signInForm.value.email, this.signInForm.value.password)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}
