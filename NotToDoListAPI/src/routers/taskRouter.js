import express from 'express';
import {
  insertTask,
  getTasks,
  updateTasks,
  deleteTasks,
} from '../modals/taskModals/TaskSchema.js';
const router = express.Router();

// router.all('/', (req, res, next) => {
//   //   res.json({
//   //     status: 'success',
//   //     message: 'response from all',
//   //   });
//   next();
// });

// let fakeDB = [
//   { id: 3, task: 'sleeping', hr: 40, type: 'entry' },
//   { id: 1, task: 'coding', hr: 40, type: 'entry' },
//   { id: 2, task: 'Eating', hr: 40, type: 'entry' },
// ];

router.get('/', async (req, res, next) => {
  // db.collection.find()

  const tasks = await getTasks();
  res.json({
    status: 'success',
    message: 'response from get',
    // tasks: fakeDB,
    tasks,
  });
});

router.post('/', async (req, res, next) => {
  // console.log(req.body);

  // fakeDB.push(req.body);
  // console.log(fakeDB);

  try {
    const result = await insertTask(req.body);

    console.log(result);
    console.log(req.body);

    result?._id
      ? res.json({
          status: 'success',
          message: 'New Task has been added successfully',
        })
      : res.json({
          status: 'error',
          message: 'Error',
        });
  } catch (error) {
    console.log(error.message);
    res.json({
      status: 'error',
      message: error.message,
    });
  }
  // insert task
});

router.patch('/', async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;
    // return console.log(req.body);

    const result = await updateTasks(_id, rest); // fakedB = fakeDB.map((item) => {
    //   if (item.id === id) {
    //     item.type = type;
    //     return item;
    //   } else {
    //     return item;
    //   }
    // });
    result?._id
      ? res.json({
          status: 'success',
          message: 'Task has been updated',
        })
      : res.json({
          status: 'error',
          message: 'unable to update tasks',
        });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
});

router.delete('/', async (req, res, next) => {
  try {
    console.log(req.body);
    // const { _id } = req.params;
    // const idsToDelete = req.body;
    // console.log(_id);
    // fakeDB = fakeDB.filter((item) => item.id !== +id);
    const result = await deleteTasks(req.body);
    console.log(result);
    result?.deletedCount
      ? res.json({
          status: 'success',
          message: 'task has been deleted',
        })
      : res.json({
          status: 'error',
          message: 'could not delete',
        });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
