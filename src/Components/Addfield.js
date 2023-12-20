import React, { useState, useEffect } from 'react';
import Displaymodal from './Displaymodal';
import axios from 'axios';
import styles from './Addfield.module.css';
import Addusermodal from './Addusermodal';

const Addfield = () => {
  const [addModal, setAddModal] = useState([]);
  const [select, setSelect] = useState('');
  const [selectedDataArray, setSelectedDataArray] = useState([]);
  const [changeData, setChangeData] = useState([]);
  const [enteredValues, setEnteredValues] = useState({ title: '', body: '' });
  const [storedValues, setStoredValues] = useState([]);
  const [localValues, setLocalValues] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

 

  const getState = (state) => {
	console.log(state, "state")
    setAddModal(state);
  };

  console.log( selectedDataArray, "array---");
  
  const selectHandler = (event) => {
	console.log("calll==", event.target.value)
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
      const todoData = localStorage.getItem('todo');
      if (todoData) {
        const retrievedProducts = JSON.parse(todoData);
        setLocalValues(retrievedProducts);
      }
    }
  }, [isTrue]);

  useEffect(() => {
    const fetchAddModalData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/get-users?select=${select}`);
        setAddModal(response.data);
      } catch (error) {
        console.error('Error fetching addModal data:', error.message);
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
     const obj = {[selectedId] : enteredValues}
	 setSelectedDataArray([...updatedDataArray, obj])
    // setSelectedDataArray((prev) => {
    //   const updatedArray = [...prev, { [selectedId]: storedValues }];
    //   setChangeData((prev) => [...prev, updatedArray]);
    //   return updatedArray;
    // });


  
    try {
      await axios.post('http://localhost:8001/write-json', { enteredValues });
      console.log('Data written to file successfully');
    } catch (error) {
      console.error('Error writing to file:', error.message);
    }

    localStorage.setItem('todo', JSON.stringify(updatedLocalValues));
    setEnteredValues({ title: '', body: '' });
  };



  const listHandler = () => {
    setIsTrue((prevIsTrue) => !prevIsTrue);
  };

  const deleteHandler = () => {
    const updatedLocalValues = localValues.filter((_, index) => !selectedItems.includes(index));
    setLocalValues(updatedLocalValues);
    localStorage.setItem('todo', JSON.stringify(updatedLocalValues));
    setSelectedItems([]);
  };

  const handleInputChanges = (identifier, value) => {
    setEnteredValues({ ...enteredValues, [identifier]: value });
  };



  return (
    <>
      <div>
        <form onSubmit={(e) => addHandler(e)} className={styles.form}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            className={styles.input}
            type="text"
            placeholder="Add Title"
            name="title"
            value={enteredValues.title}
            onChange={(event) => handleInputChanges('title', event.target.value)}
          />
          <label htmlFor="body">Body</label>
          <input
            type="text"
            placeholder="Body"
            name="body"
            value={enteredValues.body}
            onChange={(event) => handleInputChanges('body', event.target.value)}
          />
          <button type="submit" className={styles.button}>
            Add
          </button>
        </form>

        <button onClick={openAddUserModal} className={styles.button}>
          Adduser
        </button>

        {showAddUserModal ? <Addusermodal onClose={closeAddUserModal} getState={getState} /> : null}

        <button onClick={listHandler} className={styles.button}>
          List
        </button>

        {isTrue ? <button onClick={deleteHandler}>Delete</button> : null}

        <Displaymodal values={isTrue ? localValues : storedValues} />
      </div>
      <select style={{ width: '300px' }}   onChange={selectHandler}>
		<option>Select User</option>
        {addModal.map((item) => (
          <option key={item.id} value={item.id}>
            {item.firstname + ' ' + item.lastname + ' ' + item.id}
          </option>
        ))}
        
      </select>
    </>
  );
};

export default Addfield;
