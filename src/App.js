import { useEffect, useState } from "react";
import "./App.css";
import { exampleData } from "./assets/data";
import Poll from "./components/Poll";
import CreatePoll from "./components/CreatePoll";
import { initializeApp } from "firebase/app";
import { update, getDatabase, ref, onValue, push, off } from "firebase/database"
import { getAuth } from "firebase/auth"
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpQLqYx0lCQVCcEsQTUy_s4fzZ_RaJuVE",
  authDomain: "vh-firebase-cloud-demo.firebaseapp.com",
  databaseURL: "https://vh-firebase-cloud-demo-default-rtdb.firebaseio.com",
  projectId: "vh-firebase-cloud-demo",
  storageBucket: "vh-firebase-cloud-demo.appspot.com",
  messagingSenderId: "54439720890",
  appId: "1:54439720890:web:83e16b935a5aee078f8f83"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();

function App() {
  const [data, setData] = useState([]);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);

  useEffect(() => {
    // Get data from database /polls
    const path = ref(database, "/polls");
    const listener = snap => {
      const data = snap.val();
      let polls = [];
      for (let user in data) {
        const userPolls = data[user];
        for (let pollId in userPolls) {
          userPolls[pollId]["votePath"] = `/polls/${user}/${pollId}/votes`;
          polls.push(userPolls[pollId]);
        }
      }

      setData(polls);
    }
    
    onValue(path, listener);

    return () => {
      off(path, listener);
    }
  }, []);

  const onCreatePoll = (poll) => {
    push(ref(database, `/polls/${user.uid}`), poll);
  };

  const onVote = (value, pollData) => {
    console.log(pollData)
    // Change this function to update the database!
    update(ref(database, pollData.votePath), {
      [user.uid]: value
    });
  };

  return (
    <div className="App">
      {user && <>
        <h1>Poll App</h1>
        <h2>Settle arguments by polling your friends!</h2>
        <CreatePoll onClick={onCreatePoll} />
        {data.map((poll) => (
          <Poll uid={user.uid} pollData={poll} onClick={onVote} key={poll.title} />
        ))}
        </>}
      {!user && <>
        <input type="button" value="Sign in with Google" onClick={() => signInWithGoogle()} />
      </>}
    </div>
  );
}

export default App;
