import mongoose, { Model } from 'mongoose';

export interface ITodo {
  description: string;
  createdAt: string;
}
const todoSchema = new mongoose.Schema({
  description: {
    type: String,
    min: 1,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  }, // date and time
});

// const todoModel = mongoose.Model('Task', todoSchema);
const todoModel: Model<ITodo> = mongoose.model<ITodo>('Task', todoSchema);
export default todoModel;
