import admin from 'firebase-admin';
const serviceAccount = require('./config.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://be-the-heroes-default-rtdb.firebaseio.com',
});

console.log('Firebase initialized');

export const { auth: firebaseAuth, database } = admin;
