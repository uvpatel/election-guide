import admin from "firebase-admin";
import { env } from "./env.js";

let db = null;

export function getFirestore() {
  if (db) {
    return db;
  }

  if (!admin.apps.length) {
    if (!env.firebaseProjectId || !env.firebaseClientEmail || !env.firebasePrivateKey) {
      console.warn("[firebase] Missing Firebase credentials. Firestore logging is disabled.");
      return null;
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.firebaseProjectId,
        clientEmail: env.firebaseClientEmail,
        privateKey: env.firebasePrivateKey
      })
    });
  }

  db = admin.firestore();
  return db;
}
