import { Component, Input } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() title?: string;

  faRightFromBracket = faRightFromBracket;
  faUser = faUser;

  session = this.supabase.session;

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }

  async onUserLogout() {
    await this.supabase.signOut();
  }
}
