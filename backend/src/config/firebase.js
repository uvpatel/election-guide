import admin from "firebase-admin";
import { env } from "./env.js";

let db = null;

export function getFirestore() {
  if (db) {
    return db;
  }

  if (!admin.apps.length) {
    if (env.firebaseProjectId && env.firebaseClientEmail && env.firebasePrivateKey) {
      // Use explicit credentials if provided
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: env.firebaseProjectId,
          clientEmail: env.firebaseClientEmail,
          privateKey: env.firebasePrivateKey
        })
      });
    } else {
      // Fallback to Application Default Credentials (Secure Cloud Run Standard)
      console.log("[firebase] Using Application Default Credentials");
      admin.initializeApp({
        projectId: env.firebaseProjectId || 'prompt-wars-solution-2'
      });
    }
  }

  db = admin.firestore();
  return db;
}
