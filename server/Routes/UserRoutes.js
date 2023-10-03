import express from "express";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";
import { getAllUser } from "../Controllers/UserController.js";
import { getUser } from "../Controllers/UserController.js";
import { updateUser } from "../Controllers/UserController.js";
import { deleteUser } from "../Controllers/UserController.js";
import { followUser } from "../Controllers/UserController.js";
import { unfollowUser } from "../Controllers/UserController.js";

const router = express.Router();

router.get('/', getAllUser);
router.get('/:id', getUser);
router.put('/:id', authMiddleWare, updateUser);
router.delete('/:id', authMiddleWare, deleteUser);
router.put('/:id/follow', authMiddleWare, followUser);
router.put('/:id/unfollow', authMiddleWare, unfollowUser);

export default router;
