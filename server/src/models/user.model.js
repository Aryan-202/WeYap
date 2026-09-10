/**
 * @fileoverview User Mongoose model definition and schema configuration.
 * Defines the user schema, properties, constraints, timestamps, and JSON serialization transforms.
 * @module models/user
 */

import mongoose from "mongoose";

/**
 * Mongoose schema definition for User entities.
 * @type {import('mongoose').Schema}
 */
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    avatar: {
      type: String,
      default: "https://placeholder-img.com", // TODO: change the default url
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    socketId: {
      type: String,
      default: null,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

/**
 * Configure schema transformation on JSON serialization to omit sensitive password field.
 */
UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

/**
 * Mongoose model for User collection.
 * @type {import('mongoose').Model}
 */
const User = mongoose.model("User", UserSchema);

export default User;
