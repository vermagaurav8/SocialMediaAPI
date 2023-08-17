const express = require('express');
const auth = require('../middleware/auth');
const controller = require('../controller/actionController');
const router = express.Router();


// Add a post option
router.post('/posts', auth.isAuthorized, controller.addPost);

// Reterieve all posts of user sorted by posting time
router.get('/all_posts', auth.isAuthorized, controller.getAllPost);

// Action based on Id
router.get('/posts/:id', auth.isAuthorized, controller.getPostById);
router.delete('/posts/:id', auth.isAuthorized, controller.deletePostById);
router.post('/like/:id', auth.isAuthorized, controller.likePostById);
router.post('/unlike/:id', auth.isAuthorized, controller.unlikePostById);
router.post('/comment/:id', auth.isAuthorized, controller.commentOnPostById);

module.exports = router;