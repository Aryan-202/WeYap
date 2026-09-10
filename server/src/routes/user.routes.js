/**
 * @fileoverview Express router defining API endpoints for user resources.
 * Handles routes for fetching all users, fetching a user by ID, and creating a user.
 * @module routes/user
 */

import { Router } from "express";
import { getUsers, createUser, getUserById } from "../controllers/user.controller.js";

/**
 * Express router instance for user endpoints.
 * @type {import('express').Router}
 */
const userRouter = Router();

/**
 * @route GET /api/v1/users
 * @desc Retrieve all users
 * @access Public
 */
userRouter.get("/", getUsers);

/**
 * @route GET /api/v1/users/:id
 * @desc Retrieve a single user by ID
 * @access Public
 */
userRouter.get("/:id", getUserById);

/**
 * @route POST /api/v1/users
 * @desc Create a new user
 * @access Public
 */
userRouter.post("/", createUser);

export default userRouter;