import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected auth = inject(AuthService);

  // -------------------------Signed In User Information Variables-------------------------
  @Input() isUserSignedIn: boolean;
  userEmail: string;
  userName: string;
  userProfileImageURL: string;
  // -------------------------End Signed In User Information Variables-------------------------

  // --------------------------------------------------Extract Signed In User Information--------------------------------------------------
  ngOnInit(): void {
    [this.userEmail, this.userName, this.userProfileImageURL] =
      this.auth.retriveUserInformation();
    // console.log('Email:', this.userEmail);
    // console.log('Name:', this.userName);
    // console.log('ProfileImage:', this.userProfileImageURL);
  }

  // --------------------------------------------------End Extract Signed In User Information--------------------------------------------------

  // --------------------------------------------------Sign Out Modal--------------------------------------------------
  toggleModal() {
    if (typeof document !== 'undefined') {
      const modalContainer = document.getElementById('modal');
      modalContainer?.classList.toggle('hidden');
      modalContainer?.classList.toggle('flex');
    } else
      console.warn('Not running in the browser, Document is not available');
  }
  // --------------------------------------------------End Sign Out Modal--------------------------------------------------
}
