import { Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  id: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  needsPasswordChange: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'faculty'],
  },
  status: {
    type: String,
    enum: ['in-progress', 'blocked'],
  },
  isDeleted: {
    type: Boolean,
    require: true,
  },
});
