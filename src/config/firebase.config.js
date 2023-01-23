import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAF14TuHN4qrMt-NhayHKtMhtvBXDbBP7Q',
  authDomain: 'agrimedia-9193b.firebaseapp.com',
  projectId: 'agrimedia-9193b',
  storageBucket: 'agrimedia-9193b.appspot.com',
  messagingSenderId: '917206600955',
  appId: '1:917206600955:web:e0c83900add599a3b2745e',
  measurementId: 'G-2E7DBNZE05',
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export default storage;
export { auth, provider, db };
