import { Application } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';

firebase()
  .initializeApp()
  .then(() => {
    console.log('Firebase initialized successfully');
    Application.run({ moduleName: 'app-root' });
  })
  .catch(error => {
    console.error('Error initializing Firebase:', error);
    Application.run({ moduleName: 'app-root' });
  });