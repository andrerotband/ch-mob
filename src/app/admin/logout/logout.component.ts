
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-logout',
  template: `<p>Logging out... @if (isLoading) {<span class="spinner"></span>}</p>`,
  imports: []
})
export class LogoutComponent implements OnInit {
  isLoading = true;

  constructor (private auth: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.auth.signAppOut().then(() => {
      this.router.navigateByUrl('', { replaceUrl: true });
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  }
}
