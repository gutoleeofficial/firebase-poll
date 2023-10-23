import { useState } from "react";

const CreatePoll = ({ onClick }) => {
  const [title, setTitle] = useState("");
  const [option0, setOption0] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [warning, setWarning] = useState("");

  const onSubmit = () => {
    console.log(title);
    if (title && option0 && option1 && option2 && option3) {
      onClick({
        title,
        option0,
        option1,
        option2,
        option3,
        votes: [],
      });
      setTitle("");
      setOption0("");
      setOption1("");
      setOption2("");
      setOption3("");
      setWarning("");
    } else {
      setWarning("Please set a value for each field.");
    }
  };
  return (
    <>
      <h4>Create Poll</h4>
      <label for="title">Title</label>
      <input
        type="text"
        name="poll"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label for="option0">First Option</label>
      <input
        type="text"
        name="poll"
        id="option0"
        value={option0}
        onChange={(e) => setOption0(e.target.value)}
      />
      <br />
      <label for="option1">Second Option</label> <t />
      <input
        type="text"
        name="poll"
        id="option1"
        value={option1}
        onChange={(e) => setOption1(e.target.value)}
      />
      <br />
      <label for="option2">Third Option</label>
      <input
        type="text"
        name="poll"
        id="option2"
        value={option2}
        onChange={(e) => setOption2(e.target.value)}
      />
      <br />
      <label for="option3">Fourth Option</label>
      <input
        type="text"
        name="poll"
        id="option3"
        value={option3}
        onChange={(e) => setOption3(e.target.value)}
      />
      <br />
      {warning && <p>{warning}</p>}
      <button onClick={onSubmit}>Create Poll</button>
    </>
  );
};

export default CreatePoll;
