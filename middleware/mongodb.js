import { connect, connections } from 'mongoose';

const connectDB = (handler) => async (req, res) => {
  if (connections[0].readyState) {
    return handler(req, res);
  }
  await connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected');
  return handler(req, res);
};

export default connectDB;
