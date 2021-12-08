const firebaseAdmin = require("firebase-admin");

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        "project_id": process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY) : undefined,
        "client_email": process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  });
  firebaseAdmin.firestore().settings({ignoreUndefinedProperties:true});
}

module.exports = firebaseAdmin;