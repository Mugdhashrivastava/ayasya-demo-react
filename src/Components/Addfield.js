import React, { useState, useEffect } from "react";
import Displaymodal from "./Displaymodal";
import axios from "axios";

import Addusermodal from "./Addusermodal";

const Addfield = () => {
  const [addModal, setAddModal] = useState([]);
  const [select, setSelect] = useState("");
  const [selectedDataArray, setSelectedDataArray] = useState([]);
  const [changeData, setChangeData] = useState([]);
  const [enteredValues, setEnteredValues] = useState({ title: "", body: "" });
  const [storedValues, setStoredValues] = useState([]);
  const [localValues, setLocalValues] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const getState = (state) => {
    console.log(state, "state");
    setAddModal(state);
  };

  console.log(selectedDataArray, "array---");

  const selectHandler = (event) => {
    console.log("calll==", event.target.value);
    setSelect(event.target.value);
  };

  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const openAddUserModal = () => {
    setShowAddUserModal(true);
  };

  const closeAddUserModal = () => {
    setShowAddUserModal(false);
  };

  useEffect(() => {
    if (isTrue) {
      const todoData = localStorage.getItem("todo");
      if (todoData) {
        const retrievedProducts = JSON.parse(todoData);
        setLocalValues(retrievedProducts);
      }
    }
  }, [isTrue]);

  useEffect(() => {
    const fetchAddModalData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/get-users?select=${select}`
        );
        setAddModal(response.data);
      } catch (error) {
        console.error("Error fetching addModal data:", error.message);
      }
    };

    fetchAddModalData();
  }, [select]);

  useEffect(() => {
    // Create a new array when 'select' changes
    setSelectedDataArray([]);
  }, [select]);

  // [{id:[]}]

  // [{id:{}}]
  const addHandler = async (e) => {
    e.preventDefault();

    const selectedId = select;
    const updatedStoredValues = [...storedValues, enteredValues];
    const updatedLocalValues = [...localValues, enteredValues];

    setStoredValues(updatedStoredValues);
    setLocalValues(updatedLocalValues);
    const updatedDataArray = [...selectedDataArray];
    const obj = { [selectedId]: enteredValues };
    setSelectedDataArray([...updatedDataArray, obj]);
    // setSelectedDataArray((prev) => {
    //   const updatedArray = [...prev, { [selectedId]: storedValues }];
    //   setChangeData((prev) => [...prev, updatedArray]);
    //   return updatedArray;
    // });

    try {
      await axios.post("http://localhost:8001/write-json", { enteredValues });
      console.log("Data written to file successfully");
    } catch (error) {
      console.error("Error writing to file:", error.message);
    }

    localStorage.setItem("todo", JSON.stringify(updatedLocalValues));
    setEnteredValues({ title: "", body: "" });
  };

  const listHandler = () => {
    setIsTrue((prevIsTrue) => !prevIsTrue);
  };

  const deleteHandler = () => {
    const updatedLocalValues = localValues.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setLocalValues(updatedLocalValues);
    localStorage.setItem("todo", JSON.stringify(updatedLocalValues));
    setSelectedItems([]);
  };

  const handleInputChanges = (identifier, value) => {
    setEnteredValues({ ...enteredValues, [identifier]: value });
  };

  return (
    <>
      <div>
        <form onSubmit={(e) => addHandler(e)} class="flex flex-col items-center">
          <label
            htmlFor="title"
            className=" text-md font-medium text-gray-900 -ml-[25rem] dark:text-black "
          >
            Title
          </label>
          <input
            
            className="bg-zinc-200 border mb-5 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2 dark:border-gray-300 dark:placeholder-gray-500 dark:focus:ring-gray-500 dark:focus:border-black-500"
           type="text"
            placeholder="Add Title"
            name="title"
            value={enteredValues.title}
            onChange={(event) =>
              handleInputChanges("title", event.target.value)
            }
          />
          <label
            htmlFor="body"
            className=" -ml-[25rem] text-md font-medium text-gray-900 dark:text-black"
          >
            Body
          </label>
          <input
            className="bg-zinc-200 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 h-40 p-2 dark:border-gray-300 dark:placeholder-gray-500 dark:focus:ring-gray-500 dark:focus:border-black-500"
            type="text"
            placeholder="Body"
            name="body"
            value={enteredValues.body}
            onChange={(event) => handleInputChanges("body", event.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-purple-500 hover:bg-purple-500 font-medium rounded-md text-sm px-6 py-1 text-center m-5 dark:bg-purple-400 dark:hover:bg-purple-600 "
          >
            Add
          </button> 
        </form>
        <Displaymodal values={isTrue ? localValues : storedValues} />

        <button
          onClick={listHandler}
          className="text-white ml-32 bg-purple-500 hover:bg-purple-500 font-medium rounded-md text-sm px-6 py-1 text-center m-5 dark:bg-purple-400 dark:hover:bg-purple-600 "
          >
          List
        </button>

        {isTrue ? (
          <button
            onClick={deleteHandler}
            className="text-white bg-purple-500 hover:bg-purple-500 font-medium rounded-md text-sm px-6 py-1 text-center m-5 dark:bg-purple-400 dark:hover:bg-purple-600 "
          >
            Delete
          </button>
        ) : null}

        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm m-5 mx-auto rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-zinc-200  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          style={{ width: "300px" }}
          onChange={selectHandler}
        >
          <option>Select User</option>
          {addModal.map((item) => (
            <option key={item.id} value={item.id}>
              {item.firstname + " " + item.lastname + " " + item.id}
            </option>
          ))}
        </select>

        <button
          onClick={openAddUserModal}
          className="text-white ml-32 bg-purple-500 hover:bg-purple-500 font-medium rounded-md text-sm px-6 py-1 text-center m-5 dark:bg-purple-400 dark:hover:bg-purple-600 "
          >
          Adduser
        </button>

        {showAddUserModal ? (
          <Addusermodal onClose={closeAddUserModal} getState={getState} />
        ) : null}
      </div>
    </>
  );
};

export default Addfield;
