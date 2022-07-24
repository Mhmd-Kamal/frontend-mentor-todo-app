import { Schema, model, models } from 'mongoose';

const todoSchema = new Schema(
  { text: String, completed: Boolean, order: Number },
  { timestamps: true }
);

const Todo = models.Todo || model('Todo', todoSchema);

export default Todo;
