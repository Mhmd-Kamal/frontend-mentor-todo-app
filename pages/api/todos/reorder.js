import connectDB from '../../../middleware/mongodb';
import { Order } from '../../../utils/mongoose/model';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { order } = req.body;

    try {
      await Order.findOneAndReplace({}, { order });
      res.status(200).json({ message: 'done reorder by dnd.' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

export default connectDB(handler);
