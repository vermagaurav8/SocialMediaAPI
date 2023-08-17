const userSchema = require('../models/userSchema');
const Post = require('../models/postSchema');

// Create a post functionality
exports.addPost = async (req, res) => {
    try {
        const userId = req.user.userId; // Extracted from the Authorization Bearer token
        const { title, description } = req.body;

        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const newPost = new Post({
            author: userId,
            title,
            description,
        });

        await newPost.save();
        res.json({
            postId: newPost._id,
            title: newPost.title,
            description: newPost.description,
            created_at: newPost.created_at,
        });
    } catch (error) {
        res.status(402).json({ error: "An error occurred." });
    }
};

// Reterieve all posts
exports.getAllPost = async (req, res) => {
    try {
        const userId = req.user.userId;
        const posts = await Post.find({ author: userId }).sort({ created_at: -1 }).populate("likes comments.author", "username").exec();
        // console.log(posts)
        const formattedPosts = posts.map((post) => ({
            id: post._id,
            title: post.title,
            description: post.description,
            created_at: post.created_at,
            likes: post.likes.length,
            comments: post.comments.length,
        }));

        res.json(formattedPosts);
    } catch (error) {
        res.status(402).json({ error: console.log(error) });
    }
};

// Get all post By Id
exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate( "likes comments.author", "username");
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        res.json({
            id: post._id,
            title: post.title,
            description: post.description,
            created_at: post.created_at,
            likes: post.likes.length,
            comments: post.comments.map((comment) => ({
                id: comment._id,
                text: comment.text,
                author: comment.author.username,
            })),
        });
    } catch (error) {
        res.status(402).json({ error: "An error occurred." });
    }
};

// delete a post by Id
exports.deletePostById = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const postId = req.params.id;

        const post = await Post.findOneAndDelete({
            _id: postId,
            author: userId,
        });
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        res.json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(402).json({ error: "An error occurred." });
    }
};

// Like a post by Id
exports.likePostById = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            await post.save();
        }

        res.json({ message: "liked successfully." });
    } catch (error) {
        res.status(402).json({ error: "An error occurred." });
    }
};

//unlike a post by Id
exports.unlikePostById = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        if (post.likes.includes(userId)) {
            post.likes.pull(userId);
            await post.save();
        }

        res.json({ message: "unliked successfully." });
    } catch (error) {
        res.status(402).json({ error: "An error occurred." });
    }
};

// Comment on Post by Id
exports.commentOnPostById = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const postId = req.params.id;
        const { comment } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        post.comments.push({ text: comment, author: userId });
        await post.save();

        const addedComment = post.comments[post.comments.length - 1];

        res.json({ commentId: addedComment._id });
    } catch (error) {
        res.status(402).json({ error: "An error occurred." });
    }
};
