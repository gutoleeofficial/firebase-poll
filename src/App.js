import { useState } from "react";
import "./App.css";
import { exampleData } from "./assets/data";
import Poll from "./components/Poll";

function App() {
  const [data, setData] = useState(exampleData);

  const onClick = (value) => {
    // Change this function to update the database!
    console.log(value);
  };

  return (
    <div className="App">
      <h1>Poll App</h1>
      <h2>Settle arguments by polling your friends!</h2>
      {exampleData.map((poll) => (
        <Poll pollData={poll} onClick={onClick} />
      ))}
    </div>
  );
}

export default App;
