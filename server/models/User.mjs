import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name expected'],
  },
  email: {
    type: String,
    required: [true, 'Email expected'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password expected'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'manager'],
    default: 'user',
  },
  resetToken: String,
  resetTokenTTL: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);
