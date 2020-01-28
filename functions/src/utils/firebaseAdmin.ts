'use strict';

import * as admin from 'firebase-admin';

//const serviceAccount = require("caminho da chave privada");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://swapped-backend.firebaseio.com"
});

admin.firestore().settings({
  timestampsInSnapShots: true
});

export { admin };
