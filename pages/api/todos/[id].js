import connectDB from '../../../middleware/mongodb';
import Todo from '../../../utils/mongoose/model';

async function handler(req, res) {
  const { id, completed } = req.body;

  try {
    await Todo.findByIdAndUpdate(id, { completed });
    const todo = await Todo.findById(id);
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export default connectDB(handler);
