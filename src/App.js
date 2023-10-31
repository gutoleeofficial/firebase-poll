import { useEffect, useState } from "react";
import "./App.css";
import { exampleData } from "./assets/data";
import Poll from "./components/Poll";
import CreatePoll from "./components/CreatePoll";
import { getAuth } from "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { getDatabase, ref, onValue, push, off, set } from "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "vh-firebase-workshop.firebaseapp.com",
  projectId: "vh-firebase-workshop",
  storageBucket: "vh-firebase-workshop.appspot.com",
  messagingSenderId: "186350366886",
  appId: "1:186350366886:web:ee8b5312b3987952a90467"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

function App() {
  const [data, setData] = useState(exampleData);
  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  useEffect(() => {
    const path = ref(database, `/polls`);
    const listener = (snap) => {
      const data = snap.val();
      let polls = [];
      for (let uid in data) {
        const userPolls = data[uid];
        for (let pollId in userPolls) {
          userPolls[pollId]["votePath"] = `/polls/${uid}/${pollId}/votes`;
          polls.push(userPolls[pollId]);
        }
      }

      setData(polls);
    }
    onValue(path, listener);
  }, []);

  const onCreatePoll = (poll) => {
    push(ref(database, `/polls/${user.uid}`), poll);
  };

  const onVote = (value, pollData) => {
    set(ref(database, `${pollData.votePath}/${user.uid}`), value);
  };

  return (
    <div className="App">
      {user && (
        <>
          <h1>Poll App</h1>
          <h2>Settle arguments by polling your friends!</h2>
          <CreatePoll onClick={onCreatePoll} />
          {data.map((poll) => (
            <Poll uid={user.uid} pollData={poll} onClick={onVote} key={poll.title} />
          ))}
        </>
      )}
      {!user && (
        <input 
          type="button" 
          value="Sign in with Google" 
          onClick={() => signInWithGoogle()} 
        />
      )}
    </div>
  );
}

export default App;
