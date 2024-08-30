import mongoose from 'mongoose';
// database table selection
const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    hr: {
      type: Number,
      required: true,
      min: 1,
      max: [100, 'Are you sure to allocate this big number of hours'],
    },
    type: {
      type: String,
      default: 'entry',
      enum: ['entry', 'bad'],
    },
  },
  { timestamps: true }
);
const taskCollection = mongoose.model('Task', taskSchema);
export const insertTask = (taskObj) => {
  return taskCollection(taskObj).save();
};
export const getTasks = () => {
  return taskCollection.find();
};

export const updateTasks = (_id, rest) => {
  return taskCollection.findByIdAndUpdate(_id, rest, {
    new: true,
  });
};
// export const deleteTasks = (_id) => {
//   return taskCollection.findByIdAndDelete(_id);
// };

export const deleteTasks = (ids) => {
  return taskCollection.deleteMany({ _id: { $in: ids } });
};
