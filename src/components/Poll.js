import { useState, useEffect } from "react";

const Poll = ({ onClick, pollData, uid }) => {
  const [voted, setVoted] = useState(false);
  
  useEffect(() => {
    setVoted(uid in pollData.votes);
  }, [uid]);

  const getResults = () => {
    if (!pollData.votes) return;
    const resultsArr = Object.values(pollData.votes);
    const outcome = [0, 0, 0, 0];
    for (let i = 0; i < resultsArr.length; i++) {
      outcome[resultsArr[i]] += 1;
    }
    return (
      <>
        <p>
          {pollData.option0}: {outcome[0]}
        </p>
        <p>
          {pollData.option1}: {outcome[1]}
        </p>
        <p>
          {pollData.option2}: {outcome[2]}
        </p>
        <p>
          {pollData.option3}: {outcome[3]}
        </p>
      </>
    );
  };

  const onClickOption = (value, pollData) => {
    setVoted(true);
    onClick(value, pollData);
  };

  return (
    <>
      <h3>{pollData.title}</h3>
      <input
        type="radio"
        id="option0"
        name="option"
        value={0}
        disabled={voted}
        onClick={(e) => onClickOption(e.target.value, pollData)}
      />
      <label for="option0">{pollData.option0}</label>
      <br />
      <input
        type="radio"
        id="option1"
        name="option"
        value={1}
        disabled={voted}
        onClick={(e) => onClickOption(e.target.value, pollData)}
      />
      <label for="option0">{pollData.option1}</label>
      <br />
      <input
        type="radio"
        id="option2"
        name="option"
        value={2}
        disabled={voted}
        onClick={(e) => onClickOption(e.target.value, pollData)}
      />
      <label for="option0">{pollData.option2}</label>
      <br />
      <input
        type="radio"
        id="option3"
        name="option"
        value={3}
        disabled={voted}
        onClick={(e) => onClickOption(e.target.value, pollData)}
      />
      <label for="option0">{pollData.option3}</label>
      <br />
      {voted && (
        <>
          <h4>Results:</h4> {getResults()}
        </>
      )}
    </>
  );
};

export default Poll;
