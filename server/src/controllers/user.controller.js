/**
 * @fileoverview User controller handling user-related HTTP request operations.
 * Provides handlers to fetch all users, retrieve a user by ID, and create a user.
 * @module controllers/user
 */

import User from "../models/user.model.js";

/**
 * Retrieves all users from the database.
 *
 * @async
 * @function getUsers
 * @param {import('express').Request} _req - Express request object (unused).
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends JSON array of users or error response.
 */
export const getUsers = async (_req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error: error.message });
  }
};

/**
 * Retrieves a single user by their MongoDB ObjectId.
 *
 * @async
 * @function getUserById
 * @param {import('express').Request<{ id: string }>} req - Express request object containing user ID in params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends JSON user object, 404 if not found, or 500 on error.
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
};

/**
 * Creates a new user in the database.
 *
 * @async
 * @function createUser
 * @param {import('express').Request} req - Express request object containing user data in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends JSON of created user (201) or 400 on error.
 */
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error: error.message });
  }
};