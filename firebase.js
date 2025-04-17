// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "your-project-id.appspot.com"  // fb storage
});

const db = admin.firestore();
const bucket = admin.storage().bucket(); //firebase storage

module.exports = { admin, db, bucket };
