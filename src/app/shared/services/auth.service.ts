// Google Sign In Object
declare var google: any;

import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { GsiResponse } from '../interfaces/gsiResponse.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // -------------------------Signed In User Information-------------------------
  private userSignedIn = new BehaviorSubject<boolean>(false);
  userSignedIn$ = this.userSignedIn.asObservable();
  isUserSignedIn: boolean = false;
  userInformation: User;
  // -------------------------End Signed In User Information-------------------------

  constructor(private ngZone: NgZone, private router: Router) {}

  // --------------------------------------------------Google Sign In--------------------------------------------------
  // -------------------------Decode Signed In User Payload-------------------------
  private decodeToken(token: string) {
    const JWT_Token = token.split('.');
    // console.log('JWT_Token:', JWT_Token);
    const decodedTokenPayload = JSON.parse(atob(JWT_Token[1]));
    return decodedTokenPayload;
  }
  // -------------------------End Decode Signed In User Payload-------------------------

  // -------------------------Handle Signed In User Credential-------------------------
  handleCredential(responseCredential: string) {
    // console.log('Response Credential Token:', responseCredential);
    const payload = this.decodeToken(responseCredential);
    // console.log('Payload:', payload);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('signedInUser', JSON.stringify(payload));
      this.userSignedIn.next(true);
      this.handleGSIButtonVisibility(false);
      this.ngZone.run(() => this.router.navigate(['browse']));
    } else
      console.warn(
        'Not running in the browser, Session Storage is not available'
      );
  }
  // -------------------------End Handle Signed In User Credential-------------------------

  // -------------------------Handle Signed In User Response-------------------------
  handleResponse = (res: GsiResponse) => {
    // console.log('Sign In Response:', res);
    if (res && res.credential) {
      const responseToken = res.credential;
      this.handleCredential(responseToken);
    }
  };
  // -------------------------End Handle Signed In User Response-------------------------

  // -------------------------Client Instance Configuration-------------------------
  IdConfiguration = {
    client_id:
      '557734782030-m3gg8h5a56ggs9nqvotckfils62lfb5u.apps.googleusercontent.com',
    callback: this.handleResponse,
  };
  // -------------------------End Client Instance Configuration-------------------------

  // -------------------------Google Sign In Button Configuration-------------------------
  GsiButtonConfiguration = {
    type: 'icon',
    theme: 'filled_black',
    size: 'large',
    shape: 'circle',
  };
  // -------------------------End Google Sign In Button Configuration-------------------------

  // -------------------------Initialize Google Sign In-------------------------
  initializeGoogleSignIn(): void {
    // console.log('Google Sign In Object', google);
    google.accounts.id.initialize(this.IdConfiguration);
    google.accounts.id.renderButton(
      document.getElementById('gsiButton'),
      this.GsiButtonConfiguration
    );
    // console.log('Google Sign-In initialized');
  }
  // -------------------------End Initialize Google Sign In-------------------------

  // -------------------------Get GSI Script to Initialize Google Sign In-------------------------
  getGSIScript() {
    const script = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );
    if (script) {
      // console.log('GSI Script:', script);
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
      6665;
    }
  }
  // -------------------------End Get GSI Script to Initialize Google Sign In-------------------------

  // -------------------------Trigger Google Sign In Flow-------------------------
  triggerGSI(): void {
    // console.log('Google Sign In Object', google);
    google.accounts.id.prompt();
    // console.log('Google Sign-In Triggered');
  }
  // -------------------------End Trigger Google Sign In Flow-------------------------
  // --------------------------------------------------End Google Sign In--------------------------------------------------

  // --------------------------------------------------Signed In User Information Retrieval--------------------------------------------------
  retriveUserInformation(): [boolean, string, string, string] {
    if (typeof sessionStorage !== 'undefined') {
      this.isUserSignedIn = sessionStorage.getItem('signedInUser') !== null;
      if (this.userSignedIn.value !== this.isUserSignedIn)
        this.userSignedIn.next(this.isUserSignedIn);
      // console.log('isUserSignedIn:', this.isUserSignedIn);
      this.userInformation = JSON.parse(
        sessionStorage.getItem('signedInUser') || '{}'
      );
      // console.log('userInformation:', this.userInformation);
    } else
      console.warn(
        'Not running in the browser, Session Storage is not available'
      );
    return [
      this.isUserSignedIn,
      this.userInformation?.email || 'Email Not Available',
      this.userInformation?.name || 'Name Not Available',
      this.userInformation?.picture || '../../../../assets/user.jpg',
    ];
  }
  // --------------------------------------------------End Signed In User Information Retrieval--------------------------------------------------

  // --------------------------------------------------Sign Out--------------------------------------------------
  signOut() {
    if (typeof sessionStorage !== 'undefined') {
      google.accounts.id.disableAutoSelect();
      sessionStorage.removeItem('signedInUser');
      this.userSignedIn.next(false);
      this.ngZone.run(() => this.router.navigate(['/']));
      this.handleGSIButtonVisibility(true);
      // console.log('User Signed Out');
    } else
      console.warn(
        'Not running in the browser, Session Storage is not available'
      );
  }
  // --------------------------------------------------End Sign Out--------------------------------------------------

  // --------------------------------------------------Toggle GSI Button--------------------------------------------------
  handleGSIButtonVisibility(visible: boolean): void {
    if (typeof document !== 'undefined') {
      const gsiButton = document.getElementById('gsiButton');
      if (visible) {
        gsiButton?.classList.remove('hidden');
        google.accounts.id.initialize(this.IdConfiguration);
        google.accounts.id.renderButton(gsiButton, this.GsiButtonConfiguration);
        // console.log('Google Sign-In Button Re-rendered');
      } else {
        gsiButton?.classList.add('hidden');
        // console.log('Google Sign-In Button Hidden');
      }
    } else
      console.warn('Not running in the browser, Document is not available');
  }
  // --------------------------------------------------End Toggle GSI Button--------------------------------------------------
}
