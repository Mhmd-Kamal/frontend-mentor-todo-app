import connectDB from '../../../middleware/mongodb';
import Todo from '../../../utils/mongoose/model';

async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      const { completed } = req.body;

      try {
        await Todo.findByIdAndUpdate(id, { completed });
        const todo = await Todo.findById(id);
        res.status(200).json({ todo });
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    case 'DELETE':
      try {
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: 'Todo deleted' });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
  }
}

export default connectDB(handler);
