'use strict';

import { Request, Response } from 'express';
import { admin } from '../utils/firebaseAdmin';
import { parseStringAsArray } from '../utils/stringUtils';
import * as geohash from "ngeohash";
import { GeoCollectionReference, GeoFirestore } from 'geofirestore';

const db = admin.firestore();
const geofirestore: GeoFirestore = new GeoFirestore(db);
const geocollection: GeoCollectionReference = geofirestore.collection('aparelhos');

async function listar(req: Request, res: Response) {

  await db.collection('aparelhos').get().then((resultado) => {
    const lista: any = [];
    if (!resultado) {
      res.status(404).send('Nenhum aparelho encontrado');
      return;
    };

    resultado.docs.forEach((i) => {
      lista.push(i.data())
    });

    return res.status(200).json(lista);

  }).catch((err) => {
    return res.status(500).send(err);
  });
};

async function salvar(req: Request, res: Response) {

  const { uid, nome, email, latitude, longitude, devices } = req.body;
  const dispositivosArray: Array<string> = parseStringAsArray(devices)
  const swapper = {
    idUsuario: uid,
    nome: nome,
    email: email,
    dispositivos: dispositivosArray
  }

  geocollection.add({
    coordinates: new admin.firestore.GeoPoint(parseFloat(latitude), parseFloat(longitude)),
    data: swapper
  }).then((data) => {
    res.status(200).json(data)
  }).catch((err) => {
    res.status(500).json(err)
  });

};

async function atualizarLocalizacao(req: Request, res: Response) {

  const { id } = req.query;
  const { latitude, longitude } = req.body;

  await db.collection('aparelhos').doc(id).update({
    'd.coordinates': new admin.firestore.GeoPoint(parseFloat(latitude), parseFloat(longitude)),
    g: geohash.encode(latitude, longitude),
    l: new admin.firestore.GeoPoint(parseFloat(latitude), parseFloat(longitude)),
    
  }).then(async (usuario) => {
    return res.status(200).send(usuario)
  }).catch((err) => {
    return res.status(500).send(err);
  });

};

export { salvar, listar, atualizarLocalizacao };
