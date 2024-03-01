import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
const Todo = () => {
  const [inputVal, setInputVal] = useState("");
  const [Elements, setElements] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [edit, setEditItem] = useState(null);
  const InputEvent = (event) => {
    setInputVal(event.target.value);
  };
  const AddLists = () => {
    if (!inputVal) {
      alert("Please fill Input Field");
    } else if (inputVal && !toggle) {
      const updatedElements = Elements.map((elem) => {
        if (elem.id === edit) {
          return { ...elem, name: inputVal };
        }
        return elem;
      });
      setElements(updatedElements);
      setToggle(true); // Reset toggle to add mode
      setInputVal(""); // Clear input field after editing
    } else {
      const allInputs = { id: new Date().getTime().toString(), name: inputVal };
      setElements([...Elements, allInputs]);
      setInputVal("");
    }
  };
  const deleteItem = (index) => {
    console.log("deleted");
    setElements((prevValue) => {
      return prevValue.filter((elem) => {
        console.log(index);
        return elem.id !== index;
      });
    });
  };
  const editItem = (id) => {
    const newEditElement = Elements.find((element) => {
      return element.id === id;
    });
    setToggle(false);
    console.log(newEditElement);
    setInputVal(newEditElement.name);
    setEditItem(id);
  };
  return (
    <>
      <div className="main_todo">
        <br />
        <h1 className="todo_heading">ToDoList</h1>
        <br />
        <input
          placeholder="Add a Item"
          type="text"
          onChange={InputEvent}
          value={inputVal}
        />
        {toggle ? (
          <Tooltip title="Add">
            <button className="btn" onClick={AddLists}>
              +
            </button>
          </Tooltip>
        ) : (
          <Tooltip title="Edit">
            <button className="btn" onClick={AddLists}>
              ✎
            </button>
          </Tooltip>
        )}

        <br />
        <ol>
          {Elements.map((elem) => {
            return (
              <div className="setLiBtn" key={elem.id}>
              <Tooltip title="Delete">
                <button onClick={() => deleteItem(elem.id)} className="btndlt">
                  ✖
                </button>
                </Tooltip>
                <li>{elem.name}</li>
                <Tooltip title="Edit">
                  <button className="btnedit" onClick={() => editItem(elem.id)}>
                    ✎
                  </button>
                </Tooltip>
              </div>
            );
          })}
        </ol>
      </div>
    </>
  );
};
export default Todo;
