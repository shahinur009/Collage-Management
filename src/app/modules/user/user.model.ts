import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      require: true,
      unique: true,
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
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      require: false,
    },
  },
  {
    timestamps: true,
  },
);

//pre save Middleware/hook : will work on create() or save()
userSchema.pre('save', async function (next) {
  const user = this; //doc
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// save '' after saving password
userSchema.post('save', function (doc, next) {
  console.log(this, 'Post hook: We saved our data');
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
