import bcrypt from 'bcrypt';
import mongoose from './modelCreator';

export default new mongoose.CreateModel('User', {
  schema: {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'Cooperator'],
      default: 'Cooperator',
    },
    firstName: {
      type: String,
      lowercase: true,
      required: false,
    },
    lastName: {
      type: String,
      lowercase: true,
      required: false,
    },
    phoneNumber: {
      type: String,
    },
  },
  presave: async function pre(next) {
    try {
      if (this.isModified('password') || this.isNew) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
      }
      return next();
    } catch (e) {
      return next(e);
    }
  },
  validatePassword: function validatePassword(pwd) {
    return bcrypt.compare(pwd, this.password);
  },
});
