import express from 'express';
import { createPost } from '../Controllers/PostController.js';
import { getPost } from '../Controllers/PostController.js';
import { updatePost } from '../Controllers/PostController.js';
import { deletePost } from '../Controllers/PostController.js';
import { likePost } from '../Controllers/PostController.js';
import { getTimelinePosts } from '../Controllers/PostController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
router.get('/:id/timeline', getTimelinePosts);

export default router;