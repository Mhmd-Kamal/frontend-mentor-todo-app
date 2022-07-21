import { Schema, model, models } from 'mongoose';

const todoSchema = new Schema(
  { text: String, completed: Boolean },
  { timestamps: true }
);

const Todo = models.Todo || model('Todo', todoSchema);

export default Todo;
