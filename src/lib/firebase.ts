import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { config } from './config';

const app = initializeApp(config.firebase);
export const db = getFirestore(app);
export const storage = getStorage(app);