import { Observable, Frame, alert } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';
import { Auth, GoogleAuthProvider } from '@nativescript/firebase-auth';

export class LoginViewModel extends Observable {
  private auth: Auth;
  public email: string = '';
  public password: string = '';

  constructor() {
    super();
    this.auth = firebase().auth();
  }

  async onLogin() {
    if (!this.email || !this.password) {
      await alert('Please enter both email and password');
      return;
    }

    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      console.log('User logged in:', userCredential.user.uid);
      Frame.topmost().navigate('pages/home/home-page');
    } catch (error) {
      console.error('Login error:', error);
      await alert({
        title: 'Login Failed',
        message: error.message || 'Please check your credentials',
        okButtonText: 'OK'
      });
    }
  }

  async onGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await this.auth.signInWithProvider(provider);
      console.log('Google login success:', result.user.uid);
      Frame.topmost().navigate('pages/home/home-page');
    } catch (error) {
      console.error('Google login error:', error);
      await alert({
        title: 'Google Login Failed',
        message: error.message || 'Please try again',
        okButtonText: 'OK'
      });
    }
  }

  onRegister() {
    Frame.topmost().navigate('pages/auth/register-page');
  }
}