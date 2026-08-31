import {
  applicationDefault,
  getApps,
  initializeApp,
  type App,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getFirebaseApp(): App {
  const existingApp = getApps()[0];

  if (existingApp) {
    return existingApp;
  }

  return initializeApp({
    credential: applicationDefault(),
  });
}

export function getFirestoreDb() {
  return getFirestore(getFirebaseApp());
}
