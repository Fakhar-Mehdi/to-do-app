import mongoose, { Model } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 1,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    requiered: true,
    min: 4,
  },
});

const userModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default userModel;
