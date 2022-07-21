import connectDB from '../../middleware/mongodb';
import Todo from '../../utils/mongoose/model';

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
        const { text, completed } = req.body;
        const newTodo = new Todo({ text, completed });
        await newTodo.save();
        res.status(200).json({ message: 'Todo created' });
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: 'Todo deleted' });
      } catch (error) {
        res.status(500).json(error);
      }
  }
}

export default connectDB(handler);
