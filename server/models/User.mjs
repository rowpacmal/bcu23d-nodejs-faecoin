import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_TTL,
  });
};

export default mongoose.model('User', userSchema);
