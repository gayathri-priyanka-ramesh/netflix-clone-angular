// Google Sign In Object
declare var google: any;

import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { GsiResponse } from '../interfaces/gsi-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Signed In User Information
  userInformation: User;

  constructor(private ngZone: NgZone, private router: Router) {}

  // --------------------------------------------------Google Sign In--------------------------------------------------
  // -------------------------Decode Signed In User Payload-------------------------
  private decodeToken(token: string) {
    const JWT_Token = token.split('.');
    console.log('JWT_Token:', JWT_Token);
    const decodedTokenPayload = JSON.parse(atob(JWT_Token[1]));
    return decodedTokenPayload;
  }

  // -------------------------Handle Signed In User Credential-------------------------
  handleCredential(responseCredential: string) {
    console.log('Response Credential Token:', responseCredential);
    const payload = this.decodeToken(responseCredential);
    console.log('Payload:', payload);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('signedInUser', JSON.stringify(payload));
      this.ngZone.run(() => this.router.navigate(['browse']));
    } else
      console.warn(
        'Not running in the browser, Session Storage is not available'
      );
  }
  // -------------------------Handle Signed In User Response-------------------------
  handleResponse = (res: GsiResponse) => {
    console.log('Sign In Response:', res);
    if (res && res.credential) {
      const responseToken = res.credential;
      this.handleCredential(responseToken);
    }
  };

  // -------------------------Client Instance Configuration-------------------------
  IdConfiguration = {
    client_id:
      '557734782030-m3gg8h5a56ggs9nqvotckfils62lfb5u.apps.googleusercontent.com',
    callback: this.handleResponse,
  };

  // -------------------------Google Sign In Button Configuration-------------------------
  GsiButtonConfiguration = {
    type: 'icon',
    theme: 'filled_black',
    size: 'large',
    shape: 'circle',
  };

  // -------------------------Initialize Google Sign In-------------------------
  initializeGoogleSignIn(): void {
    console.log('Google Sign In Object', google);
    google.accounts.id.initialize(this.IdConfiguration);
    google.accounts.id.renderButton(
      document.getElementById('gsiButton'),
      this.GsiButtonConfiguration
    );
    console.log('Google Sign-In initialized');
  }

  // -------------------------Get GSI Script to Initialize Google Sign In-------------------------
  getGSIScript() {
    const script = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );
    if (script) {
      console.log('GSI Script:', script);
      this.initializeGoogleSignIn();
    } else {
      const checkGoogleObject = setInterval(() => {
        if (typeof google !== 'undefined') {
          clearInterval(checkGoogleObject);
          this.initializeGoogleSignIn();
        } else {
          console.warn('Waiting for GSI Script to Load...');
        }
      }, 100);
    }
  }

  // -------------------------Trigger Google Sign In Flow-------------------------
  triggerGSI(): void {
    console.log('Google Sign In Object', google);
    google.accounts.id.prompt();
    console.log('Google Sign-In Triggered');
  }
  // --------------------------------------------------End Google Sign In--------------------------------------------------

  // --------------------------------------------------Signed In User Information Retrieval--------------------------------------------------
  retriveUserInformation(): string[] {
    if (typeof sessionStorage !== 'undefined') {
      this.userInformation = JSON.parse(
        sessionStorage.getItem('signedInUser') || '{}'
      );
      console.log('userInformation:', this.userInformation);
    }
    console.warn(
      'Not running in the browser, Session Storage is not available'
    );
    return [
      this.userInformation?.email || 'Email Not Available',
      this.userInformation?.name || 'Name Not Available',
      this.userInformation?.picture || 'ProfileImageURL Not Available',
    ];
  }
  // --------------------------------------------------End Signed In User Information Retrieval--------------------------------------------------

  // --------------------------------------------------Sign Out--------------------------------------------------
  signOut() {
    if (typeof sessionStorage !== 'undefined') {
      google.accounts.id.disableAutoSelect();
      sessionStorage.removeItem('signedInUser');
      this.ngZone.run(() => this.router.navigate(['/']));
      console.log('User Signed Out');
    } else
      console.warn(
        'Not running in the browser, Session Storage is not available'
      );
  }
  // --------------------------------------------------End Sign Out--------------------------------------------------
}
