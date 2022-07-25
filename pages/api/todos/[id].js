import connectDB from '../../../middleware/mongodb';
import { Todo, Order } from '../../../utils/mongoose/model';

async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      const { completed } = req.body;

      try {
        await Todo.findByIdAndUpdate(id, { completed });
        res.status(200).json({ message: 'Todo marked done.' });
      } catch (error) {
        res.status(500).json({ error });
      }
      break;

    case 'DELETE':
      const { newOrder } = req.body;

      try {
        await Todo.findByIdAndDelete(id);
        await Order.findOneAndReplace({}, { order: newOrder });

        res.status(200).json({ message: 'Todo deleted' });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;
  }
}

export default connectDB(handler);
