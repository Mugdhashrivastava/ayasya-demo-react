import React, { startTransition, useState } from "react";

export default function Addusermodal({ getState }) {
  const [userList, setUserList] = useState([]);
  // console.log(userList)
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  
  const [addModalState, setAddModalState] = useState({
    firstname: "",
    lastname: "",
    select: "",
    id: generateRandomId(),
  });

  const [modalVisible, setModalVisible] = useState(true);

  const inputHandler = (identifier, value) => {
    setAddModalState((prev) => ({ ...prev, [identifier]: value }));
  };

  const addHandler = (event) => {
    event.preventDefault();
    const arr = [...userList];
    arr.push(addModalState);
    setUserList(arr);
    getState(arr);
    setAddModalState({
      firstname: "",
      lastname: "",
      select: "",
      id: generateRandomId(),
    });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // console.log(userList, 'child');
  return (
    <>
      {modalVisible && (
        <div>
          <form onSubmit={addHandler} class="flex flex-col items-center">
            <label
              htmlFor="firstname"
              className=" -ml-[22rem] text-md font-medium text-gray-900 dark:text-black"
          >
              First Name
            </label>
            <input
            className="bg-zinc-200 border mb-5 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2 dark:border-gray-300 dark:placeholder-gray-500 dark:focus:ring-gray-500 dark:focus:border-black-500"
           type="text"
              name="firstname"
              value={addModalState.firstname}
              onChange={(event) =>
                inputHandler("firstname", event.target.value)
              }
            />
            <label
              htmlFor="lastname"
              className=" -ml-[22rem] text-md font-medium text-gray-900 dark:text-black"
          >
              Last Name
            </label>
            <input
             
            className="bg-zinc-200 border mb-5 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2 dark:border-gray-300 dark:placeholder-gray-500 dark:focus:ring-gray-500 dark:focus:border-black-500"
            type="text"
              name="lastname"
              value={addModalState.lastname}
              onChange={(event) => inputHandler("lastname", event.target.value)}
            />

            <select
              onChange={(event) => inputHandler("select", event.target.value)}
              value={addModalState.select}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm m-5 mx-auto rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-zinc-200  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
              <option>Groceries</option>
              <option>Personal</option>
              <option>Work</option>
            </select>

            <button
              type="submit"
            className="text-white bg-purple-500 hover:bg-purple-500 font-medium rounded-md text-sm px-6 py-1 text-center m-5 dark:bg-purple-400 dark:hover:bg-purple-600 "
          >
              Submit
            </button>
            <button
              type="button"
              onClick={closeModal}
            className="text-white bg-purple-500 hover:bg-purple-500 font-medium rounded-md text-sm px-6 py-1 text-center m-5 dark:bg-purple-400 dark:hover:bg-purple-600 "
          >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}
