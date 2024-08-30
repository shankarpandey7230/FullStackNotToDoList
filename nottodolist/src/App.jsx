import { useState, useEffect, useRef } from 'react';

import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import {
  postTask,
  fetchAllTasks,
  updateTask,
  deleteTask,
} from './helper/axioshelper.js';

const hrPerWek = 24 * 7;
function App() {
  const [taskList, setTaskList] = useState([]);
  const [resp, setResp] = useState({});
  const shouldFetchRef = useRef(true);
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  const [toDelete, setToDelete] = useState([]);
  const entryList = taskList.filter((item) => item.type === 'entry') || [];
  const badList = taskList.filter((item) => item.type === 'bad') || [];

  useEffect(() => {
    shouldFetchRef.current && getAllTasks();
    shouldFetchRef.current = false;
  }, []);

  const addTaskList = async (taskObj) => {
    // const obj = {
    //   ...taskObj,

    // };

    if (ttlHr + taskObj.hr > hrPerWek) {
      return alert('Sorry Boss not enough time fit this task from last week.');
    }

    // setTaskList([...taskList, obj]);

    // call api to send data to database

    const response = await postTask(taskObj);
    console.log(response);
    setResp(response);
    if (response.status === 'success') {
      // refetch all the tasks
      getAllTasks();
    }
  };

  const switchTask = async (_id, type) => {
    // setTaskList(
    //   taskList.map((item) => {
    //     if (item.id === id) {
    //       item.type = type;
    //     }

    //     return item;
    //   })
    // );
    const response = await updateTask({ _id, type });
    // console.log(response);
    setResp(response);
    if (response.status === 'success') {
      // refetch all the tasks
      getAllTasks();
    }
  };

  // const randomIdGenerator = (length = 6) => {
  //   const str =
  //     'qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890';

  //   let id = '';

  //   for (let i = 0; i < 6; i++) {
  //     const randomIndex = Math.floor(Math.random() * str.length);
  //     id += str[randomIndex];
  //   }

  //   return id;
  // };

  const handleOnDelete = async (idDel) => {
    if (window.confirm('Are you sure, you want to delete this?')) {
      // setTaskList(taskList.filter((item) => item.id !== id));
      // delete
      const response = await deleteTask(idDel);
      // console.log(idDel);
      setResp(response);
      if (response.status === 'success') {
        getAllTasks();

        // todelet state should be evacated
        setToDelete([]);
      }
    }
  };

  const getAllTasks = async () => {
    // call axios helper to get data from server

    const data = await fetchAllTasks();
    // console.log(data);
    // add the data to tasklist
    data?.status === 'success' && setTaskList(data.tasks);
  };
  const handleOnSelect = (e) => {
    // console.log(e);
    const { checked, value } = e.target;
    let tempArr = [];
    if (value === 'allEntry') {
      tempArr = entryList;
    }
    if (value === 'allBad') {
      tempArr = badList;
    }

    if (checked) {
      if (value === 'allEntry' || value === 'allBad') {
        // get all id from entry list
        const _ids = tempArr.map((item) => item._id);
        const uniqueIDs = [...new Set([...toDelete, ..._ids])];
        setToDelete(uniqueIDs);
        return;
      }
      setToDelete([...toDelete, value]);
    } else {
      if (value === 'allEntry' || value === 'allBad') {
        const _ids = tempArr.map((item) => item._id);
        const tempArray = toDelete.filter((_id) => !_ids.includes(_id));

        setToDelete(tempArray);
        return;
      }
      const filterArray = toDelete.filter((_id) => _id !== value);
      setToDelete(filterArray);
    }
    // console.log(checked, value);
  };

  return (
    <div className="wrapper pt-5">
      {/* <!-- title  --> */}
      <div className="container">
        <h1 className="text-center">Not To Do List!</h1>
        {resp?.message && (
          <div
            className={
              resp?.status === 'success'
                ? 'alert alert-success'
                : 'alert alert-danger'
            }
          >
            {resp?.message}
          </div>
        )}

        {/* <!-- form  --> */}
        <Form addTaskList={addTaskList} />

        {/* <!-- tables --> */}
        <Table
          taskList={taskList}
          switchTask={switchTask}
          handleOnDelete={handleOnDelete}
          toDelete={toDelete}
          handleOnSelect={handleOnSelect}
          entryList={entryList}
          badList={badList}
        />

        <div className="alert alert-success">
          The total hours allocated = <span id="ttlHrs">{ttlHr}</span> hrs
        </div>
      </div>
    </div>
  );
}

export default App;
