import connectDB from '../../../middleware/mongodb';
import { Todo, Order } from '../../../utils/mongoose/model';

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const todos = await Todo.find({});
        const orderCollection = await Order.find({});
        const order =
          orderCollection.length > 0 ? orderCollection[0].order : [];

        res.status(200).json({ todos, order });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;

    case 'POST':
      try {
        const { text, completed, order } = req.body;
        const newTodo = new Todo({ text, completed });
        await newTodo.save();
        // console.log(newTodo);
        // console.log(order);
        if (order.length === 0) {
          const newOrder = new Order({ order: [newTodo._id] });
          await newOrder.save();
        }
        await Order.findOneAndReplace({}, { order: [newTodo._id, ...order] });
        res.status(200).json({ message: 'Todo created', newTodo });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;

    case 'DELETE':
      try {
        const { completedIDs, order } = req.body;
        await Todo.deleteMany({ _id: { $in: completedIDs } });
        await Order.findOneAndReplace({}, { order });

        res.status(200).json({ message: 'deleted completed todos.' });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
  }
}

export default connectDB(handler);
