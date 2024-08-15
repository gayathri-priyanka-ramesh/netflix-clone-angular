import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SectionComponent } from '../../shared/components/section/section.component';
import { AccordianComponent } from '../../shared/components/accordian/accordian.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, SectionComponent, AccordianComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    protected auth: AuthService
  ) {}

  // -------------------------Initialize Google Sign In only in Browser Platform-------------------------
  ngOnInit(): void {
    console.log('Platform Id:', this.platformId);
    if (isPlatformBrowser(this.platformId)) {
      this.auth.getGSIScript();
    } else {
      console.warn(
        'Not running in the browser, Google Sign-In will not be initialized'
      );
    }
  }
  // -------------------------End Initialize Google Sign In only in Browser Platform-------------------------
}
