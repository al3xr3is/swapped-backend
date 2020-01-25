'use strict';

import { Request, Response } from 'express';
import { admin } from '../utils/firebaseAdmin';
import * as geohash from "ngeohash";

const db = admin.firestore();

async function listar(req: Request, res: Response) {

  await db.collection('usuarios').get().then((resultado) => {
    const lista: any = [];
    if (!resultado) {
      res.status(404).send('Nenhum usuário encontrado');
      return;
    };

    resultado.docs.forEach((i) => {
      lista.push(i.data());
    });

    return res.status(200).json(lista);

  }).catch((err) => {
    return res.status(500).send(err);
  });
};

async function salvar(req: Request, res: Response) {

  const { uid, nome, email, latitude, longitude } = req.body;

  await db.collection('usuarios').doc(uid).set({
    nome: nome,
    email: email,
    localizacao: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      geohash: geohash.encode(latitude, longitude)
    }
  }).then(async (usuario) => {
    return res.status(201).send(usuario);
  }).catch((err) => {
    return res.status(500).send(err);
  });

};

async function atualizar(req: Request, res: Response) {

  const { uid } = req.query;
  const { nome, email, latitude, longitude } = req.body;

  await db.collection('usuarios').doc(uid).update({
    nome: nome,
    email: email,
    localizacao: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      geohash: geohash.encode(latitude, longitude)
    }
  }).then(async (usuario) => {
    return res.status(200).send(usuario);
  }).catch((err) => {
    return res.status(500).send(err);
  });

};

export { salvar, listar, atualizar };
