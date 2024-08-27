import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ScrollService } from '../../services/scroll.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private scroll = inject(ScrollService);

  // -------------------------Signed In User Information Variables-------------------------
  isUserSignedIn: boolean = false;
  userEmail: string = 'Email Not Available';
  userName: string = 'Name Not Available';
  userProfileImageURL: string = '../../../../assets/user.jpg';
  private userInfoSubscription: Subscription;
  // -------------------------End Signed In User Information Variables-------------------------

  // -------------------------Active Category-------------------------
  activeCategory: string = 'trending';

  // --------------------------------------------------Extract Signed In User Information--------------------------------------------------
  ngOnInit(): void {
    [
      this.isUserSignedIn,
      this.userEmail,
      this.userName,
      this.userProfileImageURL,
    ] = this.auth.retriveUserInformation();
    this.userInfoSubscription = this.auth.userSignedIn$.subscribe(
      (isSignedIn: boolean) => {
        this.isUserSignedIn = isSignedIn;
        if (isSignedIn)
          [
            this.isUserSignedIn,
            this.userEmail,
            this.userName,
            this.userProfileImageURL,
          ] = this.auth.retriveUserInformation();
        // console.log('isUserSignedIn:', this.isUserSignedIn);
        // console.log('Email:', this.userEmail);
        // console.log('Name:', this.userName);
        // console.log('ProfileImage:', this.userProfileImageURL);
      }
    );
  }
  // --------------------------------------------------End Extract Signed In User Information--------------------------------------------------

  // --------------------------------------------------Unsubscribe User Info--------------------------------------------------
  ngOnDestroy(): void {
    // if (this.userInfoSubscription) this.userInfoSubscription.unsubscribe();
  }
  // --------------------------------------------------End Unsubscribe User Info--------------------------------------------------

  // --------------------------------------------------Sign Out Modal--------------------------------------------------
  signOut() {
    this.toggleModal();
    this.auth.signOut();
  }

  toggleModal() {
    if (typeof document !== 'undefined') {
      const modalContainer = document.getElementById('modal');
      modalContainer?.classList.toggle('hidden');
      modalContainer?.classList.toggle('flex');
    } else
      console.warn('Not running in the browser, Document is not available');
  }
  // --------------------------------------------------End Sign Out Modal--------------------------------------------------

  // --------------------------------------------------Toggle Category Menu--------------------------------------------------
  toggleMenu() {
    if (typeof document !== 'undefined') {
      const menuContainer = document.getElementById('menu');
      menuContainer?.classList.toggle('hidden');
      const menuIcon = document.getElementById('menuIcon');
      menuIcon?.classList.toggle('bx-menu-alt-right');
      menuIcon?.classList.toggle('bx-x');
    } else
      console.warn('Not running in the browser, Document is not available');
  }
  // --------------------------------------------------End Toggle Category Menu--------------------------------------------------

  // --------------------------------------------------Toggle Profile Information--------------------------------------------------
  toggleProfileInfo() {
    if (typeof document !== 'undefined') {
      const profileInfoContainer = document.getElementById('profileInfo');
      profileInfoContainer?.classList.toggle('hidden');
    } else
      console.warn('Not running in the browser, Document is not available');
  }
  // --------------------------------------------------End Toggle Profile Information--------------------------------------------------

  // --------------------------------------------------Scroll to Active Category--------------------------------------------------
  scrollToCategory(category: string): void {
    this.toggleMenu();
    this.scroll.scrollToSection(category);
    this.activeCategory = category;
    console.log('Active Category:', this.activeCategory);
  }
  // --------------------------------------------------End Scroll to Active Category--------------------------------------------------
}
