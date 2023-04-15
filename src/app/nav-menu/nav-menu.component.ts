import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private destroySubject = new Subject();

  constructor(private authService: AuthService,  private router: Router) {
    this.authService.authStatus
    .pipe(takeUntil(this.destroySubject))
    .subscribe(result => {
      this.isLoggedIn = result;
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

}
