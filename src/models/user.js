import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// create user schema
const UserSchema = new mongoose.Schema({
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
});

// Save the user hashed password
UserSchema.pre('save', async (next) => {
  try {
    if (this.isModified('password') || this.isNew) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    }
    return next();
  } catch (e) {
    return next(e);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async (pwd, callback) => {
  try {
    const isValid = await bcrypt.compare(pwd, this.password);
    callback(null, isValid);
  } catch (e) {
    callback(e);
  }
};

export default mongoose.model('User', UserSchema);
