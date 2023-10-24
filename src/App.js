import { useState } from "react";
import "./App.css";
import { exampleData } from "./assets/data";
import Poll from "./components/Poll";
import CreatePoll from "./components/CreatePoll";

function App() {
  const [data, setData] = useState(exampleData);

  const onCreatePoll = (poll) => {
    // Change this function to update the database!
    setData([...data, poll]);
  };

  const onVote = (value, pollData) => {
    // Change this function to update the database!
  };

  return (
    <div className="App">
      <h1>Poll App</h1>
      <h2>Settle arguments by polling your friends!</h2>
      <CreatePoll onClick={onCreatePoll} />
      {data.map((poll) => (
        <Poll uid={""} pollData={poll} onClick={onVote} key={poll.title} />
      ))}
    </div>
  );
}

export default App;
