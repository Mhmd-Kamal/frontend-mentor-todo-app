import connectDB from '../../../middleware/mongodb';
import Todo from '../../../utils/mongoose/model';

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const todos = await Todo.find({});
        res.status(200).json(todos);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'POST':
      try {
        const { text, completed, order } = req.body;
        const newTodo = new Todo({ text, completed, order });
        await newTodo.save();
        res.status(200).json({ message: 'Todo created', newTodo });
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'DELETE':
      try {
        const { completedIDs } = req.body;
        await Todo.deleteMany({ _id: { $in: completedIDs } });
        const todos = await Todo.find({});

        res.status(200).json({ todos });
      } catch (error) {
        res.status(500).json(error);
      }
  }
}

export default connectDB(handler);
