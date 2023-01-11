/** @format */

const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    completed: Boolean,
    uid: String,
    //objectId 를 통해서 다른 model에 접근

    author: {
      //여기에 스키마 하나 더 생성한다고 생각하면됨.
      //User modeldml의 레퍼런스를 참고함
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { collection: 'todos' }
);
const Todo = mongoose.model('Todo', todoSchema);
module.exports = { Todo };
