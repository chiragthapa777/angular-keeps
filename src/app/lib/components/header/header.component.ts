import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthenticatedUser } from '../../model/AuthenticatedUser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: AuthenticatedUser | null = null;
  subs: Subscription[] = [];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subs.push(
      this.authService.authUserSubject.subscribe((data) => {
        this.user = data;
      })
    );
  }
  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.forEach((sub: Subscription) => {
        sub.unsubscribe();
      });
    }
  }
}
