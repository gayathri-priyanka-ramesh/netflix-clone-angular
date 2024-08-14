import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService);

  // Signed In User Information Variables
  userEmail: string;
  userName: string;
  userProfileImageURL: string;

  // -------------------------Extract Signed In User Information-------------------------
  ngOnInit(): void {
    [this.userEmail, this.userName, this.userProfileImageURL] =
      this.auth.retriveUserInformation();
    console.log('Email:', this.userEmail);
    console.log('Name:', this.userName);
    console.log('ProfileImage:', this.userProfileImageURL);
  }
  // -------------------------End of Extract Signed In User Information-------------------------
}
