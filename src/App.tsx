import React, { createContext, useReducer } from 'react';
import Tasks from './pages/Tasks';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { newTaskReducer } from './reducers/taskReducer/taskReducer';
import { newTask } from './types/task';

const app = initializeApp({
  apiKey: "AIzaSyDPFnHPlchykxxB_mJPN-H52BW01P5QHpE",
  authDomain: "wup-test-a8a61.firebaseapp.com",
  projectId: "wup-test-a8a61",
  storageBucket: "wup-test-a8a61.appspot.com",
  messagingSenderId: "431223591045",
  appId: "1:431223591045:web:8f6e09bbd5a641c00b19ec"
});

export const Context = createContext({} as {db: Firestore});

function App() {

  const db = getFirestore(app);

  return (
    <Context.Provider value={{
      db: db,
    }}>
      <Tasks />
    </Context.Provider>
  );
}

export default App;
