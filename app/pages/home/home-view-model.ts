import { Observable, Frame } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';

export class HomeViewModel extends Observable {
  constructor() {
    super();
  }

  async onLogout() {
    try {
      await firebase().auth().signOut();
      Frame.topmost().navigate({
        moduleName: 'pages/auth/login-page',
        clearHistory: true
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}