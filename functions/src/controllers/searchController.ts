'use strict';

import { Request, Response } from 'express';
import { admin } from '../utils/firebaseAdmin';
import { parseStringAsArray } from '../utils/stringUtils';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';

const db = admin.firestore();
const geofirestore: GeoFirestore = new GeoFirestore(db);

async function index(req: Request, res: Response) {
  
  const lista: any = [];
  const { latitude, longitude, devices } = req.query;
  const devicesArray: Array<string> = parseStringAsArray(devices);
  const geocollection: GeoCollectionReference = geofirestore.collection('aparelhos');  
  const query: GeoQuery = geocollection
  .where('data.dispositivos', 'array-contains-any', devicesArray)
  .near({ center: new admin.firestore.GeoPoint(parseFloat(latitude), parseFloat(longitude)), radius: 50});
  
  query.limit(30).get().then((value: GeoQuerySnapshot) => {
    value.docs.forEach((i) => {
      lista.push(i.data());
    });
    res.status(200).json({swappers: lista});
  }).catch((err) => {
    res.status(500).json({swappers: 'erro ao retornar dados ' + err })
  });

};

export { index };
