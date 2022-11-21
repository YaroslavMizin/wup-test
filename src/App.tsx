import React, { createContext } from 'react';
import Tasks from './pages/Tasks';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const app = initializeApp({
  apiKey: "AIzaSyDPFnHPlchykxxB_mJPN-H52BW01P5QHpE",
  authDomain: "wup-test-a8a61.firebaseapp.com",
  projectId: "wup-test-a8a61",
  storageBucket: "wup-test-a8a61.appspot.com",
  messagingSenderId: "431223591045",
  appId: "1:431223591045:web:8f6e09bbd5a641c00b19ec"
});

/** подключение firebase */
export const Context = createContext({} as {
  db: Firestore,
  storage: FirebaseStorage,
});

function App() {

  const db = getFirestore(app);
  const storage = getStorage(app);

  return (
    <Context.Provider value={{
      db: db,
      storage: storage,
    }}>
      <Tasks />
    </Context.Provider>
  );
}

export default App;
