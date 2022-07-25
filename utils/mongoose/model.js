import { Schema, model, models } from 'mongoose';

const todoSchema = new Schema(
  { text: String, completed: Boolean },
  { timestamps: true }
);

const orderSchema = new Schema({ order: [{ type: String }] });

export const Todo = models.Todo || model('Todo', todoSchema);

export const Order = models.Order || model('Order', orderSchema);
