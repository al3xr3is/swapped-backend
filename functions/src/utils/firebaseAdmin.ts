'use strict';

import * as admin from 'firebase-admin';

const serviceAccount = require("../../swapped-backend-firebase-adminsdk-sw8pd-cdca943d9e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://swapped-backend.firebaseio.com"
});

admin.firestore().settings({
  timestampsInSnapShots: true
});

export { admin };
