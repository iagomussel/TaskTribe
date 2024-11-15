import { Observable, Frame, alert } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';
import { Auth } from '@nativescript/firebase-auth';

export class RegisterViewModel extends Observable {
  private auth: Auth;
  public fullName: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  constructor() {
    super();
    this.auth = firebase().auth();
  }

  async onCreateAccount() {
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      await alert('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await alert('Passwords do not match');
      return;
    }

    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );

      await userCredential.user.updateProfile({
        displayName: this.fullName
      });

      await this.saveUserProfile(userCredential.user.uid);
      Frame.topmost().navigate('pages/home/home-page');
    } catch (error) {
      console.error('Registration error:', error);
      await alert({
        title: 'Registration Failed',
        message: error.message || 'Please try again',
        okButtonText: 'OK'
      });
    }
  }

  private async saveUserProfile(userId: string) {
    const database = firebase().database();
    await database.ref(`users/${userId}`).set({
      fullName: this.fullName,
      email: this.email,
      createdAt: new Date().toISOString()
    });
  }
}